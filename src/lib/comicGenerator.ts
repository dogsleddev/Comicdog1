import {
  actionWordsByTheme,
  dialogueByPersonality,
  endingLinesByTheme,
  notesInsertionHelpers,
  panelBeatsByTheme,
  titleTemplatesByTheme,
} from "./comicTemplates";
import type { Comic, ComicPanelData, DogInput, PanelVariant } from "./types";

const panelVariants: PanelVariant[] = [
  {
    cropClass: "object-center",
    imageClass: "scale-105 rotate-0",
    overlayClass: "bg-gradient-to-tr from-transparent via-white/5 to-yellow-300/30",
    panelClass: "halftone-yellow",
    speechPositionClass: "left-3 top-3 max-w-[68%]",
    actionPositionClass: "right-2 bottom-2 rotate-6",
    captionPositionClass: "left-3 bottom-3 max-w-[58%]",
  },
  {
    cropClass: "object-[55%_45%]",
    imageClass: "scale-125 -rotate-3",
    overlayClass: "bg-gradient-to-br from-orange-500/20 via-transparent to-black/25",
    panelClass: "halftone-orange",
    speechPositionClass: "right-3 top-3 max-w-[62%]",
    actionPositionClass: "left-2 bottom-2 -rotate-12",
    captionPositionClass: "right-3 bottom-3 max-w-[58%]",
  },
  {
    cropClass: "object-[48%_42%]",
    imageClass: "scale-[1.35] rotate-3 contrast-125 saturate-125",
    overlayClass: "bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.35)_100%)]",
    panelClass: "halftone-purple",
    speechPositionClass: "left-3 bottom-4 max-w-[68%]",
    actionPositionClass: "right-2 top-3 rotate-12",
    captionPositionClass: "left-3 top-3 max-w-[52%]",
  },
  {
    cropClass: "object-center",
    imageClass: "scale-110 rotate-1 brightness-110",
    overlayClass: "bg-gradient-to-t from-black/35 via-transparent to-yellow-200/20",
    panelClass: "halftone-blue",
    speechPositionClass: "right-3 bottom-4 max-w-[65%]",
    actionPositionClass: "left-2 top-2 -rotate-6",
    captionPositionClass: "left-3 bottom-3 max-w-[56%]",
  },
];

function mulberry32(seed: number) {
  return function random() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(items: T[], random: () => number): T {
  return items[Math.floor(random() * items.length)] ?? items[0];
}

function cleanText(value: string | undefined, fallback = "") {
  return (value ?? fallback).trim().replace(/\s+/g, " ");
}

function cleanNote(notes?: string) {
  const note = cleanText(notes);
  if (!note) return "";
  return note.length > 58 ? `${note.slice(0, 55).trim()}…` : note;
}

function fill(template: string, replacements: Record<string, string>) {
  return Object.entries(replacements).reduce(
    (line, [key, value]) => line.replaceAll(`{${key}}`, value),
    template,
  );
}

function buildDogDescription(input: DogInput) {
  if (!input.description) return "";
  const { breedType, furColor, size, earShape, markings, funnyHabit } = input.description;
  const details = [
    cleanText(size),
    cleanText(furColor),
    cleanText(breedType),
    cleanText(earShape) ? `${cleanText(earShape)} ears` : "",
    cleanText(markings),
    cleanText(funnyHabit) ? `known for ${cleanText(funnyHabit)}` : "",
  ].filter(Boolean);

  return details.join(", ");
}

function buildTitle(input: DogInput, random: () => number, note: string) {
  const dogName = cleanText(input.dogName, "Mystery Pup");
  const template = pick(titleTemplatesByTheme[input.theme], random);
  let title = fill(template, { name: dogName });

  if (note && random() > 0.45) {
    title = `${title}: ${fill(pick(notesInsertionHelpers.titleBoosters, random), { note })}`;
  }

  return title;
}

function buildSubtitle(input: DogInput, random: () => number, note: string) {
  const ending = pick(endingLinesByTheme[input.theme], random);
  const description = buildDogDescription(input);

  if (description) {
    return `${description}. ${ending}`;
  }

  if (note && random() > 0.55) {
    return fill(pick(notesInsertionHelpers.captionLines, random), { note });
  }

  return ending;
}

function maybePersonalizeWithNotes(line: string, note: string, random: () => number, force = false) {
  if (!note || (!force && random() < 0.42)) return line;
  return `${line} ${fill(pick(notesInsertionHelpers.bubbleOpeners, random), { note })}`;
}

function makePanels(input: DogInput, random: () => number, note: string) {
  const beats = panelBeatsByTheme[input.theme];
  const dialogue = dialogueByPersonality[input.personality];
  const actions = actionWordsByTheme[input.theme];
  const notePanelIndex = note ? Math.floor(random() * 4) : -1;

  return [0, 1, 2, 3].map((panelIndex) => {
    const beat = pick(beats[panelIndex], random);
    const baseSpeech = pick(dialogue[panelIndex], random);
    const speech = panelIndex === notePanelIndex
      ? maybePersonalizeWithNotes(baseSpeech, note, random, true)
      : maybePersonalizeWithNotes(baseSpeech, note, random);

    const caption = panelIndex === notePanelIndex && note && random() > 0.55
      ? fill(pick(notesInsertionHelpers.captionLines, random), { note })
      : beat;

    const actionWord = pick(actions, random);
    const variant = panelVariants[panelIndex];

    return {
      id: panelIndex + 1,
      beat,
      caption,
      speech,
      actionWord,
      variant,
    } satisfies ComicPanelData;
  });
}

export function generateComic(input: DogInput, seed = Date.now()): Comic {
  const random = mulberry32(seed);
  const note = cleanNote(input.notes);

  return {
    seed,
    title: buildTitle(input, random, note),
    subtitle: buildSubtitle(input, random, note),
    theme: input.theme,
    personality: input.personality,
    panels: makePanels(input, random, note),
  };
}

export function makeFreshSeed(previousSeed?: number) {
  const fresh = Date.now() + Math.floor(Math.random() * 100000);
  return fresh === previousSeed ? fresh + 1 : fresh;
}
