"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { bookingMessage, whatsappLink } from "@/data/site";
import { cn } from "@/lib/cn";
import { BrandIcon } from "./brand-icon";

/**
 * Floating WhatsApp button for phones, so booking is always one tap away.
 * It steps aside whenever another booking button is on screen (anything marked
 * `data-booking-cta`), so there's only ever one WhatsApp button in view. Stay
 * pages have their own booking bar, and larger screens have one in the header.
 */
export function WhatsAppFab() {
  const pathname = usePathname();
  // Hidden until the first measurement, so it never flashes in over the hero.
  const [otherCtaInView, setOtherCtaInView] = useState(true);

  useEffect(() => {
    const targets = document.querySelectorAll("[data-booking-cta]");
    if (targets.length === 0) {
      // Nothing to step aside for on this page: show the button.
      const frame = requestAnimationFrame(() => setOtherCtaInView(false));
      return () => cancelAnimationFrame(frame);
    }
    const inView = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) inView.add(entry.target);
        else inView.delete(entry.target);
      }
      setOtherCtaInView(inView.size > 0);
    });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [pathname]);

  if (pathname.startsWith("/stays/")) return null;

  const visible = !otherCtaInView;

  return (
    <a
      href={whatsappLink(bookingMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Book on WhatsApp"
      aria-hidden={visible ? undefined : true}
      tabIndex={visible ? undefined : -1}
      className={cn(
        "fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-30 inline-flex size-14 items-center justify-center rounded-full bg-mustard text-ink shadow-[0_12px_32px_-10px_rgb(0_0_0/0.5)] transition-[opacity,translate,background-color] duration-300 hover:bg-mustard-deep md:hidden",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <BrandIcon name="whatsapp" className="size-6" />
    </a>
  );
}
