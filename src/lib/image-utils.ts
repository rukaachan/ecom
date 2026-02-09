// Utility function to construct image URLs for client-side components
export const getImageUrl = (name: string, path: "brands" | "product" = "brands") => {
  // Keep absolute public paths (e.g. "/assets/...") unchanged.
  if (name.startsWith("/")) {
    return name;
  }

  // Return the local uploaded image path.
  return `/uploads/${path}/${name}`;
};
