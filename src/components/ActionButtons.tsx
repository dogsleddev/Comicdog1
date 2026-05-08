"use client";

import { useState } from "react";
import { downloadElementAsPng, shareElementAsImage } from "@/lib/downloadUtils";

type ActionButtonsProps = {
  posterElement: HTMLElement | null;
  dogName: string;
  onRegenerate: () => void;
  onMakeAnother: () => void;
};

export function ActionButtons({ posterElement, dogName, onRegenerate, onMakeAnother }: ActionButtonsProps) {
  const [status, setStatus] = useState("");
  const [busyAction, setBusyAction] = useState<"download" | "share" | null>(null);

  async function handleDownload() {
    if (!posterElement) return;
    try {
      setBusyAction("download");
      setStatus("");
      await downloadElementAsPng(posterElement, dogName);
      setStatus("Downloaded your comic image.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Download failed. A screenshot is the clean fallback.");
    } finally {
      setBusyAction(null);
    }
  }

  async function handleShare() {
    if (!posterElement) return;
    try {
      setBusyAction("share");
      setStatus("");
      const result = await shareElementAsImage(posterElement, dogName);
      setStatus(result);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Share failed. Use Download as the fallback.");
    } finally {
      setBusyAction(null);
    }
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={handleDownload}
          disabled={!posterElement || busyAction !== null}
          className="rounded-2xl border-2 border-black bg-orange-500 px-4 py-3 font-black text-white shadow-[4px_4px_0_#111827] transition active:translate-y-1 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busyAction === "download" ? "Saving…" : "Download"}
        </button>
        <button
          type="button"
          onClick={handleShare}
          disabled={!posterElement || busyAction !== null}
          className="rounded-2xl border-2 border-black bg-yellow-300 px-4 py-3 font-black text-black shadow-[4px_4px_0_#111827] transition active:translate-y-1 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busyAction === "share" ? "Sharing…" : "Share"}
        </button>
        <button
          type="button"
          onClick={onRegenerate}
          className="rounded-2xl border-2 border-black bg-white px-4 py-3 font-black text-slate-950 shadow-[4px_4px_0_#111827] transition active:translate-y-1"
        >
          Regenerate
        </button>
        <button
          type="button"
          onClick={onMakeAnother}
          className="rounded-2xl border-2 border-black bg-slate-950 px-4 py-3 font-black text-white shadow-[4px_4px_0_#111827] transition active:translate-y-1"
        >
          Make Another
        </button>
      </div>

      {status ? (
        <p className="rounded-2xl border-2 border-black bg-white/90 p-3 text-sm font-bold text-slate-800 shadow-[3px_3px_0_#111827]">
          {status}
        </p>
      ) : null}
    </div>
  );
}
