import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ManualDescriptionForm } from "../ManualDescriptionForm";

describe("ManualDescriptionForm", () => {
  it("generates a comic from a dog description with no photo URL", async () => {
    const user = userEvent.setup();
    const onGenerate = vi.fn();

    render(<ManualDescriptionForm onGenerate={onGenerate} onBack={vi.fn()} />);

    await user.type(screen.getByLabelText(/Dog name/i), "Shasta");
    await user.type(screen.getByLabelText(/Breed\/type/i), "Husky");
    await user.type(screen.getByLabelText(/Fur color/i), "White");
    await user.type(screen.getByLabelText(/Size/i), "Large");
    await user.type(screen.getByLabelText(/Ear shape/i), "Pointy");
    await user.type(screen.getByLabelText(/Markings/i), "blue eyes");
    await user.click(screen.getByRole("button", { name: /Sleepy/i }));
    await user.click(screen.getByRole("button", { name: /Royal Pup/i }));
    await user.type(screen.getByLabelText(/Funny habit/i), "snow zoomies");
    await user.type(screen.getByLabelText(/Optional notes/i), "red harness");
    await user.click(screen.getByRole("button", { name: /Generate Comic/i }));

    expect(onGenerate).toHaveBeenCalledWith({
      dogName: "Shasta",
      personality: "Sleepy",
      theme: "Royal Pup",
      notes: "red harness",
      photoUrl: null,
      description: {
        breedType: "Husky",
        furColor: "White",
        size: "Large",
        earShape: "Pointy",
        markings: "blue eyes",
        funnyHabit: "snow zoomies",
      },
    });
  });
});
