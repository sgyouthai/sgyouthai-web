"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CURSOR_SIZE = 16;
const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, select, textarea, label, summary, [data-cursor="pointer"], .cursor-pointer';

export default function TrailingCursor() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);

  // only create motion values if enabled (after mount)
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const smoothX = useSpring(mouseX, { stiffness: 200, damping: 25, mass: 0.4 });
  const smoothY = useSpring(mouseY, { stiffness: 200, damping: 25, mass: 0.4 });

  const activeRef = useRef(false);

  useEffect(() => {
    const finePointer =
      window.matchMedia?.("(pointer: fine)")?.matches ?? false;
    if (!finePointer) return;

    setEnabled(true);

    let raf = 0;
    let lastX = -100;
    let lastY = -100;

    const onMove = (e: PointerEvent) => {
      lastX = e.clientX - CURSOR_SIZE / 2;
      lastY = e.clientY - CURSOR_SIZE / 2;
      if (raf) return; // don’t cancel+reschedule every event
      raf = requestAnimationFrame(() => {
        mouseX.set(lastX);
        mouseY.set(lastY);
        raf = 0;
      });
    };

    const setActiveIfChanged = (next: boolean) => {
      if (activeRef.current === next) return;
      activeRef.current = next;
      setActive(next);
    };

    const onOver = (e: PointerEvent) => {
      const target = e.target as Element | null;
      setActiveIfChanged(Boolean(target?.closest?.(INTERACTIVE_SELECTOR)));
    };

    const onOut = (e: PointerEvent) => {
      const next = e.relatedTarget as Element | null;
      if (next?.closest?.(INTERACTIVE_SELECTOR)) return;
      setActiveIfChanged(false);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, true);
    document.addEventListener("pointerout", onOut, true);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver, true);
      document.removeEventListener("pointerout", onOut, true);
    };
  }, [mouseX, mouseY]);

  // Don’t render at all unless we detected a fine pointer
  if (!enabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
      style={{ x: smoothX, y: smoothY }}
    >
      <motion.div
        animate={
          active ? { scale: 1.4, opacity: 0.9 } : { scale: 1, opacity: 0.6 }
        }
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
        className="rounded-full bg-white/80 backdrop-blur-xl"
        style={{ width: CURSOR_SIZE, height: CURSOR_SIZE }}
      />
    </motion.div>
  );
}
