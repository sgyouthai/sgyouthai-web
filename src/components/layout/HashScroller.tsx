"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function findTarget(id: string) {
  // exact match
  let el = document.getElementById(id) as HTMLElement | null;
  if (el) return el;

  // case-insensitive fallback (helps if your id casing differs)
  try {
    // CSS.escape may not exist in older browsers, but should in modern
    const escaped = (CSS as any)?.escape ? (CSS as any).escape(id) : id;
    el = document.querySelector(`[id="${escaped}" i]`) as HTMLElement | null;
    return el;
  } catch {
    return null;
  }
}

function scrollToHash(hash: string, behavior: ScrollBehavior) {
  if (!hash) return;

  const id = decodeURIComponent(hash.slice(1)); // remove leading '#'
  let tries = 0;
  const maxTries = 90; // ~1.5s at 60fps

  const prefersReduced =
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

  const finalBehavior: ScrollBehavior = prefersReduced ? "auto" : behavior;

  const tryScroll = () => {
    const el = findTarget(id);
    if (el) {
      // CSS scroll-padding-top will handle navbar offset
      el.scrollIntoView({ block: "start", behavior: finalBehavior });
      return;
    }
    if (tries++ < maxTries) requestAnimationFrame(tryScroll);
  };

  tryScroll();
}

export default function HashScroller() {
  const pathname = usePathname();

  useEffect(() => {
    // On route changes, the hash may be set a moment later.
    // So we poll for a short window until it appears, then scroll.
    let raf = 0;
    const start = performance.now();

    const pollHashThenScroll = () => {
      const h = window.location.hash || "";
      if (h) {
        scrollToHash(h, "smooth");
        return;
      }

      if (performance.now() - start < 1200) {
        raf = requestAnimationFrame(pollHashThenScroll);
      }
    };

    pollHashThenScroll();

    const onHashChange = () => {
      scrollToHash(window.location.hash || "", "smooth");
    };

    window.addEventListener("hashchange", onHashChange);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return null;
}
