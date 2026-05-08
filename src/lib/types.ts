export type Personality = "Goofy" | "Heroic" | "Mischievous" | "Dramatic" | "Sleepy";

export type ComicTheme =
  | "Superhero"
  | "Space Adventure"
  | "Backyard Chaos"
  | "Detective Dog"
  | "Royal Pup";

export type Screen = "home" | "create" | "manual" | "loading" | "result";

export type ManualDogDescription = {
  breedType: string;
  furColor: string;
  size: string;
  earShape: string;
  markings: string;
  funnyHabit: string;
};

export type DogInput = {
  dogName: string;
  personality: Personality;
  theme: ComicTheme;
  notes?: string;
  photoUrl?: string | null;
  description?: ManualDogDescription;
};

export type PanelVariant = {
  cropClass: string;
  imageClass: string;
  overlayClass: string;
  panelClass: string;
  speechPositionClass: string;
  actionPositionClass: string;
  captionPositionClass: string;
};

export type ComicPanelData = {
  id: number;
  beat: string;
  caption: string;
  speech: string;
  actionWord: string;
  variant: PanelVariant;
};

export type Comic = {
  seed: number;
  title: string;
  subtitle: string;
  theme: ComicTheme;
  personality: Personality;
  panels: ComicPanelData[];
};

export type SelectOption<T extends string> = {
  value: T;
  label: string;
  description: string;
};
