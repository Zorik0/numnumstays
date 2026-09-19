"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import type { Photo } from "@/data/types";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { textLink } from "./ui";

export type HeroSlide = {
  slug: string;
  unit: string;
  name: string;
  type: string;
  guests: number;
  href: string;
  photo: Photo;
};

/** Keep in sync with --animate-plate-progress in globals.css. */
const SLIDE_MS = 6000;

/**
 * A house-shaped window showing one stay at a time, with the door plates
 * underneath as tabs. Advances on its own until someone picks a door.
 */
export function HeroPicker({ slides }: { slides: HeroSlide[] }) {
  const count = slides.length;
  const [active, setActive] = useState(0);
  // Only photos that have been shown (plus the next one) are mounted, so the
  // hero doesn't download all seven up front.
  const [loaded, setLoaded] = useState(() => new Set([0, 1 % count]));
  const [playing, setPlaying] = useState(true);
  const [holding, setHolding] = useState(false);
  const reducedMotion = useReducedMotion();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const autoplay = playing && !holding && !reducedMotion;

  const show = useCallback(
    (index: number) => {
      const next = (index + count) % count;
      const after = (next + 1) % count;
      setActive(next);
      setLoaded((previous) => {
        if (previous.has(next) && previous.has(after)) return previous;
        return new Set(previous).add(next).add(after);
      });
    },
    [count],
  );

  useEffect(() => {
    if (!autoplay) return;
    const timer = window.setTimeout(() => show(active + 1), SLIDE_MS);
    return () => window.clearTimeout(timer);
  }, [autoplay, active, show]);

  function choose(index: number) {
    setPlaying(false);
    show(index);
  }

  function onTabKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    const keys: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: count - 1,
    };
    if (!(event.key in keys)) return;
    event.preventDefault();
    const next = (keys[event.key] + count) % count;
    choose(next);
    tabRefs.current[next]?.focus();
  }

  const current = slides[active];

  return (
    <div
      className="mx-auto w-full max-w-[32rem]"
      onMouseEnter={() => setHolding(true)}
      onMouseLeave={() => setHolding(false)}
      onFocus={() => setHolding(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setHolding(false);
      }}
    >
      <div id="hero-window" role="tabpanel" aria-labelledby={`hero-tab-${active}`} className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-8 bottom-[-6%] top-[18%] rounded-[50%] bg-mustard/25 blur-3xl"
        />
        <Link
          href={current.href}
          aria-label={`See ${current.name}`}
          className="relative block aspect-square overflow-hidden rounded-xl bg-ink-raised"
        >
          {slides.map((slide, index) =>
            loaded.has(index) ? (
              <Image
                key={slide.slug}
                src={slide.photo.src}
                alt=""
                fill
                sizes="(min-width: 640px) 32rem, 92vw"
                placeholder="blur"
                blurDataURL={slide.photo.blurDataURL}
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
                className={cn(
                  "object-cover transition-opacity duration-700 ease-soft",
                  index === active ? "opacity-100" : "opacity-0",
                )}
              />
            ) : null,
          )}
        </Link>
      </div>

      <div
        className="mt-5 flex items-end justify-between gap-4 sm:mt-6"
        aria-live={autoplay ? "off" : "polite"}
      >
        <div>
          <p className="text-2xl font-bold uppercase leading-none">{current.name}</p>
          <p className="mt-2 text-mist">
            {current.type}, sleeps {current.guests}
          </p>
        </div>
        <Link href={current.href} className={cn("shrink-0 pb-0.5 text-white", textLink)}>
          See this stay
        </Link>
      </div>

      <div className="mt-4 flex items-center gap-2 sm:mt-5">
        <div role="tablist" aria-label="Choose a stay by door number" className="grid flex-1 grid-cols-7 gap-1.5">
          {slides.map((slide, index) => {
            const selected = index === active;
            return (
              <button
                key={slide.slug}
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                id={`hero-tab-${index}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="hero-window"
                tabIndex={selected ? 0 : -1}
                title={slide.name}
                onClick={() => choose(index)}
                onKeyDown={(event) => onTabKeyDown(event, index)}
                className={cn(
                  "relative overflow-hidden rounded-[3px] py-2.5 text-center text-[0.8125rem] font-semibold leading-none tracking-[0.04em] tabular-nums transition-colors sm:text-sm",
                  selected
                    ? "bg-mustard text-ink"
                    : "bg-ink-raised text-mustard shadow-[inset_0_0_0_1px_rgb(255_255_255/0.07)] hover:bg-ink-line",
                )}
              >
                {slide.unit}
                <span className="sr-only">, {slide.name}</span>
                {selected && autoplay ? (
                  <span
                    key={`progress-${active}`}
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-[3px] origin-left animate-plate-progress bg-ink/35"
                  />
                ) : null}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => setPlaying((value) => !value)}
          aria-label={playing ? "Pause slideshow" : "Play slideshow"}
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-white/60 hover:text-white"
        >
          {playing ? <Pause className="size-4" aria-hidden="true" /> : <Play className="size-4" aria-hidden="true" />}
        </button>
      </div>
    </div>
  );
}
