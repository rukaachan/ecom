// Utility function to construct image URLs for client-side components
export const getImageUrl = (
  name: string,
  path: "brands" | "product" = "brands",
) => {
  // Return the local path to the image
  return `/uploads/${path}/${name}`;
};