"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * The night-in loop from the previous site's hero, framed in the same house
 * shape. It only plays while on screen, and never for reduced-motion visitors.
 */
export function NightWindow() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            // Autoplay can be refused (e.g. data saver); the poster stays up.
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(video);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [reducedMotion]);

  return (
    <div className="relative mx-auto w-full max-w-[26rem]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-10 bottom-[-8%] top-[22%] rounded-[50%] bg-mustard/30 blur-3xl"
      />
      <div className="house-frame relative aspect-[4/5] overflow-hidden bg-ink-raised">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          poster="/media/night-in-poster.webp"
          aria-hidden="true"
          className="absolute inset-0 size-full object-cover object-[58%_50%]"
        >
          <source src="/media/night-in.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
