import type { ComicPanelData, DogInput } from "@/lib/types";

type ComicPanelProps = {
  panel: ComicPanelData;
  dogInput: DogInput;
};

export function ComicPanel({ panel, dogInput }: ComicPanelProps) {
  return (
    <article className={`relative min-h-0 overflow-hidden border-[3px] border-black ${panel.variant.panelClass}`}>
      {dogInput.photoUrl ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={dogInput.photoUrl}
            alt={`${dogInput.dogName} comic panel ${panel.id}`}
            className={`absolute inset-0 h-full w-full object-cover opacity-95 ${panel.variant.cropClass} ${panel.variant.imageClass}`}
          />
          <div className={`absolute inset-0 ${panel.variant.overlayClass}`} />
        </>
      ) : (
        <PlaceholderDog dogInput={dogInput} panelId={panel.id} />
      )}

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.22),transparent_38%,rgba(0,0,0,0.12))]" />

      <div className={`absolute ${panel.variant.captionPositionClass} rounded-xl border-2 border-black bg-yellow-200/95 px-2 py-1 text-[0.52rem] font-black uppercase leading-tight tracking-wide text-slate-950 shadow-[2px_2px_0_#111827] sm:text-[0.64rem]`}>
        {panel.caption}
      </div>

      <div className={`speech-bubble absolute ${panel.variant.speechPositionClass} rounded-[1rem] border-[3px] border-black bg-white px-2.5 py-2 text-[0.58rem] font-black leading-tight text-slate-950 shadow-[2px_2px_0_#111827] sm:text-[0.78rem]`}>
        “{panel.speech}”
      </div>

      <div className={`absolute ${panel.variant.actionPositionClass} text-stroke-light rounded-xl bg-orange-500 px-2 py-1 text-xl font-black italic tracking-tight text-white shadow-[3px_3px_0_#111827] sm:text-3xl`}>
        {panel.actionWord}
      </div>

      <div className="absolute left-1 top-1 grid h-5 w-5 place-items-center rounded-full border-2 border-black bg-white text-[0.65rem] font-black text-slate-950">
        {panel.id}
      </div>
    </article>
  );
}

type PlaceholderDogProps = {
  dogInput: DogInput;
  panelId: number;
};

function PlaceholderDog({ dogInput, panelId }: PlaceholderDogProps) {
  const description = dogInput.description;
  const rotate = ["-rotate-3", "rotate-6", "-rotate-6", "rotate-2"][panelId - 1] ?? "rotate-0";
  const scale = ["scale-95", "scale-110", "scale-125", "scale-105"][panelId - 1] ?? "scale-100";

  return (
    <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-yellow-200 via-orange-200 to-pink-200">
      <div className={`relative ${rotate} ${scale}`}>
        <div className="absolute -left-8 top-2 h-16 w-12 rounded-full border-4 border-black bg-orange-300" />
        <div className="absolute -right-8 top-2 h-16 w-12 rounded-full border-4 border-black bg-orange-300" />
        <div className="relative grid h-32 w-36 place-items-center rounded-[45%] border-4 border-black bg-white shadow-[6px_6px_0_#111827]">
          <div className="absolute top-7 flex w-20 justify-between">
            <span className="h-4 w-4 rounded-full bg-black" />
            <span className="h-4 w-4 rounded-full bg-black" />
          </div>
          <div className="absolute top-14 h-5 w-7 rounded-full bg-black" />
          <div className="absolute top-[4.6rem] h-5 w-12 rounded-b-full border-b-4 border-black" />
          <div className="absolute bottom-3 rounded-full bg-yellow-200 px-2 py-1 text-[0.55rem] font-black uppercase text-slate-900">
            {description?.furColor || "comic pup"}
          </div>
        </div>
      </div>
      {description ? (
        <div className="absolute bottom-2 right-2 max-w-[52%] rounded-xl border-2 border-black bg-white/85 px-2 py-1 text-[0.55rem] font-black leading-tight text-slate-900 shadow-[2px_2px_0_#111827]">
          {description.size} • {description.breedType}
        </div>
      ) : null}
    </div>
  );
}
