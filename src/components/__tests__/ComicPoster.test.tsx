import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ComicPoster } from "../ComicPoster";
import { generateComic } from "@/lib/comicGenerator";
import type { DogInput } from "@/lib/types";

const dogInput: DogInput = {
  dogName: "Azules",
  personality: "Heroic",
  theme: "Superhero",
  notes: "floppy right ear",
  photoUrl: "blob:azules",
};

describe("ComicPoster", () => {
  it("renders one combined 2x2 poster with four panels", () => {
    const comic = generateComic(dogInput, 4321);
    const { container } = render(<ComicPoster comic={comic} dogInput={dogInput} />);

    expect(screen.getByText(/ComicDog Presents/i)).toBeInTheDocument();
    expect(screen.getByText(comic.title)).toBeInTheDocument();
    expect(container.querySelectorAll("article")).toHaveLength(4);
    expect(screen.getAllByAltText(/Azules comic panel/i)).toHaveLength(4);
  });

  it("renders a placeholder dog when there is no photo", () => {
    const noPhotoInput: DogInput = {
      ...dogInput,
      photoUrl: null,
      description: {
        breedType: "poodle mix",
        furColor: "black",
        size: "tiny",
        earShape: "floppy",
        markings: "two tiny teeth",
        funnyHabit: "befriends crows",
      },
    };
    const comic = generateComic(noPhotoInput, 4321);
    const { container } = render(<ComicPoster comic={comic} dogInput={noPhotoInput} />);

    expect(container.querySelectorAll("article")).toHaveLength(4);
    expect(screen.getAllByText(/tiny/i).length).toBeGreaterThan(0);
    expect(screen.queryByAltText(/comic panel/i)).not.toBeInTheDocument();
  });
});
