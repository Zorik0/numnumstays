// Shared button looks. Pills echo the rounded buttons of the previous site.
const base =
  "inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-base font-semibold leading-none transition-colors duration-200 select-none";

export const button = {
  /** Mustard on anything. The main booking action. */
  primary: `${base} bg-mustard text-ink hover:bg-mustard-deep`,
  /** Outline for dark sections. */
  ghostOnInk: `${base} border border-white/25 text-white hover:border-white/70 hover:bg-white/5`,
  /** Solid ink for light sections. */
  ink: `${base} bg-ink text-white hover:bg-ink-raised`,
  /** Outline for light sections. */
  outline: `${base} border border-ink/20 text-ink hover:border-ink hover:bg-ink/[0.03]`,
};

export const textLink =
  "underline decoration-current/30 underline-offset-4 transition-colors hover:decoration-current";
