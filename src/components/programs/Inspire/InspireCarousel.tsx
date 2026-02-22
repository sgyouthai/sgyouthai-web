"use client";

import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

type Props = {
  images: { src: string; alt?: string }[];
  intervalMs?: number;
  className?: string;
};

export function InspireCarousel({
  images,
  intervalMs = 2500,
  className,
}: Props) {
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
        {images.map((img, i) => (
          <CarouselItem key={i} className="basis-full">
            <div className="relative w-full overflow-hidden rounded-xl">
              <Image
                src={img.src}
                alt={img.alt ?? `Slide ${i + 1}`}
                width={400}
                height={300}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="w-full rounded-[10px] object-cover aspect-[4/3]"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
