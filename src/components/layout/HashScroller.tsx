"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function scrollToHash(hash: string) {
  if (!hash) return;

  const id = decodeURIComponent(hash.replace("#", ""));
  let tries = 0;
  const maxTries = 60; // ~1s at 60fps

  const tryScroll = () => {
    const el = document.getElementById(id);
    if (el) {
      // "auto" is better on initial load (instant jump)
      el.scrollIntoView({ block: "start", behavior: "auto" });
      return;
    }
    if (tries++ < maxTries) requestAnimationFrame(tryScroll);
  };

  tryScroll();
}

export default function HashScroller() {
  const pathname = usePathname();

  useEffect(() => {
    // On initial load and on route changes (in case you navigate to /#team)
    scrollToHash(window.location.hash);

    const onHashChange = () => scrollToHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);

    return () => window.removeEventListener("hashchange", onHashChange);
  }, [pathname]);

  return null;
}
