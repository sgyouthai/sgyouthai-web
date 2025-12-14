"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { Reveal } from "@/components/motion/Reveal";

export default function EventGalleryClient({ gallery }: { gallery: string[] }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const number = 5;
  const rows = useMemo(
    () => [
      gallery.slice(0, number),
      gallery.slice(number, number * 2),
      gallery.slice(number * 2),
    ],
    [gallery]
  );

  const Card = ({ src, i }: { src: string; i: number }) => (
    <div
      className="h-48 md:h-64 aspect-[4/3] p-2 mx-2 object-cover rounded-2xl flex-none overflow-hidden"
      style={{
        background:
          "linear-gradient(0.0164deg, rgba(255,255,255,0.05) 0%, rgba(153,153,153,0.06) 100%)",
      }}
    >
      <div className="relative h-full w-full overflow-hidden rounded-xl">
        <Image
          src={src}
          alt={`Gallery image ${(i % 4) + 1}`}
          width={400}
          height={300}
          sizes="(max-width: 768px) 60vw, 400px"
          className="h-full w-full object-cover transition-transform duration-300 ease-out will-change-transform hover:scale-[1.2]"
        />
      </div>
    </div>
  );

  return (
    <section id="gallery">
      <div className="flex flex-col items-center justify-center relative gap-[70px]">
        <div className="flex flex-col gap-[30px]">
          <Reveal>
            <h1 className="text-center text-[35px] md:text-[54px] tracking-[-2] md:tracking-[-1.9] leading-[32px] md:leading-[50px]">
              Event Gallery
            </h1>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="text-current/60 max-w-md leading-[26px] text-center">
              A glimpse into our vibrant community events and activities.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.16}>
          <div className="flex w-[100dvw] flex-col justify-center gap-[30px] relative">
            {/* SSR-safe fallback (no marquee) */}
            {!mounted ? (
              <>
                <div className="flex overflow-hidden">
                  {rows[0].map((src, i) => (
                    <Card key={src + i} src={src} i={i} />
                  ))}
                </div>
                <div className="flex overflow-hidden">
                  {rows[1].map((src, i) => (
                    <Card key={src + i} src={src} i={i} />
                  ))}
                </div>
                <div className="flex overflow-hidden">
                  {rows[2].map((src, i) => (
                    <Card key={src + i} src={src} i={i} />
                  ))}
                </div>
              </>
            ) : (
              <>
                <Marquee speed={50} autoFill pauseOnHover>
                  {rows[0].map((src, i) => (
                    <Card key={src + i} src={src} i={i} />
                  ))}
                </Marquee>
                <Marquee speed={50} direction="right" autoFill pauseOnHover>
                  {rows[1].map((src, i) => (
                    <Card key={src + i} src={src} i={i} />
                  ))}
                </Marquee>
                <Marquee speed={50} direction="left" autoFill pauseOnHover>
                  {rows[2].map((src, i) => (
                    <Card key={src + i} src={src} i={i} />
                  ))}
                </Marquee>
              </>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
