"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { PersonalitySelector } from "./PersonalitySelector";
import { ThemeSelector } from "./ThemeSelector";
import type { ComicTheme, DogInput, Personality } from "@/lib/types";

type ManualDescriptionFormProps = {
  onGenerate: (input: DogInput) => void;
  onBack: () => void;
};

export function ManualDescriptionForm({ onGenerate, onBack }: ManualDescriptionFormProps) {
  const [dogName, setDogName] = useState("");
  const [breedType, setBreedType] = useState("");
  const [furColor, setFurColor] = useState("");
  const [size, setSize] = useState("");
  const [earShape, setEarShape] = useState("");
  const [markings, setMarkings] = useState("");
  const [personality, setPersonality] = useState<Personality>("Heroic");
  const [theme, setTheme] = useState<ComicTheme>("Space Adventure");
  const [funnyHabit, setFunnyHabit] = useState("");
  const [notes, setNotes] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onGenerate({
      dogName: dogName.trim() || "Mystery Pup",
      personality,
      theme,
      notes: notes.trim(),
      photoUrl: null,
      description: {
        breedType: breedType.trim() || "mystery dog",
        furColor: furColor.trim() || "storybook-colored",
        size: size.trim() || "legendary-sized",
        earShape: earShape.trim() || "expressive",
        markings: markings.trim(),
        funnyHabit: funnyHabit.trim(),
      },
    });
  }

  return (
    <section className="mx-auto w-full max-w-2xl px-4 py-6">
      <form onSubmit={handleSubmit} className="space-y-5 rounded-[2rem] border-4 border-black bg-white/75 p-4 shadow-[8px_8px_0_#111827] backdrop-blur sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-purple-700">No photo? No problem.</p>
            <h1 className="text-3xl font-black text-slate-950">Describe your dog</h1>
          </div>
          <button type="button" onClick={onBack} className="rounded-full border-2 border-black bg-white px-4 py-2 text-sm font-black shadow-[3px_3px_0_#111827]">
            Back
          </button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <TextField label="Dog name" value={dogName} onChange={setDogName} placeholder="Captain Biscuit" />
          <TextField label="Breed/type" value={breedType} onChange={setBreedType} placeholder="Poodle mix, husky, mutt..." />
          <TextField label="Fur color" value={furColor} onChange={setFurColor} placeholder="Black, white, tan..." />
          <TextField label="Size" value={size} onChange={setSize} placeholder="Tiny, medium, giant floof..." />
          <TextField label="Ear shape" value={earShape} onChange={setEarShape} placeholder="Floppy, pointy, one up one down..." />
          <TextField label="Markings" value={markings} onChange={setMarkings} placeholder="White paws, tan eyebrows..." />
        </div>

        <PersonalitySelector value={personality} onChange={setPersonality} />
        <ThemeSelector value={theme} onChange={setTheme} />

        <TextField label="Funny habit" value={funnyHabit} onChange={setFunnyHabit} placeholder="Steals socks, side-eyes squirrels..." />

        <label className="block space-y-2">
          <span className="text-sm font-black uppercase tracking-[0.18em] text-slate-700">Optional notes</span>
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Fluff balls!! Loves blanket forts."
            rows={4}
            className="w-full resize-none rounded-2xl border-2 border-black bg-white px-4 py-3 font-bold text-slate-950 outline-none shadow-[3px_3px_0_#111827] focus:bg-yellow-50"
          />
        </label>

        <button type="submit" className="w-full rounded-2xl border-2 border-black bg-purple-600 px-5 py-4 text-lg font-black text-white shadow-[5px_5px_0_#111827] transition active:translate-y-1 active:shadow-[2px_2px_0_#111827]">
          ⚡ Generate Comic
        </button>
      </form>
    </section>
  );
}

type TextFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

function TextField({ label, value, onChange, placeholder }: TextFieldProps) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-black uppercase tracking-[0.18em] text-slate-700">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border-2 border-black bg-white px-4 py-3 font-black text-slate-950 outline-none shadow-[3px_3px_0_#111827] focus:bg-yellow-50"
      />
    </label>
  );
}
