import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { BrandIcon } from "@/components/brand-icon";
import { HeroPicker, type HeroSlide } from "@/components/hero-picker";
import { JsonLd } from "@/components/json-ld";
import { MapEmbed } from "@/components/map-embed";
import { NightWindow } from "@/components/night-window";
import { StaysDirectory } from "@/components/stays-directory";
import { button, textLink } from "@/components/ui";
import { Wordmark } from "@/components/wordmark";
import {
  bookingMessage,
  directionsUrl,
  emailLink,
  primaryPhone,
  site,
  siteUrl,
  whatsappLink,
} from "@/data/site";
import { coverPhoto, getStay, stayPath, stays } from "@/data/stays";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ description: site.description, path: "/" });

const slides: HeroSlide[] = stays.map((stay) => ({
  slug: stay.slug,
  unit: stay.unit,
  name: stay.name,
  type: stay.type,
  guests: stay.guests,
  href: stayPath(stay),
  photo: coverPhoto(stay.slug),
}));

function StayLink({ slug }: { slug: string }) {
  const stay = getStay(slug);
  if (!stay) return null;
  return (
    <Link href={stayPath(stay)} className={cn("font-medium text-ink", textLink)}>
      {stay.name}
    </Link>
  );
}

const goodToKnow = [
  {
    title: "Check-in 1 pm, checkout 10 am",
    body: <>Arrive any time after {site.checkIn} and leave by {site.checkOut}. Most stays have self check-in.</>,
  },
  {
    title: "Stairs, not lifts",
    body: (
      <>
        The upper-floor stays have no lift. <StayLink slug="comfy-pod" /> and <StayLink slug="chillax-pod" /> are
        on the ground floor.
      </>
    ),
  },
  {
    title: "Parking",
    body: (
      <>
        <StayLink slug="ample-house" /> and <StayLink slug="jolly-house" /> each have parking for one car. The
        other stays have no car parking.
      </>
    ),
  },
  {
    title: "Power backup",
    body: (
      <>
        Partial power backup at <StayLink slug="wonk-studio" />, <StayLink slug="jolly-house" />,{" "}
        <StayLink slug="snug-studio" /> and <StayLink slug="light-house" />.
      </>
    ),
  },
  {
    title: "Luggage drop-off",
    body: (
      <>
        Arriving early or leaving late? <StayLink slug="ample-house" />, <StayLink slug="jolly-house" /> and{" "}
        <StayLink slug="snug-studio" /> can hold your bags.
      </>
    ),
  },
  {
    title: "Bring a valid ID",
    body: <>Guests must show a valid ID at check-in, such as an Aadhaar card, driving licence or passport.</>,
  },
];

const steps = [
  {
    title: "Pick a stay",
    body: "Choose the one that suits your group, from a room for two to a 3 BHK for ten.",
  },
  {
    title: "Message us",
    body: "Send your dates and number of guests on WhatsApp, or give us a call. We'll confirm availability.",
  },
  {
    title: "Check in",
    body: `Arrive after ${site.checkIn} with a valid ID. Checkout is by ${site.checkOut}.`,
  },
];

