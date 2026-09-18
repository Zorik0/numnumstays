import { cn } from "@/lib/cn";

type DoorPlateProps = {
  unit: string;
  /** Adds the stay name under the number, like the plates on the actual doors. */
  name?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizes = {
  sm: "px-2 py-1 text-[0.8125rem]",
  md: "px-2.5 py-1.5 text-base",
  lg: "px-3.5 py-2.5 text-2xl",
};

/** The unit number plate each NumNum door carries: charcoal plate, mustard number. */
export function DoorPlate({ unit, name, size = "sm", className }: DoorPlateProps) {
  return (
    <span
      className={cn(
        "inline-flex flex-col rounded-[3px] bg-ink text-mustard shadow-[inset_0_0_0_1px_rgb(255_255_255/0.09)]",
        name ? "items-start" : "items-center",
        sizes[size],
        className,
      )}
    >
      <span className="font-semibold leading-none tracking-[0.06em] tabular-nums">{unit}</span>
      {name ? (
        <span className="mt-1.5 text-[0.5em] font-medium uppercase leading-none tracking-[0.16em] text-white/85">
          {name}
        </span>
      ) : null}
    </span>
  );
}
