import Link from "next/link";
import { Mail } from "lucide-react";
import { bookingMessage, directionsUrl, emailLink, site, whatsappLink } from "@/data/site";
import { stayPath, stays } from "@/data/stays";
import { BrandIcon } from "./brand-icon";
import { DoorPlate } from "./door-plate";
import { textLink } from "./ui";
import { Wordmark } from "./wordmark";

const socialLinkClass =
  "inline-flex size-11 items-center justify-center rounded-full bg-ink-raised text-white/85 transition-colors hover:bg-mustard hover:text-ink";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="on-ink bg-ink text-white">
      <div className="container-page grid gap-12 py-16 md:grid-cols-12 lg:py-20">
        <div className="md:col-span-4">
          <Link href="/" aria-label="NumNum Stays, home" className="inline-block">
            <Wordmark className="w-28 text-mustard" />
          </Link>
          <p className="mt-6 max-w-xs text-mist">{site.tagline}</p>
          <ul className="mt-6 flex gap-2" aria-label="Get in touch">
            <li>
              <a
                href={whatsappLink(bookingMessage)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className={socialLinkClass}
              >
                <BrandIcon name="whatsapp" className="size-5" />
              </a>
            </li>
            <li>
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className={socialLinkClass}
              >
                <BrandIcon name="instagram" className="size-5" />
              </a>
            </li>
            <li>
              <a href={emailLink} aria-label="Email" className={socialLinkClass}>
                <Mail className="size-5" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h2 className="text-sm font-semibold text-white">Stays</h2>
          <ul className="mt-4 space-y-2.5">
            {stays.map((stay) => (
              <li key={stay.slug}>
                <Link
                  href={stayPath(stay)}
                  className="flex items-center gap-3 text-mist transition-colors hover:text-white"
                >
                  <DoorPlate unit={stay.unit} className="w-12" />
                  {stay.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h2 className="text-sm font-semibold text-white">Visit</h2>
          <address className="mt-4 not-italic text-mist">
            {site.address.street}
            <br />
            {site.address.locality}, {site.address.region} {site.address.postalCode}
          </address>
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-3 inline-block text-white ${textLink}`}
          >
            Get directions
          </a>

          <h2 className="mt-10 text-sm font-semibold text-white">Call</h2>
          <ul className="mt-4 space-y-1.5">
            {site.phones.map((phone) => (
              <li key={phone.tel}>
                <a href={`tel:${phone.tel}`} className="text-mist tabular-nums transition-colors hover:text-white">
                  {phone.display}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h2 className="text-sm font-semibold text-white">Info</h2>
          <ul className="mt-4 space-y-2.5">
            <li>
              <Link href="/about" className="text-mist transition-colors hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-mist transition-colors hover:text-white">
                Terms &amp; conditions
              </Link>
            </li>
            <li>
              <Link href="/#contact" className="text-mist transition-colors hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/[0.08]">
        {/* Extra bottom room on phones so the floating WhatsApp button doesn't cover the text. */}
        <div className="container-page flex flex-col gap-1 pb-24 pt-6 text-sm text-mist sm:flex-row sm:justify-between sm:pb-6">
          <p>© {year} NumNum Stays</p>
          <p>
            Check-in after {site.checkIn}. Checkout before {site.checkOut}.
          </p>
        </div>
      </div>
    </footer>
  );
}
