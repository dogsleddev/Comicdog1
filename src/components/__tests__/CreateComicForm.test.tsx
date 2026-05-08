import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { CreateComicForm } from "../CreateComicForm";

describe("CreateComicForm", () => {
  it("submits dog details without uploading images anywhere", async () => {
    const user = userEvent.setup();
    const onGenerate = vi.fn();

    render(
      <CreateComicForm
        photoUrl="blob:test-dog"
        onPhotoSelected={vi.fn()}
        onGenerate={onGenerate}
        onManualMode={vi.fn()}
        onUseSample={vi.fn()}
        onBack={vi.fn()}
      />,
    );

    await user.type(screen.getByLabelText(/Dog Name/i), "Lucy");
    await user.click(screen.getByRole("button", { name: /Mischievous/i }));
    await user.click(screen.getByRole("button", { name: /Detective Dog/i }));
    await user.type(screen.getByLabelText(/Notes/i), "Fluff balls!!");
    await user.click(screen.getByRole("button", { name: /Generate Comic/i }));

    expect(onGenerate).toHaveBeenCalledWith({
      dogName: "Lucy",
      personality: "Mischievous",
      theme: "Detective Dog",
      notes: "Fluff balls!!",
      photoUrl: "blob:test-dog",
    });
  });

  it("supports manual description and sample dog fallbacks", async () => {
    const user = userEvent.setup();
    const onManualMode = vi.fn();
    const onUseSample = vi.fn();

    render(
      <CreateComicForm
        photoUrl={null}
        onPhotoSelected={vi.fn()}
        onGenerate={vi.fn()}
        onManualMode={onManualMode}
        onUseSample={onUseSample}
        onBack={vi.fn()}
      />,
    );

    await user.click(screen.getByRole("button", { name: /Describe Dog Instead/i }));
    await user.click(screen.getByRole("button", { name: /Use Sample Dog/i }));

    expect(onManualMode).toHaveBeenCalledTimes(1);
    expect(onUseSample).toHaveBeenCalledTimes(1);
  });
});
