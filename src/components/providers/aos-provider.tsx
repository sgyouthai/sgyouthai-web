"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AOSProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (reduceMotion) return;

    AOS.init({
      once: true,
      easing: "ease-in-out",
      duration: 800, // slightly lighter than 1000
      mirror: false,
      offset: 80,
    });

    return () => {
      // AOS doesn’t provide a perfect destroy, but this helps avoid leftover styles
      if (AOS?.refreshHard) AOS.refreshHard();
    };
  }, []);

  // Re-scan DOM on route change (and after hydration)
  useEffect(() => {
    // small delay to let the new route paint
    const t = setTimeout(() => {
      AOS.refresh();
    }, 50);
    return () => clearTimeout(t);
  }, [pathname]);

  return <>{children}</>;
}