export default function HomePage() {
  const url = siteUrl();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: site.name,
    description: site.description,
    url,
    logo: `${url}/logo.png`,
    image: stays.map((stay) => `${url}${coverPhoto(stay.slug).src}`),
    telephone: primaryPhone.tel,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.countryCode,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    checkinTime: "13:00",
    checkoutTime: "10:00",
    sameAs: [site.instagram.url],
    containsPlace: stays.map((stay) => ({
      "@type": "Accommodation",
      name: stay.name,
      url: `${url}${stayPath(stay)}`,
      occupancy: { "@type": "QuantitativeValue", maxValue: stay.guests },
    })),
  };

  return (
    <>
      <JsonLd data={structuredData} />

      {/* Hero: the logo at full size beside a window onto each stay. */}
      <section className="on-ink overflow-hidden bg-ink text-white">
        <div className="container-page grid gap-14 pb-16 pt-10 sm:pt-14 lg:grid-cols-12 lg:items-center lg:gap-10 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-6">
            <h1 id="hero-wordmark">
              <span className="sr-only">NumNum Stays</span>
              <Wordmark className="w-[min(72vw,19rem)] text-mustard sm:w-[24rem] xl:w-[28rem]" />
            </h1>
            <p className="mt-10 max-w-md text-lead text-white/85">
              Seven cosy, colourful stays in Saket, South Delhi. From a room for two to 3 BHK homes that sleep ten.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={whatsappLink(bookingMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className={button.primary}
              >
                <BrandIcon name="whatsapp" className="size-5" />
                Book on WhatsApp
              </a>
              <Link href="#stays" className={button.ghostOnInk}>
                See the stays
              </Link>
            </div>
          </div>
          <div className="lg:col-span-6">
            <HeroPicker slides={slides} />
          </div>
        </div>
      </section>

      {/* The stays */}
      <section id="stays" aria-labelledby="stays-heading" className="py-20 lg:py-28">
        <div className="container-page">
          <div className="max-w-2xl">
            <h2 id="stays-heading" className="text-section font-semibold">
              The stays
            </h2>
            <p className="mt-4 text-lead text-muted">
              All seven are in Saket, a 5–7 minute drive from Saket Metro Station. Each one is decorated in its
              own way, and all of them are kept very clean and well maintained.
            </p>
          </div>
          <div className="mt-14">
            <StaysDirectory />
          </div>
        </div>
      </section>

      {/* Good to know */}
      <section aria-labelledby="know-heading" className="bg-lilac py-20 lg:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="know-heading" className="text-section font-semibold">
              Good to know
            </h2>
            <p className="mt-4 max-w-sm text-ink/70">
              What&apos;s the same at every stay, and where they differ.
            </p>
          </div>
          <dl className="grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:col-span-8">
            {goodToKnow.map((fact) => (
              <div key={fact.title} className="border-t border-ink/15 pt-4">
                <dt className="text-lg font-semibold">{fact.title}</dt>
                <dd className="mt-1.5 text-ink/75">{fact.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* How to book */}
      <section id="booking" aria-labelledby="booking-heading" className="on-ink overflow-hidden bg-ink py-20 text-white lg:py-28">
        <div className="container-page grid items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 id="booking-heading" className="text-section font-semibold">
              How to book
            </h2>
            <p className="mt-4 max-w-lg text-lead text-white/80">
              Book direct with us on WhatsApp or by phone. Every stay is on Airbnb too, if you&apos;d rather book
              there.
            </p>
            <ol className="mt-10 space-y-7">
              {steps.map((step, index) => (
                <li key={step.title} className="grid grid-cols-[auto_1fr] gap-5">
                  <span
                    aria-hidden="true"
                    className="flex size-10 items-center justify-center rounded-full border border-mustard/50 font-semibold tabular-nums text-mustard"
                  >
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                    <p className="mt-1 text-mist">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={whatsappLink(bookingMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className={button.primary}
              >
                <BrandIcon name="whatsapp" className="size-5" />
                Book on WhatsApp
              </a>
              <a href={`tel:${primaryPhone.tel}`} className={button.ghostOnInk}>
                <Phone className="size-4" aria-hidden="true" />
                Call {primaryPhone.display}
              </a>
            </div>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <NightWindow />
          </div>
        </div>
      </section>

      {/* Find us */}
      <section id="contact" aria-labelledby="contact-heading" className="py-20 lg:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <h2 id="contact-heading" className="text-section font-semibold">
              Find us
            </h2>
            <address className="mt-6 text-lead not-italic">
              {site.address.street}
              <br />
              {site.address.locality}, {site.address.region} {site.address.postalCode}
            </address>
            <p className="mt-3 max-w-md text-muted">
              In Saket, South Delhi, a 5–7 minute drive from Saket Metro Station, with Select Citywalk and Max
              Hospital close by.
            </p>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(button.ink, "mt-6")}
            >
              <MapPin className="size-4" aria-hidden="true" />
              Get directions
            </a>

            <ul className="mt-12 divide-y divide-line border-y border-line">
              <ContactRow
                icon={<Phone className="size-5" aria-hidden="true" />}
                label="Call"
                value={
                  <span className="flex flex-wrap gap-x-4">
                    {site.phones.map((phone) => (
                      <a key={phone.tel} href={`tel:${phone.tel}`} className={cn("tabular-nums", textLink)}>
                        {phone.display}
                      </a>
                    ))}
                  </span>
                }
              />
              <ContactRow
                icon={<BrandIcon name="whatsapp" className="size-5" />}
                label="WhatsApp"
                value={
                  <a
                    href={whatsappLink(bookingMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn("tabular-nums", textLink)}
                  >
                    {primaryPhone.display}
                  </a>
                }
              />
              <ContactRow
                icon={<Mail className="size-5" aria-hidden="true" />}
                label="Email"
                value={
                  <a href={emailLink} className={textLink}>
                    {site.email}
                  </a>
                }
              />
              <ContactRow
                icon={<BrandIcon name="instagram" className="size-5" />}
                label="Instagram"
                value={
                  <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className={textLink}>
                    @{site.instagram.handle}
                  </a>
                }
              />
            </ul>
          </div>
          <div className="lg:col-span-7">
            <MapEmbed className="aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[32rem]" />
          </div>
        </div>
      </section>
    </>
  );
}

function ContactRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) {
  return (
    <li className="flex items-start gap-4 py-4">
      <span className="mt-0.5 text-muted">{icon}</span>
      <span className="w-24 shrink-0 text-muted">{label}</span>
      <span className="min-w-0 break-words">{value}</span>
    </li>
  );
}
