"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { Menu, Phone, X } from "lucide-react";
import { bookingMessage, primaryPhone, whatsappLink } from "@/data/site";
import { cn } from "@/lib/cn";
import { BrandIcon } from "./brand-icon";
import { button } from "./ui";
import { Wordmark } from "./wordmark";

const nav = [
  { href: "/#stays", label: "Stays" },
  { href: "/#value-stays", label: "Value stays" },
  { href: "/#booking", label: "How to book" },
  { href: "/about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

const iconButton =
  "inline-flex size-11 items-center justify-center rounded-full transition-colors hover:bg-white/10";

export function SiteHeader() {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;
    const unlockScroll = () => document.documentElement.style.removeProperty("overflow");
    menu.addEventListener("close", unlockScroll);
    return () => menu.removeEventListener("close", unlockScroll);
  }, []);

  useEffect(() => {
    menuRef.current?.close();
  }, [pathname]);

  function openMenu() {
    document.documentElement.style.overflow = "hidden";
    menuRef.current?.showModal();
  }

  function closeMenu() {
    menuRef.current?.close();
  }

  return (
    <header className="on-ink sticky top-0 z-40 border-b border-white/[0.06] bg-ink text-white">
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <Link href="/" aria-label="NumNum Stays, home" className="flex items-center">
          <Wordmark className="h-9 w-auto text-mustard" />
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-8 text-[0.9375rem]">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-white/75 transition-colors hover:text-white"
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* On phones, booking lives in the page itself (hero, floating button, booking bar),
            so the header keeps to calling and the menu. */}
        <div className="flex items-center gap-1">
          <a
            href={whatsappLink(bookingMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(button.primary, "px-4 py-2.5 text-[0.9375rem] max-md:hidden")}
          >
            <BrandIcon name="whatsapp" className="size-4" />
            Book on WhatsApp
          </a>
          <a href={`tel:${primaryPhone.tel}`} aria-label={`Call ${primaryPhone.display}`} className={cn(iconButton, "md:hidden")}>
            <Phone className="size-5" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={openMenu}
            aria-label="Open menu"
            aria-haspopup="dialog"
            className={cn(iconButton, "md:hidden")}
          >
            <Menu className="size-6" aria-hidden="true" />
          </button>
        </div>
      </div>

      <dialog
        ref={menuRef}
        aria-label="Menu"
        className="on-ink m-0 h-dvh max-h-none w-full max-w-none bg-ink p-0 text-white backdrop:bg-black/50 open:flex open:flex-col"
      >
        <div className="container-page flex h-16 shrink-0 items-center justify-between">
          <Wordmark className="h-9 w-auto text-mustard" />
          <button type="button" onClick={closeMenu} aria-label="Close menu" className={iconButton}>
            <X className="size-6" aria-hidden="true" />
          </button>
        </div>
        <nav aria-label="Main" className="container-page flex-1 pt-8">
          <ul>
            {nav.map((item) => (
              <li key={item.href} className="border-b border-white/[0.08]">
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  className="block py-4 text-3xl font-semibold tracking-tight"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="container-page grid gap-3 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-6">
          <a
            href={whatsappLink(bookingMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(button.primary, "w-full")}
          >
            <BrandIcon name="whatsapp" className="size-5" />
            Book on WhatsApp
          </a>
          <a href={`tel:${primaryPhone.tel}`} className={cn(button.ghostOnInk, "w-full")}>
            Call {primaryPhone.display}
          </a>
        </div>
      </dialog>
    </header>
  );
}
