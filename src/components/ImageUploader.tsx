"use client";

import { useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { createTemporaryImageUrl, validateImageFile } from "@/lib/imageUtils";

type ImageUploaderProps = {
  imageUrl?: string | null;
  onImageSelected: (temporaryUrl: string) => void;
  compact?: boolean;
};

export function ImageUploader({ imageUrl, onImageSelected, compact = false }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState("");

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    const validationError = validateImageFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    onImageSelected(createTemporaryImageUrl(file));
  }

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        aria-label="Choose dog photo"
      />

      {imageUrl ? (
        <div className="overflow-hidden rounded-[1.75rem] border-4 border-black bg-white shadow-[6px_6px_0_#111827]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageUrl} alt="Dog preview" className="h-56 w-full object-cover" />
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className={`w-full rounded-2xl border-2 border-black bg-orange-500 px-5 font-black text-white shadow-[5px_5px_0_#111827] transition active:translate-y-1 active:shadow-[2px_2px_0_#111827] ${
          compact ? "py-3 text-base" : "py-4 text-lg"
        }`}
      >
        📸 Take or Upload Dog Photo
      </button>

      {error ? <p className="rounded-xl bg-red-100 p-3 text-sm font-bold text-red-800">{error}</p> : null}
    </div>
  );
}
