"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { ImageUploader } from "./ImageUploader";
import { PersonalitySelector } from "./PersonalitySelector";
import { ThemeSelector } from "./ThemeSelector";
import type { ComicTheme, DogInput, Personality } from "@/lib/types";

type CreateComicFormProps = {
  photoUrl: string | null;
  onPhotoSelected: (temporaryUrl: string) => void;
  onGenerate: (input: DogInput) => void;
  onManualMode: () => void;
  onUseSample: () => void;
  onBack: () => void;
};

export function CreateComicForm({
  photoUrl,
  onPhotoSelected,
  onGenerate,
  onManualMode,
  onUseSample,
  onBack,
}: CreateComicFormProps) {
  const [dogName, setDogName] = useState("");
  const [personality, setPersonality] = useState<Personality>("Goofy");
  const [theme, setTheme] = useState<ComicTheme>("Superhero");
  const [notes, setNotes] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onGenerate({
      dogName: dogName.trim() || "Mystery Pup",
      personality,
      theme,
      notes: notes.trim(),
      photoUrl,
    });
  }

  return (
    <section className="mx-auto w-full max-w-2xl px-4 py-6">
      <form onSubmit={handleSubmit} className="space-y-5 rounded-[2rem] border-4 border-black bg-white/75 p-4 shadow-[8px_8px_0_#111827] backdrop-blur sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-orange-700">Create comic</p>
            <h1 className="text-3xl font-black text-slate-950">Build the origin story</h1>
          </div>
          <button type="button" onClick={onBack} className="rounded-full border-2 border-black bg-white px-4 py-2 text-sm font-black shadow-[3px_3px_0_#111827]">
            Back
          </button>
        </div>

        <ImageUploader imageUrl={photoUrl} onImageSelected={onPhotoSelected} />

        <label className="block space-y-2">
          <span className="text-sm font-black uppercase tracking-[0.18em] text-slate-700">Dog Name</span>
          <input
            value={dogName}
            onChange={(event) => setDogName(event.target.value)}
            placeholder="Lucy, Shasta, Azules..."
            className="w-full rounded-2xl border-2 border-black bg-white px-4 py-3 text-lg font-black text-slate-950 outline-none shadow-[3px_3px_0_#111827] focus:bg-yellow-50"
          />
        </label>

        <PersonalitySelector value={personality} onChange={setPersonality} />
        <ThemeSelector value={theme} onChange={setTheme} />

        <label className="block space-y-2">
          <span className="text-sm font-black uppercase tracking-[0.18em] text-slate-700">Notes, optional</span>
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Fluff balls!! Loves squirrels. Sleeps like a tiny dragon."
            rows={4}
            className="w-full resize-none rounded-2xl border-2 border-black bg-white px-4 py-3 font-bold text-slate-950 outline-none shadow-[3px_3px_0_#111827] focus:bg-yellow-50"
          />
        </label>

        <div className="grid gap-3">
          <button type="submit" className="rounded-2xl border-2 border-black bg-orange-500 px-5 py-4 text-lg font-black text-white shadow-[5px_5px_0_#111827] transition active:translate-y-1 active:shadow-[2px_2px_0_#111827]">
            ⚡ Generate Comic
          </button>
          <button type="button" onClick={onManualMode} className="rounded-2xl border-2 border-black bg-white px-5 py-3 font-black text-slate-950 shadow-[4px_4px_0_#111827] transition active:translate-y-1">
            Describe Dog Instead
          </button>
          <button type="button" onClick={onUseSample} className="rounded-2xl border-2 border-black bg-yellow-300 px-5 py-3 font-black text-slate-950 shadow-[4px_4px_0_#111827] transition active:translate-y-1">
            Use Sample Dog
          </button>
        </div>
      </form>
    </section>
  );
}
