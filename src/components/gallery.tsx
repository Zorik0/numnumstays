"use client";

import Image from "next/image";
import { createContext, use, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Images, X } from "lucide-react";
import type { Photo } from "@/data/types";
import { cn } from "@/lib/cn";

type GalleryContextValue = {
  photos: Photo[];
  label: string;
  open: (index: number) => void;
};

const GalleryContext = createContext<GalleryContextValue | null>(null);

function useGallery() {
  const gallery = use(GalleryContext);
  if (!gallery) throw new Error("Gallery components must be inside <GalleryProvider>.");
  return gallery;
}

/** Holds one stay's photos and the lightbox that any thumbnail on the page can open. */
export function GalleryProvider({
  photos,
  label,
  children,
}: {
  photos: Photo[];
  label: string;
  children: React.ReactNode;
}) {
  const [index, setIndex] = useState<number | null>(null);
  return (
    <GalleryContext value={{ photos, label, open: setIndex }}>
      {children}
      <Lightbox photos={photos} label={label} index={index} onIndexChange={setIndex} />
    </GalleryContext>
  );
}

/** Five chosen photos: a swipeable strip on phones, a mosaic from tablet up. */
export function StayMosaic({ featured }: { featured: number[] }) {
  const { photos, open } = useGallery();
  const picks = featured
    .map((number) => ({ photo: photos[number - 1], index: number - 1 }))
    .filter((pick) => pick.photo);

  return (
    <div className="relative">
      <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 sm:mx-0 sm:grid sm:h-[min(64vh,36rem)] sm:grid-cols-4 sm:grid-rows-2 sm:overflow-hidden sm:rounded-xl sm:px-0">
        {picks.map(({ photo, index }, position) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => open(index)}
            aria-label={`Open photo ${index + 1} of ${photos.length}`}
            className={cn(
              "group relative aspect-[4/3] w-[86%] shrink-0 snap-center overflow-hidden rounded-lg bg-line sm:aspect-auto sm:w-auto sm:rounded-none",
              position === 0 && "sm:col-span-2 sm:row-span-2",
            )}
          >
            <Image
              src={photo.src}
              alt=""
              fill
              sizes={position === 0 ? "(min-width: 640px) 50vw, 86vw" : "(min-width: 640px) 25vw, 86vw"}
              placeholder="blur"
              blurDataURL={photo.blurDataURL}
              loading={position === 0 ? "eager" : "lazy"}
              fetchPriority={position === 0 ? "high" : "auto"}
              className="object-cover transition-[filter] duration-300 group-hover:brightness-[0.92]"
            />
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={() => open(0)}
        className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2.5 text-sm font-semibold text-ink shadow-[0_4px_16px_-4px_rgb(0_0_0/0.35)] backdrop-blur transition-colors hover:bg-white sm:bottom-4 sm:right-4"
      >
        <Images className="size-4" aria-hidden="true" />
        Show all {photos.length} photos
      </button>
    </div>
  );
}

/** Every photo of the stay, in order. */
export function PhotoGrid() {
  const { photos, open } = useGallery();
  return (
    <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
      {photos.map((photo, index) => (
        <li key={photo.src}>
          <button
            type="button"
            onClick={() => open(index)}
            aria-label={`Open photo ${index + 1} of ${photos.length}`}
            className="group relative block aspect-[3/2] w-full overflow-hidden rounded-md bg-line"
          >
            <Image
              src={photo.src}
              alt=""
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              placeholder="blur"
              blurDataURL={photo.blurDataURL}
              className="object-cover transition-transform duration-500 ease-soft group-hover:scale-[1.03]"
            />
          </button>
        </li>
      ))}
    </ul>
  );
}

function Lightbox({
  photos,
  label,
  index,
  onIndexChange,
}: {
  photos: Photo[];
  label: string;
  index: number | null;
  onIndexChange: (index: number | null) => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const isOpen = index !== null;
  const count = photos.length;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) {
      document.documentElement.style.overflow = "hidden";
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    // Fires for the close button, Esc and programmatic closes alike.
    const onClose = () => {
      document.documentElement.style.removeProperty("overflow");
      onIndexChange(null);
    };
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, [onIndexChange]);

  function step(delta: number) {
    if (index === null) return;
    onIndexChange((index + delta + count) % count);
  }

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      step(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      step(-1);
    }
  }

  function onPointerUp(event: React.PointerEvent) {
    const start = swipeStart.current;
    swipeStart.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) step(dx < 0 ? 1 : -1);
  }

  const current = index === null ? null : photos[index];
  const neighbours =
    index === null ? [] : [photos[(index + 1) % count], photos[(index - 1 + count) % count]];

  return (
    <dialog
      ref={dialogRef}
      aria-label={`${label} photos`}
      onKeyDown={onKeyDown}
      className="m-0 h-dvh max-h-none w-full max-w-none bg-black p-0 text-white backdrop:bg-black open:flex open:flex-col"
    >
      <div className="flex h-16 shrink-0 items-center justify-between gap-4 px-4 sm:px-6">
        <p className="truncate text-sm text-white/75">
          <span className="font-semibold text-white">{label}</span>
          <span className="ml-3 tabular-nums">
            {index !== null ? `${index + 1} of ${count}` : null}
          </span>
        </p>
        <button
          type="button"
          autoFocus
          onClick={() => onIndexChange(null)}
          aria-label="Close photos"
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-white/10"
        >
          <X className="size-6" aria-hidden="true" />
        </button>
      </div>

      <div
        className="relative flex-1 touch-pan-y select-none"
        onPointerDown={(event) => {
          swipeStart.current = { x: event.clientX, y: event.clientY };
        }}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          swipeStart.current = null;
        }}
      >
        {current ? (
          <Image
            key={current.src}
            src={current.src}
            alt={`${label}, photo ${index! + 1} of ${count}`}
            fill
            sizes="100vw"
            placeholder="blur"
            blurDataURL={current.blurDataURL}
            draggable={false}
            className="object-contain px-2 pb-4 sm:px-20 sm:pb-8"
          />
        ) : null}
        {neighbours.map((photo) => (
          <Image
            key={`preload-${photo.src}`}
            src={photo.src}
            alt=""
            aria-hidden="true"
            fill
            sizes="100vw"
            loading="eager"
            className="invisible"
          />
        ))}
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Previous photo"
          className="absolute left-2 top-1/2 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20 sm:inline-flex sm:left-5"
        >
          <ChevronLeft className="size-6" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Next photo"
          className="absolute right-2 top-1/2 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20 sm:inline-flex sm:right-5"
        >
          <ChevronRight className="size-6" aria-hidden="true" />
        </button>
      </div>

      <div className="flex shrink-0 items-center justify-center gap-3 pb-[max(1rem,env(safe-area-inset-bottom))] sm:hidden">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Previous photo"
          className="inline-flex size-12 items-center justify-center rounded-full bg-white/10"
        >
          <ChevronLeft className="size-6" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Next photo"
          className="inline-flex size-12 items-center justify-center rounded-full bg-white/10"
        >
          <ChevronRight className="size-6" aria-hidden="true" />
        </button>
      </div>
    </dialog>
  );
}
