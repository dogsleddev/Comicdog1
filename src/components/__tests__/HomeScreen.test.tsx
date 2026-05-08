import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { HomeScreen } from "../HomeScreen";

describe("HomeScreen", () => {
  it("renders the brand, privacy note, and primary CTAs", () => {
    render(<HomeScreen onPhotoSelected={vi.fn()} onUseSample={vi.fn()} />);

    expect(screen.getByRole("heading", { name: "ComicDog" })).toBeInTheDocument();
    expect(screen.getByText("Your dog. Their origin story.")).toBeInTheDocument();
    expect(screen.getByText(/Photos stay on your device/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Take or Upload Dog Photo/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Use Sample Dog/i })).toBeInTheDocument();
  });

  it("calls the sample dog handler", async () => {
    const user = userEvent.setup();
    const onUseSample = vi.fn();

    render(<HomeScreen onPhotoSelected={vi.fn()} onUseSample={onUseSample} />);
    await user.click(screen.getByRole("button", { name: /Use Sample Dog/i }));

    expect(onUseSample).toHaveBeenCalledTimes(1);
  });
});
