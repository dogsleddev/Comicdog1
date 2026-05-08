"use client";

import { useEffect, useRef, useState } from "react";
import { ComicResult } from "./ComicResult";
import { CreateComicForm } from "./CreateComicForm";
import { HomeScreen } from "./HomeScreen";
import { LoadingScreen } from "./LoadingScreen";
import { ManualDescriptionForm } from "./ManualDescriptionForm";
import { generateComic, makeFreshSeed } from "@/lib/comicGenerator";
import { revokeObjectUrl } from "@/lib/imageUtils";
import type { Comic, DogInput, Screen } from "@/lib/types";

const SAMPLE_DOG_URL = "/sample-dog.svg";

export function AppShell() {
  const [screen, setScreen] = useState<Screen>("home");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [lastInput, setLastInput] = useState<DogInput | null>(null);
  const [comic, setComic] = useState<Comic | null>(null);
  const loadingTimeoutRef = useRef<ReturnType<typeof window.setTimeout> | null>(null);
  const photoUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      revokeObjectUrl(photoUrlRef.current);

      if (loadingTimeoutRef.current) {
        window.clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, []);

  function replacePhotoUrl(nextUrl: string | null) {
    const currentUrl = photoUrlRef.current;

    if (currentUrl !== nextUrl) {
      revokeObjectUrl(currentUrl);
    }

    photoUrlRef.current = nextUrl;
    setPhotoUrl(nextUrl);
  }

  function handlePhotoSelected(temporaryUrl: string) {
    replacePhotoUrl(temporaryUrl);
    setScreen("create");
  }

  function handleUseSample() {
    replacePhotoUrl(SAMPLE_DOG_URL);
    setScreen("create");
  }

  function handleGenerate(input: DogInput) {
    const normalizedInput = {
      ...input,
      dogName: input.dogName.trim() || "Mystery Pup",
      photoUrl: input.photoUrl ?? null,
    };

    setLastInput(normalizedInput);
    setScreen("loading");

    if (loadingTimeoutRef.current) window.clearTimeout(loadingTimeoutRef.current);
    loadingTimeoutRef.current = window.setTimeout(() => {
      const seed = makeFreshSeed(comic?.seed);
      setComic(generateComic(normalizedInput, seed));
      setScreen("result");
      loadingTimeoutRef.current = null;
    }, 1400);
  }

  function handleRegenerate() {
    if (!lastInput) return;
    const seed = makeFreshSeed(comic?.seed);
    setComic(generateComic(lastInput, seed));
  }

  function handleMakeAnother() {
    replacePhotoUrl(null);
    setLastInput(null);
    setComic(null);
    setScreen("home");
  }

  return (
    <main className="min-h-dvh">
      {screen === "home" ? <HomeScreen onPhotoSelected={handlePhotoSelected} onUseSample={handleUseSample} /> : null}

      {screen === "create" ? (
        <CreateComicForm
          photoUrl={photoUrl}
          onPhotoSelected={handlePhotoSelected}
          onGenerate={handleGenerate}
          onManualMode={() => setScreen("manual")}
          onUseSample={handleUseSample}
          onBack={() => setScreen("home")}
        />
      ) : null}

      {screen === "manual" ? (
        <ManualDescriptionForm onGenerate={handleGenerate} onBack={() => setScreen(photoUrl ? "create" : "home")} />
      ) : null}

      {screen === "loading" ? <LoadingScreen /> : null}

      {screen === "result" && comic && lastInput ? (
        <ComicResult
          comic={comic}
          dogInput={lastInput}
          onRegenerate={handleRegenerate}
          onMakeAnother={handleMakeAnother}
        />
      ) : null}
    </main>
  );
}
