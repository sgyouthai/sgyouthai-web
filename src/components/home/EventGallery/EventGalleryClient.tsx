"use client";

import { memo, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";

import BlueHighlighter from "@/components/BlueHighlight";
import { Reveal } from "@/components/motion/Reveal";

const ROW_COUNT = 3;
const ROW_DIRECTIONS = ["left", "right", "left"] as const;

const GalleryCard = memo(function GalleryCard({
  src,
  index,
}: {
  src: string;
  index: number;
}) {
  return (
    <div className="relative mx-2 h-48 aspect-[4/3] shrink-0 overflow-hidden rounded-[25px] border border-white/10 bg-gradient-to-b from-blue-500/10 to-blue-500/5 p-[10px] shadow-xl md:h-64">
      <BlueHighlighter />
      <div className="relative h-full w-full overflow-hidden rounded-[15px]">
        <Image
          src={src}
          alt={`Event gallery photo ${index + 1}`}
          width={400}
          height={300}
          quality={65}
          sizes="(max-width: 767px) 256px, 342px"
          className="h-full w-full object-cover transition-transform duration-300 ease-out hover:scale-105"
        />
      </div>
    </div>
  );
});

export default function EventGalleryClient({ gallery }: { gallery: string[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(false);

  const rows = useMemo(
    () =>
      Array.from({ length: ROW_COUNT }, (_, rowIndex) =>
        gallery.filter((_, imageIndex) => imageIndex % ROW_COUNT === rowIndex),
      ),
    [gallery],
  );

  useEffect(() => {
    setMounted(true);

    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let isVisible = false;

    const syncPlayback = () => {
      setShouldPlay(
        isVisible && !document.hidden && !reducedMotion.matches,
      );
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        syncPlayback();
      },
      { rootMargin: "200px 0px" },
    );

    observer.observe(section);
    document.addEventListener("visibilitychange", syncPlayback);
    reducedMotion.addEventListener("change", syncPlayback);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      reducedMotion.removeEventListener("change", syncPlayback);
    };
  }, []);

  return (
    <section id="gallery" ref={sectionRef}>
      <div className="relative flex flex-col items-center justify-center gap-[70px]">
        <div className="flex flex-col gap-[30px]">
          <Reveal>
            <h1 className="text-center text-[35px] leading-[32px] tracking-[-2px] md:text-[54px] md:leading-[50px] md:tracking-[-1.9px]">
              Event Gallery
            </h1>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="max-w-md text-center leading-[26px] text-current/60">
              A glimpse into our vibrant community events and activities.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.16}>
          <div className="relative flex w-[100dvw] flex-col justify-center gap-[30px] [contain:layout_paint]">
            {rows.map((row, rowIndex) => (
              <Reveal delay={0.08 * (rowIndex + 1)} key={rowIndex}>
                {!mounted ? (
                  <div className="flex overflow-hidden">
                    {row.map((src, imageIndex) => (
                      <GalleryCard
                        key={`${src}-${imageIndex}`}
                        src={src}
                        index={rowIndex + imageIndex * ROW_COUNT}
                      />
                    ))}
                  </div>
                ) : (
                  <Marquee
                    speed={50}
                    direction={ROW_DIRECTIONS[rowIndex]}
                    autoFill
                    play={shouldPlay}
                    pauseOnHover
                  >
                    {row.map((src, imageIndex) => (
                      <GalleryCard
                        key={`${src}-${imageIndex}`}
                        src={src}
                        index={rowIndex + imageIndex * ROW_COUNT}
                      />
                    ))}
                  </Marquee>
                )}
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
