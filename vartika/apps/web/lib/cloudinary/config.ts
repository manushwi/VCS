export const CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "sparkleserve";

export function cloudinaryUrl(publicId: string, options?: {
  width?: number;
  quality?: "auto" | number;
  format?: "auto" | "webp" | "avif";
}) {
  const { width = "", quality = "auto", format = "auto" } = options || {};
  const transforms = [
    width ? `w_${width}` : "",
    `f_${format}`,
    quality === "auto" ? "q_auto" : `q_${quality}`,
  ]
    .filter(Boolean)
    .join(",");

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms}/${publicId}`;
}
