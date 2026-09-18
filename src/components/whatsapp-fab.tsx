"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { bookingMessage, whatsappLink } from "@/data/site";
import { cn } from "@/lib/cn";
import { BrandIcon } from "./brand-icon";

/** Floating WhatsApp button. Stay pages have their own booking bar, so it stays off there. */
export function WhatsAppFab() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname.startsWith("/stays/")) return null;

  return (
    <a
      href={whatsappLink(bookingMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Book on WhatsApp"
      aria-hidden={visible ? undefined : true}
      tabIndex={visible ? undefined : -1}
      className={cn(
        "fixed bottom-5 right-5 z-30 inline-flex size-14 items-center justify-center rounded-full bg-mustard text-ink shadow-[0_12px_32px_-10px_rgb(0_0_0/0.5)] transition-[opacity,translate,background-color] duration-300 hover:bg-mustard-deep sm:bottom-6 sm:right-6",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <BrandIcon name="whatsapp" className="size-6" />
    </a>
  );
}
