"use client";

import { useEffect, useState } from "react";
import { loadingMessages } from "@/lib/comicTemplates";

export function LoadingScreen() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setMessageIndex((current) => (current + 1) % loadingMessages.length);
    }, 650);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="grid min-h-dvh place-items-center px-4 py-8">
      <div className="w-full max-w-sm rounded-[2rem] border-4 border-black bg-white/80 p-6 text-center shadow-[8px_8px_0_#111827]">
        <div className="mx-auto mb-5 grid h-28 w-28 place-items-center rounded-full border-4 border-black bg-orange-400 text-6xl shadow-[5px_5px_0_#111827] floaty">
          🐕
        </div>
        <h1 className="text-3xl font-black text-slate-950">Making comic magic…</h1>
        <p className="mt-3 min-h-8 text-lg font-black text-orange-700">{loadingMessages[messageIndex]}</p>
        <div className="mt-6 h-4 overflow-hidden rounded-full border-2 border-black bg-yellow-100">
          <div className="h-full w-2/3 animate-pulse rounded-full bg-orange-500" />
        </div>
      </div>
    </section>
  );
}
