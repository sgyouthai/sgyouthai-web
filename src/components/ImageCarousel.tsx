"use client";

import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

type ImageCarouselProps = {
  images: {
    src: string;
    alt?: string;
    title?: string;
    description?: string;
  }[];
  intervalMs?: number;
  className?: string;
};

export default function ImageCarousel({
  images,
  intervalMs = 2500,
  className,
}: ImageCarouselProps) {
  const plugin = useRef(
    Autoplay({
      delay: intervalMs,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  );

  return (
    <Carousel
      className={className}
      opts={{
        loop: true,
        align: "start",
      }}
      plugins={[plugin.current]}
    >
      <CarouselContent>
        {images.map((image, index) => {
          const hasDetails = image.title || image.description;

          return (
            <CarouselItem key={`${image.src}-${index}`} className="basis-full">
              <div className="flex w-full flex-col overflow-hidden rounded-[15px] bg-black">
                <div
                  className={`relative w-full overflow-hidden ${
                    hasDetails ? "aspect-video" : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt ?? `Slide ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center"
                  />
                  {hasDetails && (
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/20 via-85% to-black" />
                  )}
                </div>

                {hasDetails && (
                  <div className="p-[10px]">
                    <div className="rounded-xl border border-blue-500/20 bg-[#000e2b] p-3 text-left shadow-[2px_4px_24px_10px_rgba(0,0,0,0.35)]">
                      {image.title && (
                        <p className="text-sm font-semibold text-white">
                          {image.title}
                        </p>
                      )}
                      {image.description && (
                        <p className="text-xs leading-5 text-white/70">
                          {image.description}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
}
