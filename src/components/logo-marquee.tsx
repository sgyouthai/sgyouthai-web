"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";

const logos = ["/window.svg", "/vercel.svg", "/file.svg"]; // 40–80px tall PNG/SVGs

interface LogoMarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Animation duration in seconds */
  speed?: number;
}

export default function LogoMarquee({
  speed = 25,
  className,
  ...rest
}: LogoMarqueeProps) {
  const row = [...logos, ...logos];
  return (
    <div
      className={cn("relative w-full overflow-hidden py-6", className)}
      {...rest}
    >
      <div className="mask-fade-x">
        {/* IMPORTANT: no gap on the animated track */}
        <div
          className="
            flex w-max gap-0 will-change-transform
            animate-[marquee_linear_infinite]
          "
          style={{
            animationDuration: `${speed}s`,
            animationDirection: "reverse",
          }}
        >
          {/* Clone A with internal spacing */}
          <Row logos={row} />

          {/* Clone B (identical), aria-hidden to avoid double-announcing */}
          <Row logos={row} ariaHidden />
        </div>
      </div>
    </div>
  );
}

function Row({
  logos,
  ariaHidden = false,
}: {
  logos: string[];
  ariaHidden?: boolean;
}) {
  return (
    <div
      className="flex items-center gap-12 pr-12" /* spacing is inside each clone */
      aria-hidden={ariaHidden}
    >
      {logos.map((src, i) => (
        <div
          key={i}
          className="shrink-0 opacity-60 transition-opacity hover:opacity-100"
        >
          <Image
            src={src}
            alt="logo"
            width={120}
            height={40}
            className="h-8 w-auto object-contain"
            priority={i < 3} /* helps avoid layout shift */
          />
        </div>
      ))}
    </div>
  );
}
