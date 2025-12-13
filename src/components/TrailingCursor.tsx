"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useAtom } from "jotai";
import { cursorActiveAtom } from "@/state/cursor";

const CURSOR_SIZE = 16;

export default function MagicCursor() {
  const [active] = useAtom(cursorActiveAtom);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const smoothX = useSpring(mouseX, {
    stiffness: 200,
    damping: 25,
    mass: 0.4,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 200,
    damping: 25,
    mass: 0.4,
  });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - CURSOR_SIZE / 2);
      mouseY.set(e.clientY - CURSOR_SIZE / 2);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
      style={{ x: smoothX, y: smoothY }}
    >
      <motion.div
        animate={
          active ? { scale: 1.4, opacity: 0.9 } : { scale: 1, opacity: 0.6 }
        }
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
        className="rounded-full bg-white backdrop-blur-xl"
        style={{
          width: CURSOR_SIZE,
          height: CURSOR_SIZE,
        }}
      />
    </motion.div>
  );
}
