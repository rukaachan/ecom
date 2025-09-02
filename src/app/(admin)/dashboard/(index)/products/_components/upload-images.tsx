"use client";

import { Image as ImageIcon, Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface UploadImagesProps {
  name: string;
  existingImages?: string[];
  onImagesChange?: (files: File[]) => void;
  required?: boolean;
}

export default function UploadImages({
  name,
  existingImages = [],
  onImagesChange,
  required = false,
}: UploadImagesProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [removedImages, setRemovedImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const ALLOW_MIME_TYPES = ["image/jpg", "image/jpeg", "image/png"];

  // Initialize preview URLs from existing images
  useEffect(() => {
    setPreviewUrls(existingImages);
  }, [existingImages]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    if (files.length > 0) {
      // Filter for allowed image types only
      const allowedFiles = files.filter(
        (file) => file instanceof File && ALLOW_MIME_TYPES.includes(file.type)
      );

      if (allowedFiles.length !== files.length) {
        alert("Please select only JPG, JPEG, or PNG image files");
        return;
      }

      // Limit to 5 images total (existing + new)
      const totalImages = previewUrls.length + allowedFiles.length;

      if (totalImages > 5) {
        alert("Maximum 5 images allowed");
        return;
      }

      setSelectedFiles((prev) => {
        return [...prev, ...allowedFiles];
      });

      // Create preview URLs for new images
      const newPreviewUrls = allowedFiles.map((file) => URL.createObjectURL(file));
      setPreviewUrls((prev) => {
        return [...prev, ...newPreviewUrls];
      });

      // Notify parent component
      if (onImagesChange) {
        onImagesChange([...selectedFiles, ...allowedFiles]);
      }
    }
  };

  const removeImage = (index: number) => {
    const newPreviewUrls = [...previewUrls];
    const newSelectedFiles = [...selectedFiles];

    // If it's an existing image (check against original existingImages array)
    if (index < existingImages.length) {
      const imageUrl = existingImages[index];
      // Extract filename from URL (last part after the last slash)
      const urlParts = imageUrl.split("/");
      const filename = urlParts[urlParts.length - 1];

      // Add filename to removedImages (not the full URL)
      setRemovedImages((prev) => {
        // Avoid duplicates
        if (!prev.includes(filename)) {
          return [...prev, filename];
        }
        return prev;
      });

      newPreviewUrls.splice(index, 1);
      setPreviewUrls(newPreviewUrls);
    } else {
      // If it's a newly selected file, remove from both arrays
      const fileIndex = index - existingImages.length;

      // Revoke the object URL to free memory
      URL.revokeObjectURL(newPreviewUrls[index]);

      newPreviewUrls.splice(index, 1);
      newSelectedFiles.splice(fileIndex, 1);

      setSelectedFiles(newSelectedFiles);
      setPreviewUrls(newPreviewUrls);

      // Notify parent component
      if (onImagesChange) {
        onImagesChange(newSelectedFiles);
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <Label htmlFor={name}>Product Images</Label>

      {/* Upload Button */}
      <div className="flex items-center gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={handleUploadClick}
          className="flex items-center gap-2"
        >
          <Upload className="h-4 w-4" />
          Upload Images
        </Button>
        <span className="text-sm text-muted-foreground">
          {previewUrls.length}/5 images selected
        </span>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        id={name}
        name={name}
        multiple
        accept="image/jpg,image/jpeg,image/png"
        onChange={handleFileSelect}
        className="hidden"
        required={required && previewUrls.length === 0}
      />

      {/* Hidden input to track removed images (using filenames, not URLs) */}
      {removedImages.map((filename, index) => (
        <input key={`removed-${index}`} type="hidden" name="removedImages" value={filename} />
      ))}

      {/* Image Preview Grid */}
      {previewUrls.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {previewUrls.map((url, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square border rounded-lg overflow-hidden bg-gray-50">
                <img
                  src={url}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder-image.png";
                  }}
                />
              </div>

              {/* Remove Button */}
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeImage(index)}
              >
                <X className="h-3 w-3" />
              </Button>

              {/* Image Number Badge */}
              <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                {index + 1}
                {index < existingImages.length ? " (existing)" : " (new)"}
              </div>
            </div>
          ))}

          {/* Add More Images Button */}
          {previewUrls.length < 5 && (
            <button
              type="button"
              className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
              onClick={handleUploadClick}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleUploadClick();
                }
              }}
              aria-label="Add image"
            >
              <div className="text-center">
                <ImageIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Add Image</p>
              </div>
            </button>
          )}
        </div>
      )}

      {/* Instructions */}
      <div className="text-sm text-muted-foreground">
        <p>• Upload up to 5 images</p>
        <p>• Supported formats: JPG, JPEG, PNG</p>
        <p>• Maximum file size: 5MB per image</p>
      </div>
    </div>
  );
}
