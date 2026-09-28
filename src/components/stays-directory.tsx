import { groups, staysIn } from "@/data/stays";
import type { Stay } from "@/data/types";
import { cn } from "@/lib/cn";
import { StayCard } from "./stay-card";

const typeRank: Record<Stay["type"], number> = { "3 BHK": 4, "1 BHK": 3, Studio: 2, Room: 1 };

// Largest first, so card size follows the size of the place.
const bySize = (a: Stay, b: Stay) => b.guests - a.guests || typeRank[b.type] - typeRank[a.type];

type StaysDirectoryProps = {
  headingLevel?: "h2" | "h3";
  /** On phones, show each group as a swipeable row instead of a long list. */
  swipeOnPhones?: boolean;
};

/** Every stay, grouped into 3 BHK homes, smaller places and budget stays. */
export function StaysDirectory({ headingLevel = "h3", swipeOnPhones = false }: StaysDirectoryProps) {
  const homes = staysIn("homes");
  const compact = staysIn("compact").sort(bySize);
  const budget = staysIn("budget");
  const cardHeading = headingLevel === "h2" ? "h3" : "h4";

  // From md up both variants are the same grid; they differ only on phones.
  const row = swipeOnPhones
    ? "no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-2 sm:-mx-6 sm:scroll-px-6 sm:px-6 md:mx-0 md:grid md:overflow-visible md:px-0 md:pb-0"
    : "grid gap-12";
  const slide = swipeOnPhones ? "w-[82%] shrink-0 snap-start sm:w-[58%] md:w-auto" : undefined;
  const phoneWidth = swipeOnPhones ? "(min-width: 640px) 58vw, 82vw" : "100vw";
  const halfWidth = `(min-width: 1280px) 600px, (min-width: 768px) 50vw, ${phoneWidth}`;
  const thirdWidth = `(min-width: 1280px) 400px, (min-width: 768px) 33vw, ${phoneWidth}`;

  return (
    <div className="space-y-14 md:space-y-20 lg:space-y-24">
      <section aria-labelledby="group-homes">
        <GroupHeader id="group-homes" as={headingLevel} {...groups.homes} />
        <div className={cn(row, "mt-6 md:mt-8 md:grid-cols-2 md:gap-8")}>
          {homes.map((stay) => (
            <StayCard
              key={stay.slug}
              stay={stay}
              size="lg"
              headingLevel={cardHeading}
              sizes={halfWidth}
              className={slide}
            />
          ))}
        </div>
      </section>

      <section aria-labelledby="group-compact">
        <GroupHeader id="group-compact" as={headingLevel} {...groups.compact} />
        <div className={cn(row, "mt-6 md:mt-8 md:grid-cols-6 md:gap-x-6 md:gap-y-14")}>
          {compact.map((stay, index) => (
            <StayCard
              key={stay.slug}
              stay={stay}
              headingLevel={cardHeading}
              sizes={index < 2 ? halfWidth : thirdWidth}
              className={cn(slide, index < 2 ? "md:col-span-3" : "md:col-span-2")}
            />
          ))}
        </div>
      </section>

      {/* Hidden until the group has stays, so the page never shows an empty heading. */}
      {budget.length > 0 ? (
        <section id="budget-stays" aria-labelledby="group-budget">
          <GroupHeader id="group-budget" as={headingLevel} {...groups.budget} />
          <div className={cn(row, "mt-6 md:mt-8 md:grid-cols-3 md:gap-x-6 md:gap-y-14")}>
            {budget.map((stay) => (
              <StayCard
                key={stay.slug}
                stay={stay}
                headingLevel={cardHeading}
                sizes={thirdWidth}
                className={slide}
              />
            ))}
          </div>
        </section>
      ) : null}
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
    <div className="flex flex-col gap-1.5 border-b border-line pb-4 md:flex-row md:items-end md:justify-between md:gap-10 md:pb-5">
      <Heading id={id} className="text-2xl font-semibold tracking-tight sm:text-3xl">
        {title}
      </Heading>
      <p className="max-w-md text-muted md:text-right">{intro}</p>
    </div>
  );
}
