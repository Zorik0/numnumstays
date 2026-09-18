import Image from "next/image";
import Link from "next/link";
import { coverPhoto, stayPath } from "@/data/stays";
import type { Stay } from "@/data/types";
import { cn } from "@/lib/cn";
import { DoorPlate } from "./door-plate";

type StayCardProps = {
  stay: Stay;
  /** Bigger homes get bigger cards. */
  size?: "lg" | "md";
  /** The image's rendered width at each breakpoint, for next/image. */
  sizes: string;
  headingLevel?: "h2" | "h3" | "h4";
  className?: string;
};

export function StayCard({ stay, size = "md", sizes, headingLevel: Heading = "h3", className }: StayCardProps) {
  const photo = coverPhoto(stay.slug);
  const floor = stay.floor.split(",")[0];

  return (
    <article className={cn("group relative flex flex-col", className)}>
      <div
        className={cn(
          "relative overflow-hidden rounded-lg bg-line",
          size === "lg" ? "aspect-[4/3]" : "aspect-[3/2]",
        )}
      >
        <Image
          src={photo.src}
          alt={`Inside ${stay.name}`}
          fill
          sizes={sizes}
          placeholder="blur"
          blurDataURL={photo.blurDataURL}
          className="object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.025]"
        />
        <DoorPlate unit={stay.unit} size={size === "lg" ? "md" : "sm"} className="absolute left-3 top-3" />
      </div>

      <Heading
        className={cn(
          "mt-5 font-bold uppercase leading-none",
          size === "lg" ? "text-card" : "text-2xl",
        )}
      >
        <Link
          href={stayPath(stay)}
          className="outline-none decoration-2 underline-offset-[6px] group-hover:underline after:absolute after:inset-0 after:rounded-lg focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-ink"
        >
          {stay.name}
        </Link>
      </Heading>
      <p className="mt-2.5 text-muted">{stay.tagline}</p>
      <ul className="mt-4 flex flex-wrap gap-2 text-sm" aria-label={`${stay.name} at a glance`}>
        <li className="rounded-full bg-lilac px-3 py-1 font-medium">{stay.type}</li>
        <li className="rounded-full border border-line px-3 py-1">Sleeps {stay.guests}</li>
        <li className="rounded-full border border-line px-3 py-1">{floor}</li>
      </ul>
    </article>
  );
}
