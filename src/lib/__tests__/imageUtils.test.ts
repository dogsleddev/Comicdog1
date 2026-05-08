import { describe, expect, it, vi } from "vitest";
import { buildSafeFileName, createTemporaryImageUrl, isObjectUrl, revokeObjectUrl, validateImageFile } from "../imageUtils";

describe("imageUtils", () => {
  it("accepts ordinary image files", () => {
    const file = new File(["dog"], "dog.jpg", { type: "image/jpeg" });
    expect(validateImageFile(file)).toBeNull();
  });

  it("rejects non-image files", () => {
    const file = new File(["not an image"], "notes.txt", { type: "text/plain" });
    expect(validateImageFile(file)).toBe("Please choose an image file.");
  });

  it("rejects images over the mobile-friendly size limit", () => {
    const file = new File([new Uint8Array(12 * 1024 * 1024 + 1)], "huge.jpg", { type: "image/jpeg" });
    expect(validateImageFile(file)).toMatch(/under 12 MB/);
  });

  it("creates and recognizes temporary object URLs", () => {
    const file = new File(["dog"], "dog.png", { type: "image/png" });
    expect(createTemporaryImageUrl(file)).toBe("blob:mock-comicdog-url");
    expect(isObjectUrl("blob:mock-comicdog-url")).toBe(true);
    expect(isObjectUrl("/sample-dog.svg")).toBe(false);
  });

  it("only revokes blob URLs", () => {
    const revokeSpy = vi.spyOn(URL, "revokeObjectURL");

    revokeObjectUrl("/sample-dog.svg");
    expect(revokeSpy).not.toHaveBeenCalled();

    revokeObjectUrl("blob:test");
    expect(revokeSpy).toHaveBeenCalledWith("blob:test");
  });

  it("builds safe lowercase filenames", () => {
    expect(buildSafeFileName(" Sir Barks-A-Lot!! ")).toBe("sir-barks-a-lot");
    expect(buildSafeFileName("!!!")).toBe("comicdog");
  });
});
