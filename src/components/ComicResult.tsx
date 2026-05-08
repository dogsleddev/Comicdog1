"use client";

import { useEffect, useRef, useState } from "react";
import { ActionButtons } from "./ActionButtons";
import { ComicPoster } from "./ComicPoster";
import type { Comic, DogInput } from "@/lib/types";

type ComicResultProps = {
  comic: Comic;
  dogInput: DogInput;
  onRegenerate: () => void;
  onMakeAnother: () => void;
};

export function ComicResult({ comic, dogInput, onRegenerate, onMakeAnother }: ComicResultProps) {
  const posterRef = useRef<HTMLDivElement | null>(null);
  const [posterElement, setPosterElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPosterElement(posterRef.current);
  }, [comic.seed]);

  return (
    <section className="mx-auto w-full max-w-5xl px-3 py-5 sm:px-6">
      <div className="space-y-5 rounded-[2rem] border-4 border-black bg-white/70 p-3 shadow-[8px_8px_0_#111827] backdrop-blur sm:p-5">
        <div className="text-center">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-orange-700">Origin story generated</p>
          <h1 className="text-3xl font-black text-slate-950 sm:text-5xl">{dogInput.dogName} is comic-book official.</h1>
        </div>

        <div className="mx-auto w-full max-w-4xl">
          <ComicPoster ref={posterRef} comic={comic} dogInput={dogInput} />
        </div>

        <ActionButtons
          posterElement={posterElement}
          dogName={dogInput.dogName}
          onRegenerate={onRegenerate}
          onMakeAnother={onMakeAnother}
        />
      </div>
    </section>
  );
}
