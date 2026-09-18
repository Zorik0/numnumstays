import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Bath, BedDouble, Building2, Car, Check, DoorOpen, MapPin, Users } from "lucide-react";
import { DoorPlate } from "@/components/door-plate";
import { GalleryProvider, PhotoGrid, StayMosaic } from "@/components/gallery";
import { JsonLd } from "@/components/json-ld";
import { MapEmbed } from "@/components/map-embed";
import { BookingCard, MobileBookBar } from "@/components/stay-booking";
import { StayCard } from "@/components/stay-card";
import { button, textLink } from "@/components/ui";
import { directionsUrl, site, siteUrl } from "@/data/site";
import { getStay, photosFor, stayPath, stays } from "@/data/stays";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return stays.map((stay) => ({ slug: stay.slug }));
}

export async function generateMetadata({ params }: PageProps<"/stays/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const stay = getStay(slug);
  if (!stay) return {};
  return pageMetadata({
    title: `${stay.name} (${stay.unit}), ${stay.type} in Saket`,
    description: `${stay.tagline} ${stay.description}`,
    path: stayPath(stay),
    image: { url: `/og/${stay.slug}.jpg`, alt: `Inside ${stay.name}, with its door plate ${stay.unit}` },
  });
}

export default async function StayPage({ params }: PageProps<"/stays/[slug]">) {
  const { slug } = await params;
  const stay = getStay(slug);
  if (!stay) notFound();

  const photos = photosFor(stay.slug);
  const otherStays = stays.filter((other) => other.slug !== stay.slug);
  const url = siteUrl();

  const facts = [
    { icon: Users, label: "Guests", value: `Up to ${stay.guests}` },
    { icon: DoorOpen, label: "Space", value: stay.bedrooms },
    { icon: BedDouble, label: "Beds", value: stay.beds },
    { icon: Bath, label: "Bathrooms", value: stay.bathrooms },
    { icon: Building2, label: "Floor", value: stay.floor },
    { icon: Car, label: "Parking", value: stay.parking },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Accommodation",
    name: `${stay.name} at ${site.name}`,
    description: stay.description,
    url: `${url}${stayPath(stay)}`,
    image: photos.slice(0, 6).map((photo) => `${url}${photo.src}`),
    occupancy: { "@type": "QuantitativeValue", maxValue: stay.guests },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Saket, New Delhi",
      addressRegion: site.address.region,
      addressCountry: site.address.countryCode,
    },
    containedInPlace: { "@type": "LodgingBusiness", name: site.name, url },
  };

  return (
    <>
      <JsonLd data={structuredData} />
      <GalleryProvider photos={photos} label={stay.name}>
        <article>
          <header className="container-page pt-6 sm:pt-10">
            <nav aria-label="Breadcrumb" className="text-sm text-muted">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/stays" className={textLink}>
                    All stays
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-ink">
                  {stay.name}
                </li>
              </ol>
            </nav>
            <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <DoorPlate unit={stay.unit} name={stay.name} size="lg" />
                <h1 className="mt-6 text-title font-bold uppercase">{stay.name}</h1>
              </div>
              <p className="max-w-md text-lead text-muted sm:pb-1 sm:text-right">
                {stay.type} in Saket, South Delhi. Sleeps up to {stay.guests}.
              </p>
            </div>
          </header>

          <div className="container-page mt-8 sm:mt-10">
            <StayMosaic featured={stay.featured} />
          </div>

          <div className="container-page grid gap-12 py-14 lg:grid-cols-12 lg:gap-10 lg:py-20">
            <div className="lg:col-span-7">
              <p className="text-lead">{stay.description}</p>

              <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-y border-line py-8 sm:grid-cols-3">
                {facts.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex gap-3">
                    <Icon className="mt-0.5 size-5 shrink-0 text-muted" aria-hidden="true" />
                    <div>
                      <dt className="text-sm text-muted">{label}</dt>
                      <dd className="mt-0.5 font-medium">{value}</dd>
                    </div>
                  </div>
                ))}
              </dl>

              <section aria-labelledby="highlights-heading" className="mt-12">
                <h2 id="highlights-heading" className="text-2xl font-semibold tracking-tight">
                  What you get
                </h2>
                <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {stay.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3">
                      <Check className="mt-1 size-4 shrink-0 text-ink" strokeWidth={2.5} aria-hidden="true" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                  <li className="flex gap-3">
                    <Check className="mt-1 size-4 shrink-0 text-ink" strokeWidth={2.5} aria-hidden="true" />
                    <span>Very clean and well maintained</span>
                  </li>
                </ul>
              </section>

              <section aria-labelledby="before-heading" className="mt-12 rounded-xl bg-lilac p-6 sm:p-8">
                <h2 id="before-heading" className="text-2xl font-semibold tracking-tight">
                  Before you book
                </h2>
                <ul className="mt-5 space-y-3 text-ink/80">
                  {stay.notes.map((note) => (
                    <li key={note} className="flex gap-3">
                      <span aria-hidden="true" className="mt-[0.6rem] size-1.5 shrink-0 rounded-full bg-ink/60" />
                      <span>{note}</span>
                    </li>
                  ))}
                  <li className="flex gap-3">
                    <span aria-hidden="true" className="mt-[0.6rem] size-1.5 shrink-0 rounded-full bg-ink/60" />
                    <span>
                      Check-in is after {site.checkIn} and checkout is before {site.checkOut}.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span aria-hidden="true" className="mt-[0.6rem] size-1.5 shrink-0 rounded-full bg-ink/60" />
                    <span>
                      Guests must show a valid ID at check-in. See our{" "}
                      <Link href="/terms" className={cn("font-medium text-ink", textLink)}>
                        terms &amp; conditions
                      </Link>
                      .
                    </span>
                  </li>
                </ul>
              </section>

              <section aria-labelledby="where-heading" className="mt-12">
                <h2 id="where-heading" className="text-2xl font-semibold tracking-tight">
                  Where it is
                </h2>
                <p className="mt-3 text-muted">
                  In Saket, South Delhi, a 5–7 minute drive from Saket Metro Station.
                </p>
                <MapEmbed className="mt-6 aspect-[16/10]" />
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(button.outline, "mt-5")}
                >
                  <MapPin className="size-4" aria-hidden="true" />
                  Get directions
                </a>
              </section>
            </div>

            <aside className="hidden lg:col-span-4 lg:col-start-9 lg:block">
              <div className="sticky top-24">
                <BookingCard stay={stay} />
              </div>
            </aside>
          </div>

          <section aria-labelledby="photos-heading" className="container-page pb-20">
            <div className="flex items-end justify-between gap-4 border-b border-line pb-5">
              <h2 id="photos-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
                All photos
              </h2>
              <p className="text-muted tabular-nums">{photos.length} photos</p>
            </div>
            <div className="mt-6">
              <PhotoGrid />
            </div>
          </section>
        </article>
      </GalleryProvider>

      <section aria-labelledby="more-heading" className="border-t border-line bg-white py-16 lg:py-20">
        <div className="container-page">
          <h2 id="more-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
            More stays
          </h2>
          <div className="no-scrollbar -mx-4 mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:gap-y-12 lg:overflow-visible lg:px-0">
            {otherStays.map((other) => (
              <StayCard
                key={other.slug}
                stay={other}
                headingLevel="h3"
                sizes="(min-width: 1280px) 400px, (min-width: 1024px) 33vw, 80vw"
                className="w-[80%] shrink-0 snap-start sm:w-[45%] lg:w-auto"
              />
            ))}
          </div>
        </div>
      </section>

      <div aria-hidden="true" className="h-20 lg:hidden" />
      <MobileBookBar stay={stay} />
    </>
  );
}
