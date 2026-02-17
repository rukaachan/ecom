import { existsSync } from "fs";
import { mkdir, unlink, writeFile } from "fs/promises";
import { join } from "path";
import sharp from "sharp";

const ensureUploadDir = async (path: string) => {
  const uploadDir = join(process.cwd(), "public", "uploads", path);
  if (!existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true });
  }
  return uploadDir;
};

export const getImageUrl = (name: string, path: "brands" | "product" = "brands") => {
  if (name.startsWith("/")) {
    return name;
  }

  return `/uploads/${path}/${name}`;
};

export const uploadFile = async (file: File, path: "brands" | "product" = "brands") => {
  const fileType = file.type.split("/")[1];
  const filename = `${path}-${Date.now()}.${fileType}`;

  const buffer = Buffer.from(await file.arrayBuffer());

  const metadata = await sharp(buffer).metadata();

  let compressedBuffer: Buffer;

  if (fileType === "png") {
    compressedBuffer = await sharp(buffer)
      .png({
        quality: Math.min(80, Math.max(60, 100 - Math.floor(metadata.size! / 10000))),
        compressionLevel: 9,
        adaptiveFiltering: true,
        palette: true,
      })
      .toBuffer();
  } else if (fileType === "jpeg" || fileType === "jpg") {
    const quality = metadata.size! > 2000000 ? 70 : metadata.size! > 1000000 ? 75 : 80;

    compressedBuffer = await sharp(buffer)
      .jpeg({
        quality: quality,
        mozjpeg: true,
        chromaSubsampling: "4:2:0",
      })
      .toBuffer();
  } else if (fileType === "webp") {
    const quality = metadata.size! > 2000000 ? 70 : metadata.size! > 1000000 ? 75 : 80;

    compressedBuffer = await sharp(buffer).webp({ quality: quality }).toBuffer();
  } else {
    const quality = metadata.size! > 2000000 ? 70 : metadata.size! > 1000000 ? 75 : 80;

    compressedBuffer = await sharp(buffer)
      .jpeg({
        quality: quality,
        mozjpeg: true,
        chromaSubsampling: "4:2:0",
      })
      .toBuffer();
  }

  if (metadata.width && metadata.width > 1920) {
    compressedBuffer = await sharp(compressedBuffer)
      .resize({ width: 1920, withoutEnlargement: true })
      .toBuffer();
  } else if (metadata.width && metadata.width > 1200) {
    compressedBuffer = await sharp(compressedBuffer)
      .resize({ width: 1200, withoutEnlargement: true })
      .toBuffer();
  }

  const uploadDir = await ensureUploadDir(path);

  const filePath = join(uploadDir, filename);
  await writeFile(filePath, compressedBuffer);

  return filename;
};

export const deleteFile = async (filename: string, path: "brands" | "product" = "brands") => {
  try {
    const uploadDir = await ensureUploadDir(path);
    const filePath = join(uploadDir, filename);
    await unlink(filePath);
  } catch (error) {
    const code = (error as NodeJS.ErrnoException | null)?.code;
    if (code === "ENOENT" || code === "EPERM" || code === "EBUSY") {
      return;
    }
    throw error;
  }
};

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
