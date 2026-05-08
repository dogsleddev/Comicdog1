"use client";

import { ImageUploader } from "./ImageUploader";
import { PrivacyNote } from "./PrivacyNote";

type HomeScreenProps = {
  onPhotoSelected: (temporaryUrl: string) => void;
  onUseSample: () => void;
};

export function HomeScreen({ onPhotoSelected, onUseSample }: HomeScreenProps) {
  return (
    <section className="mx-auto flex min-h-dvh w-full max-w-xl flex-col justify-center px-4 py-8">
      <div className="space-y-6 rounded-[2rem] border-4 border-black bg-white/70 p-5 shadow-[8px_8px_0_#111827] backdrop-blur">
        <div className="space-y-3 text-center">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border-4 border-black bg-yellow-300 text-4xl shadow-[4px_4px_0_#111827] wiggle">
            🐶
          </div>
          <p className="text-sm font-black uppercase tracking-[0.24em] text-orange-700">Mobile comic maker</p>
          <h1 className="text-5xl font-black leading-none tracking-tight text-slate-950 sm:text-6xl">ComicDog</h1>
          <p className="text-xl font-black text-slate-800">Your dog. Their origin story.</p>
        </div>

        <PrivacyNote />

        <div className="space-y-3">
          <ImageUploader onImageSelected={onPhotoSelected} compact />
          <button
            type="button"
            onClick={onUseSample}
            className="w-full rounded-2xl border-2 border-black bg-yellow-300 px-5 py-4 text-lg font-black text-black shadow-[5px_5px_0_#111827] transition active:translate-y-1 active:shadow-[2px_2px_0_#111827]"
          >
            🐾 Use Sample Dog
          </button>
        </div>

        <p className="text-center text-xs font-bold text-slate-600">
          No paid APIs. No accounts. No uploads. Just local browser magic and comic chaos.
        </p>
      </div>
    </section>
  );
}
