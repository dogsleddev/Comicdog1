import { themeOptions } from "@/lib/comicTemplates";
import type { ComicTheme } from "@/lib/types";

type ThemeSelectorProps = {
  value: ComicTheme;
  onChange: (value: ComicTheme) => void;
};

export function ThemeSelector({ value, onChange }: ThemeSelectorProps) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-black uppercase tracking-[0.18em] text-slate-700">Comic Theme</legend>
      <div className="grid grid-cols-1 gap-2">
        {themeOptions.map((option) => {
          const selected = option.value === value;
          return (
            <button
              type="button"
              key={option.value}
              onClick={() => onChange(option.value)}
              className={`rounded-2xl border-2 border-black p-3 text-left transition active:translate-y-1 ${
                selected
                  ? "bg-yellow-300 text-black shadow-[4px_4px_0_#111827]"
                  : "bg-white/85 text-slate-900 shadow-[2px_2px_0_#111827]"
              }`}
              aria-pressed={selected}
            >
              <div className="font-black">{option.label}</div>
              <div className="text-xs font-bold opacity-80">{option.description}</div>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
