export function isObjectUrl(url: string | null | undefined) {
  return Boolean(url?.startsWith("blob:"));
}

export function revokeObjectUrl(url: string | null | undefined) {
  if (isObjectUrl(url)) {
    URL.revokeObjectURL(url as string);
  }
}

export function createTemporaryImageUrl(file: File) {
  return URL.createObjectURL(file);
}

export function validateImageFile(file: File) {
  if (!file.type.startsWith("image/")) {
    return "Please choose an image file.";
  }

  const maxBytes = 12 * 1024 * 1024;
  if (file.size > maxBytes) {
    return "Please choose an image under 12 MB for best mobile performance.";
  }

  return null;
}

export function buildSafeFileName(name: string) {
  const safe = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return safe || "comicdog";
}
