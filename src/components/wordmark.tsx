import { wordmark } from "./paths";

type WordmarkProps = {
  className?: string;
  /** Accessible name. Leave empty when the name is already given nearby. */
  title?: string;
};

/** The stacked NUM / NUM / STAYS lettering, traced from the logo. Fills with currentColor. */
export function Wordmark({ className, title }: WordmarkProps) {
  const labelled = Boolean(title);
  return (
    <svg
      viewBox={`0 0 ${wordmark.width} ${wordmark.height}`}
      fill="currentColor"
      fillRule="evenodd"
      className={className}
      role={labelled ? "img" : undefined}
      aria-label={labelled ? title : undefined}
      aria-hidden={labelled ? undefined : true}
      focusable="false"
    >
      <path d={wordmark.num} />
      <path d={wordmark.num} transform={`translate(0 ${wordmark.rowOffset})`} />
      <path d={wordmark.stays} />
    </svg>
  );
}
