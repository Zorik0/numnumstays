import { brandPaths } from "./paths";

type BrandIconProps = {
  name: keyof typeof brandPaths;
  className?: string;
};

export function BrandIcon({ name, className }: BrandIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d={brandPaths[name]} />
    </svg>
  );
}
