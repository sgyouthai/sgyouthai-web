"use client";
import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";

export default function CountUp({
  from = 0,
  to,
  duration = 1.4,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
}: {
  from?: number;
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!ref.current || !inView) return;

    const controls = animate(from, to, {
      duration,
      ease: "easeOut",
      onUpdate: (val) => {
        ref.current!.textContent = prefix + val.toFixed(decimals) + suffix;
      },
    });

    return () => controls.stop();
  }, [inView, from, to, duration, prefix, suffix, decimals]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {from.toFixed(decimals)}
      {suffix}
    </span>
  );
}
