import { BrandIcon } from "@/components/brand-icon";
import { button, textLink } from "@/components/ui";
import { bookingMessage, primaryPhone, site, whatsappLink } from "@/data/site";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Terms & conditions",
  description: "The terms that apply to every booking at NumNum Stays, plus check-in and checkout times.",
  path: "/terms",
});

const terms = [
  "Guests must provide a valid ID at check-in.",
  "No illegal activities are allowed on the property.",
  "Please keep the property clean and treat it with respect.",
  "All bookings are subject to availability.",
  "Cancellation policies may apply.",
];

export default function TermsPage() {
  return (
    <div className="container-page py-14 lg:py-20">
      <div className="max-w-2xl">
        <h1 className="text-title font-bold uppercase">Terms &amp; conditions</h1>
        <p className="mt-6 text-lead text-muted">These apply to every booking at NumNum Stays.</p>

        <ol className="mt-12 border-t border-line">
          {terms.map((term, index) => (
            <li key={term} className="grid grid-cols-[2.5rem_1fr] items-baseline border-b border-line py-5 text-lg">
              <span className="font-semibold tabular-nums text-muted">{index + 1}.</span>
              <span>{term}</span>
            </li>
          ))}
        </ol>

        <h2 className="mt-14 text-2xl font-semibold tracking-tight">Check-in and checkout</h2>
        <p className="mt-3 text-muted">
          Check-in is after {site.checkIn} and checkout is before {site.checkOut}. Each stay&apos;s page lists
          anything else specific to it, like stairs, parking or quiet hours.
        </p>

        <h2 className="mt-14 text-2xl font-semibold tracking-tight">Questions</h2>
        <p className="mt-3 text-muted">
          Call us on{" "}
          <a href={`tel:${primaryPhone.tel}`} className={cn("text-ink tabular-nums", textLink)}>
            {primaryPhone.display}
          </a>{" "}
          or message us on WhatsApp.
        </p>
        <a
          data-booking-cta
          href={whatsappLink(bookingMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(button.primary, "mt-6")}
        >
          <BrandIcon name="whatsapp" className="size-5" />
          Message us on WhatsApp
        </a>
      </div>
    </div>
  );
}
