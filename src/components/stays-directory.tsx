import { groups, staysIn } from "@/data/stays";
import type { Stay } from "@/data/types";
import { StayCard } from "./stay-card";

const typeRank: Record<Stay["type"], number> = { "3 BHK": 4, "1 BHK": 3, Studio: 2, Room: 1 };

// Largest first, so card size follows the size of the place.
const bySize = (a: Stay, b: Stay) => b.guests - a.guests || typeRank[b.type] - typeRank[a.type];

const halfWidth = "(min-width: 1280px) 600px, (min-width: 768px) 50vw, 100vw";
const thirdWidth = "(min-width: 1280px) 400px, (min-width: 768px) 33vw, 100vw";

/** All seven stays, grouped by who they suit. */
export function StaysDirectory({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const homes = staysIn("homes");
  const compact = staysIn("compact").sort(bySize);
  const cardHeading = headingLevel === "h2" ? "h3" : "h4";

  return (
    <div className="space-y-20 lg:space-y-24">
      <section aria-labelledby="group-homes">
        <GroupHeader id="group-homes" as={headingLevel} {...groups.homes} />
        <div className="mt-8 grid gap-12 md:grid-cols-2 md:gap-8">
          {homes.map((stay) => (
            <StayCard key={stay.slug} stay={stay} size="lg" headingLevel={cardHeading} sizes={halfWidth} />
          ))}
        </div>
      </section>

      <section aria-labelledby="group-compact">
        <GroupHeader id="group-compact" as={headingLevel} {...groups.compact} />
        <div className="mt-8 grid gap-12 md:grid-cols-6 md:gap-x-6 md:gap-y-14">
          {compact.map((stay, index) => (
            <StayCard
              key={stay.slug}
              stay={stay}
              headingLevel={cardHeading}
              sizes={index < 2 ? halfWidth : thirdWidth}
              className={index < 2 ? "md:col-span-3" : "md:col-span-2"}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function GroupHeader({
  id,
  as: Heading,
  title,
  intro,
}: {
  id: string;
  as: "h2" | "h3";
  title: string;
  intro: string;
}) {
  return (
    <div className="flex flex-col gap-2 border-b border-line pb-5 md:flex-row md:items-end md:justify-between md:gap-10">
      <Heading id={id} className="text-2xl font-semibold tracking-tight sm:text-3xl">
        {title}
      </Heading>
      <p className="max-w-md text-muted md:text-right">{intro}</p>
    </div>
  );
}
