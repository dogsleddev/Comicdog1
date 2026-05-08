import { buildSafeFileName } from "./imageUtils";

async function waitForPosterImages(element: HTMLElement) {
  const images = Array.from(element.querySelectorAll("img"));

  await Promise.all(
    images.map((image) => {
      if (image.complete && image.naturalWidth > 0) return Promise.resolve();

      return new Promise<void>((resolve) => {
        const finish = () => resolve();
        image.addEventListener("load", finish, { once: true });
        image.addEventListener("error", finish, { once: true });
      });
    }),
  );
}

async function elementToBlob(element: HTMLElement) {
  const { toBlob } = await import("html-to-image");

  await waitForPosterImages(element);

  const blob = await toBlob(element, {
    backgroundColor: "#fff7ed",
    cacheBust: false,
    pixelRatio: Math.min(3, window.devicePixelRatio || 2),
    style: {
      transform: "none",
    },
  });

  if (!blob) {
    throw new Error("Could not create image. Try taking a screenshot or downloading again.");
  }

  return blob;
}

export async function downloadElementAsPng(element: HTMLElement, dogName: string) {
  const blob = await elementToBlob(element);
  const url = URL.createObjectURL(blob);

  try {
    const link = document.createElement("a");
    link.href = url;
    link.download = `${buildSafeFileName(dogName)}-comicdog.png`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  } finally {
    URL.revokeObjectURL(url);
  }
}

export async function shareElementAsImage(element: HTMLElement, dogName: string) {
  const blob = await elementToBlob(element);
  const fileName = `${buildSafeFileName(dogName)}-comicdog.png`;
  const file = new File([blob], fileName, { type: "image/png" });
  const title = "ComicDog";
  const text = "My dog just got an origin story.";

  if (navigator.canShare?.({ files: [file] })) {
    await navigator.share({ title, text, files: [file] });
    return "Shared your comic image.";
  }

  if (navigator.share) {
    await navigator.share({ title, text });
    return "Shared ComicDog text. Image-file sharing was not supported on this device. Use Download to save the comic image.";
  }

  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText("ComicDog: Your dog. Their origin story.");
    return "Sharing is not available here, so the caption was copied. Use Download to save the image.";
  }

  return "Sharing is not available here. Use Download to save the image.";
}
