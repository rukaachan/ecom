import { existsSync } from "fs";
import { mkdir, unlink, writeFile } from "fs/promises";
import { join } from "path";
import sharp from "sharp";

// Ensure the upload directory exists
const ensureUploadDir = async (path: string) => {
  const uploadDir = join(process.cwd(), "public", "uploads", path);
  if (!existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true });
  }
  return uploadDir;
};

export const getImageUrl = (
  name: string,
  path: "brands" | "product" = "brands",
) => {
  // Return the local path to the image
  return `/uploads/${path}/${name}`;
};

export const uploadFile = async (
  file: File,
  path: "brands" | "product" = "brands",
) => {
  const fileType = file.type.split("/")[1];
  const filename = `${path}-${Date.now()}.${fileType}`;

  // Convert File to Buffer
  const buffer = Buffer.from(await file.arrayBuffer());

  // Get image metadata for optimization decisions
  const metadata = await sharp(buffer).metadata();

  // Compress image based on file type with advanced optimization
  let compressedBuffer: Buffer;

  if (fileType === "png") {
    // For PNG files, compress with advanced settings
    compressedBuffer = await sharp(buffer)
      .png({
        quality: Math.min(
          80,
          Math.max(60, 100 - Math.floor(metadata.size! / 10000)),
        ),
        compressionLevel: 9,
        adaptiveFiltering: true,
        palette: true,
      })
      .toBuffer();
  } else if (fileType === "jpeg" || fileType === "jpg") {
    // For JPEG files, compress with adaptive quality based on file size
    const quality =
      metadata.size! > 2000000 ? 70 : metadata.size! > 1000000 ? 75 : 80;

    compressedBuffer = await sharp(buffer)
      .jpeg({
        quality: quality,
        mozjpeg: true,
        chromaSubsampling: "4:2:0",
      })
      .toBuffer();
  } else if (fileType === "webp") {
    // For WebP files, compress with adaptive quality
    const quality =
      metadata.size! > 2000000 ? 70 : metadata.size! > 1000000 ? 75 : 80;

    compressedBuffer = await sharp(buffer)
      .webp({ quality: quality })
      .toBuffer();
  } else {
    // For other image types, convert to JPEG with compression
    const quality =
      metadata.size! > 2000000 ? 70 : metadata.size! > 1000000 ? 75 : 80;

    compressedBuffer = await sharp(buffer)
      .jpeg({
        quality: quality,
        mozjpeg: true,
        chromaSubsampling: "4:2:0",
      })
      .toBuffer();
  }

  // Further optimize by resizing if the image is too large
  if (metadata.width && metadata.width > 1920) {
    compressedBuffer = await sharp(compressedBuffer)
      .resize({ width: 1920, withoutEnlargement: true })
      .toBuffer();
  } else if (metadata.width && metadata.width > 1200) {
    // For medium images, resize to 1200px width
    compressedBuffer = await sharp(compressedBuffer)
      .resize({ width: 1200, withoutEnlargement: true })
      .toBuffer();
  }

  // Ensure upload directory exists
  const uploadDir = await ensureUploadDir(path);

  // Write compressed file to disk
  const filePath = join(uploadDir, filename);
  await writeFile(filePath, compressedBuffer);

  return filename;
};

export const deleteFile = async (
  filename: string,
  path: "brands" | "product" = "brands",
) => {
  try {
    const uploadDir = await ensureUploadDir(path);
    const filePath = join(uploadDir, filename);
    await unlink(filePath);
  } catch (error) {
    // File might not exist, which is fine
    console.warn(`Failed to delete file: ${filename}`, error);
  }
};

// Get image metadata for optimization decisions
export const getImageMetadata = async (file: File) => {
  const buffer = Buffer.from(await file.arrayBuffer());
  const metadata = await sharp(buffer).metadata();
  return {
    width: metadata.width,
    height: metadata.height,
    format: metadata.format,
    size: buffer.length,
  };
};
