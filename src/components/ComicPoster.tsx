"use client";

import { forwardRef } from "react";
import { ComicPanel } from "./ComicPanel";
import type { Comic, DogInput } from "@/lib/types";

type ComicPosterProps = {
  comic: Comic;
  dogInput: DogInput;
};

export const ComicPoster = forwardRef<HTMLDivElement, ComicPosterProps>(function ComicPoster(
  { comic, dogInput },
  ref,
) {
  return (
    <div
      ref={ref}
      className="comic-card aspect-[3/2] w-full overflow-hidden rounded-[1.4rem] border-[5px] border-black bg-orange-50 p-2 comic-shadow sm:rounded-[2rem] sm:p-3"
    >
      <div className="flex h-full flex-col gap-2">
        <header className="rounded-2xl border-[3px] border-black bg-white px-3 py-1.5 shadow-[3px_3px_0_#111827] sm:px-4 sm:py-2">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[0.5rem] font-black uppercase tracking-[0.22em] text-orange-700 sm:text-xs">
                ComicDog Presents
              </p>
              <h2 className="truncate text-base font-black uppercase leading-none tracking-tight text-slate-950 sm:text-3xl">
                {comic.title}
              </h2>
            </div>
            <div className="shrink-0 rounded-xl border-2 border-black bg-yellow-300 px-2 py-1 text-[0.55rem] font-black uppercase text-slate-950 sm:text-xs">
              {comic.personality}
            </div>
          </div>
          <p className="mt-1 truncate text-[0.58rem] font-black text-slate-700 sm:text-sm">{comic.subtitle}</p>
        </header>

        <div className="grid min-h-0 flex-1 grid-cols-2 grid-rows-2 gap-2">
          {comic.panels.map((panel) => (
            <ComicPanel key={`${comic.seed}-${panel.id}`} panel={panel} dogInput={dogInput} />
          ))}
        </div>
      </div>
    </div>
  );
});
