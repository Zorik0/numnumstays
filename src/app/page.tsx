import Link from "next/link";
import { Car, Clock, Footprints, IdCard, Luggage, Mail, MapPin, Phone, Zap } from "lucide-react";
import { BrandIcon } from "@/components/brand-icon";
import { HeroPicker, type HeroSlide } from "@/components/hero-picker";
import { JsonLd } from "@/components/json-ld";
import { MapEmbed } from "@/components/map-embed";
import { NightWindow } from "@/components/night-window";
import { StaysDirectory } from "@/components/stays-directory";
import { button, compactOnPhones, textLink } from "@/components/ui";
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
import { coverPhoto, getStay, stayCount, stayCountCapitalised, stayPath, stays } from "@/data/stays";
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
    icon: Clock,
    title: "Check-in & checkout",
    body: (
      <>
        Check in after {site.checkIn} and check out by {site.checkOut}. Many stays have self check-in.
      </>
    ),
  },
  {
    icon: Footprints,
    title: "Lifts and stairs",
    body: (
      <>
        <StayLink slug="swift" />, <StayLink slug="knights" />, <StayLink slug="boutique" /> and{" "}
        <StayLink slug="calm-boho" /> have a lift. Most other upper floors are stairs only, and all four Pods are
        on the ground floor.
      </>
    ),
  },
  {
    icon: Car,
    title: "Parking",
    body: (
      <>
        Parking for one car at <StayLink slug="ample-house" /> and <StayLink slug="jolly-house" />. None at the
        others.
      </>
    ),
  },
  {
    icon: Zap,
    title: "Power backup",
    body: (
      <>
        Full backup at <StayLink slug="knights" />, and partial backup at most others. None at{" "}
        <StayLink slug="ample-house" />, <StayLink slug="comfy-pod" />, <StayLink slug="chillax-pod" /> or{" "}
        <StayLink slug="swift" />.
      </>
    ),
  },
  {
    icon: Luggage,
    title: "Luggage drop-off",
    body: (
      <>
        Early or late? <StayLink slug="ample-house" />, <StayLink slug="jolly-house" />,{" "}
        <StayLink slug="snug-studio" /> and <StayLink slug="knights" /> can hold your bags.
      </>
    ),
  },
  {
    icon: IdCard,
    title: "Bring a valid ID",
    body: <>Guests need a valid ID at check-in, like an Aadhaar card, driving licence or passport.</>,
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
        <div className="container-page grid gap-9 pb-12 pt-7 sm:gap-14 sm:pb-16 sm:pt-14 lg:grid-cols-12 lg:items-center lg:gap-10 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-6">
            <h1>
              <span className="sr-only">NumNum Stays</span>
              <Wordmark className="w-[min(60vw,15rem)] text-mustard sm:w-[22rem] xl:w-[28rem]" />
            </h1>
            <p className="mt-6 max-w-md text-lead text-white/85 sm:mt-10">
              {stayCountCapitalised} cosy, colourful stays in Saket, South Delhi. From a room for two to 3 BHK homes
              that sleep ten.
            </p>
            <div data-booking-cta className="mt-6 flex flex-wrap gap-2.5 sm:mt-8 sm:gap-3">
              <a
                href={whatsappLink(bookingMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(button.primary, compactOnPhones)}
              >
                <BrandIcon name="whatsapp" className="size-5" />
                Book on WhatsApp
              </a>
              <Link href="#stays" className={cn(button.ghostOnInk, compactOnPhones)}>
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
      <section id="stays" aria-labelledby="stays-heading" className="py-14 sm:py-20 lg:py-28">
        <div className="container-page">
          <div className="max-w-2xl">
            <h2 id="stays-heading" className="text-section font-semibold">
              The stays
            </h2>
            <p className="mt-3 text-lead text-muted sm:mt-4">
              All {stayCount} are in Saket, a 5–7 minute drive from Saket Metro Station. Each one is decorated in
              its own way, and all of them are kept very clean and well maintained.
            </p>
          </div>
          <div className="mt-10 sm:mt-14">
            <StaysDirectory swipeOnPhones />
          </div>
        </div>
      </section>

      {/* Good to know */}
      <section aria-labelledby="know-heading" className="bg-lilac py-14 sm:py-20 lg:py-24">
        <div className="container-page grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <h2 id="know-heading" className="text-section font-semibold">
              Good to know
            </h2>
            <p className="mt-3 max-w-sm text-ink/70 sm:mt-4">
              What&apos;s the same at every stay, and where they differ.
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:col-span-8 lg:grid-cols-3">
            {goodToKnow.map(({ icon: Icon, title, body }) => (
              <li key={title} className="rounded-xl bg-white/75 p-4 sm:p-5">
                <span
                  aria-hidden="true"
                  className="flex size-9 items-center justify-center rounded-full bg-ink text-mustard"
                >
                  <Icon className="size-[1.125rem]" />
                </span>
                <h3 className="mt-3.5 font-semibold leading-snug sm:text-lg">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/75 sm:text-base">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How to book */}
      <section
        id="booking"
        aria-labelledby="booking-heading"
        className="on-ink overflow-hidden bg-ink py-14 text-white sm:py-20 lg:py-28"
      >
        <div className="container-page grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <h2 id="booking-heading" className="text-section font-semibold">
              How to book
            </h2>
            <p className="mt-3 max-w-lg text-lead text-white/80 sm:mt-4">
              Book direct with us on WhatsApp or by phone. Every stay is on Airbnb too, if you&apos;d rather book
              there.
            </p>
            <ol className="mt-8 space-y-6 sm:mt-10 sm:space-y-7">
              {steps.map((step, index) => (
                <li key={step.title} className="grid grid-cols-[auto_1fr] gap-4 sm:gap-5">
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
            <div data-booking-cta className="mt-8 flex flex-wrap gap-2.5 sm:mt-10 sm:gap-3">
              <a
                href={whatsappLink(bookingMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(button.primary, compactOnPhones)}
              >
                <BrandIcon name="whatsapp" className="size-5" />
                Book on WhatsApp
              </a>
              <a href={`tel:${primaryPhone.tel}`} className={cn(button.ghostOnInk, compactOnPhones)}>
                <Phone className="size-4" aria-hidden="true" />
                <span className="sm:hidden">Call us</span>
                <span className="hidden sm:inline">Call {primaryPhone.display}</span>
              </a>
            </div>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <NightWindow />
          </div>
        </div>
      </section>

      {/* Find us. On phones the map comes before the contact list; on large screens it sits beside both. */}
      <section id="contact" aria-labelledby="contact-heading" className="py-14 sm:py-20 lg:py-28">
        <div className="container-page grid gap-8 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-10">
          <div className="lg:col-span-5">
            <h2 id="contact-heading" className="text-section font-semibold">
              Find us
            </h2>
            <address className="mt-5 text-lead not-italic sm:mt-6">
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
              className={cn(button.ink, compactOnPhones, "mt-6")}
            >
              <MapPin className="size-4" aria-hidden="true" />
              Get directions
            </a>
          </div>

          <MapEmbed className="aspect-[4/3] lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1 lg:aspect-auto lg:h-full lg:min-h-[32rem]" />

          <ul className="divide-y divide-line border-y border-line lg:col-span-5">
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
