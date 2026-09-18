import { ArrowUpRight } from "lucide-react";
import { primaryPhone, site, stayBookingMessage, whatsappLink } from "@/data/site";
import type { Stay } from "@/data/types";
import { cn } from "@/lib/cn";
import { BrandIcon } from "./brand-icon";
import { button, textLink } from "./ui";

/** Sticky booking panel beside the stay details on large screens. */
export function BookingCard({ stay }: { stay: Stay }) {
  return (
    <div className="on-ink rounded-xl bg-ink p-6 text-white sm:p-7">
      <h2 className="text-2xl font-semibold tracking-tight">Book {stay.name}</h2>
      <p className="mt-2 text-mist">
        Send your dates and number of guests on WhatsApp and we&apos;ll confirm availability.
      </p>
      <div className="mt-6 grid gap-3">
        <a
          href={whatsappLink(stayBookingMessage(stay.name, stay.unit))}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(button.primary, "w-full")}
        >
          <BrandIcon name="whatsapp" className="size-5" />
          Book on WhatsApp
        </a>
        <a href={stay.airbnbUrl} target="_blank" rel="noopener noreferrer" className={cn(button.ghostOnInk, "w-full")}>
          <BrandIcon name="airbnb" className="size-[1.125rem]" />
          Book on Airbnb
          <ArrowUpRight className="size-4 opacity-60" aria-hidden="true" />
        </a>
      </div>
      <p className="mt-5 text-sm text-mist">
        Prefer to talk?{" "}
        <a href={`tel:${primaryPhone.tel}`} className={cn("text-white tabular-nums", textLink)}>
          Call {primaryPhone.display}
        </a>
      </p>
      <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-white/10 pt-5 text-sm">
        <div>
          <dt className="text-mist">Check-in</dt>
          <dd className="mt-1 font-medium">After {site.checkIn}</dd>
        </div>
        <div>
          <dt className="text-mist">Checkout</dt>
          <dd className="mt-1 font-medium">Before {site.checkOut}</dd>
        </div>
      </dl>
    </div>
  );
}

/** Booking buttons pinned to the bottom of the screen on phones and tablets. */
export function MobileBookBar({ stay }: { stay: Stay }) {
  return (
    <div className="on-ink fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-ink/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md lg:hidden">
      <div className="mx-auto flex max-w-xl gap-2">
        <a
          href={whatsappLink(stayBookingMessage(stay.name, stay.unit))}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(button.primary, "flex-1 py-3")}
        >
          <BrandIcon name="whatsapp" className="size-5" />
          Book on WhatsApp
        </a>
        <a
          href={stay.airbnbUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(button.ghostOnInk, "px-4 py-3")}
        >
          <BrandIcon name="airbnb" className="size-[1.125rem]" />
          Airbnb
        </a>
      </div>
    </div>
  );
}
