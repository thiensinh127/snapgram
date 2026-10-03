export const getPostImageUrl = (imageUrl: string, width: number) => {
  try {
    const url = new URL(imageUrl);
    url.searchParams.set("width", String(width));
    return url.toString();
  } catch {
    return imageUrl;
  }
};
