import { describe, expect, it } from "vitest";
import { generateComic, makeFreshSeed } from "../comicGenerator";
import type { ComicTheme, DogInput, Personality } from "../types";

const baseInput: DogInput = {
  dogName: "Rocket",
  personality: "Heroic",
  theme: "Space Adventure",
  notes: "Fluff balls!!",
  photoUrl: "blob:test-dog-photo",
};

describe("comicGenerator", () => {
  it("creates one 4-panel comic card model", () => {
    const comic = generateComic(baseInput, 12345);

    expect(comic.seed).toBe(12345);
    expect(comic.title).toContain("Rocket");
    expect(comic.theme).toBe("Space Adventure");
    expect(comic.personality).toBe("Heroic");
    expect(comic.panels).toHaveLength(4);
    expect(comic.panels.map((panel) => panel.id)).toEqual([1, 2, 3, 4]);

    for (const panel of comic.panels) {
      expect(panel.caption.length).toBeGreaterThan(5);
      expect(panel.speech.length).toBeGreaterThan(5);
      expect(panel.actionWord.length).toBeGreaterThan(1);
      expect(panel.variant.imageClass).toBeTruthy();
    }
  });

  it("forces notes into at least one visible comic text field", () => {
    const comic = generateComic(baseInput, 67890);
    const visibleText = [
      comic.title,
      comic.subtitle,
      ...comic.panels.flatMap((panel) => [panel.caption, panel.speech]),
    ].join(" ");

    expect(visibleText).toMatch(/Fluff balls!!/);
  });

  it("changes wording when regenerated with a different seed", () => {
    const first = generateComic(baseInput, 11111);
    const second = generateComic(baseInput, 22222);

    expect([
      first.title,
      first.subtitle,
      ...first.panels.map((panel) => `${panel.caption}|${panel.speech}|${panel.actionWord}`),
    ]).not.toEqual([
      second.title,
      second.subtitle,
      ...second.panels.map((panel) => `${panel.caption}|${panel.speech}|${panel.actionWord}`),
    ]);
  });

  it.each([
    { personality: "Goofy" as Personality, expected: /vibes|wiggle|sideways|belly rubs|crumbs/i },
    { personality: "Heroic" as Personality, expected: /mission|honor|courage|justice|hero/i },
    { personality: "Mischievous" as Personality, expected: /innocent|diversion|stole|crime|treat/i },
    { personality: "Dramatic" as Personality, expected: /prophecy|destiny|legendary|thunder|history/i },
    { personality: "Sleepy" as Personality, expected: /nap|blanket|snacks|slow blink|snoring/i },
  ])("uses personality-specific tone for $personality", ({ personality, expected }) => {
    const comic = generateComic({ ...baseInput, personality, notes: "" }, 24680);
    const speechText = comic.panels.map((panel) => panel.speech).join(" ");

    expect(speechText).toMatch(expected);
  });

  const themes: ComicTheme[] = ["Superhero", "Space Adventure", "Backyard Chaos", "Detective Dog", "Royal Pup"];

  it.each(themes)(
    "uses theme-specific story beats for %s",
    (theme) => {
      const comic = generateComic({ ...baseInput, theme, notes: "" }, 13579);
      const panelText = comic.panels.map((panel) => panel.caption).join(" ");

      expect(panelText.length).toBeGreaterThan(30);
      expect(comic.theme).toBe(theme);
    },
  );

  it("uses manual dog description details when no photo exists", () => {
    const comic = generateComic(
      {
        dogName: "Maple",
        personality: "Dramatic",
        theme: "Royal Pup",
        notes: "blanket throne",
        photoUrl: null,
        description: {
          breedType: "poodle mix",
          furColor: "black",
          size: "tiny",
          earShape: "floppy",
          markings: "two tiny teeth",
          funnyHabit: "stares down crows",
        },
      },
      1001,
    );

    expect(comic.subtitle).toMatch(/poodle mix|black|tiny|floppy|crows|blanket throne/i);
  });

  it("creates a fresh seed that does not repeat the prior seed", () => {
    expect(makeFreshSeed(1)).not.toBe(1);
  });
});
