// src/app/link/[eventName]/go/go-client.tsx
"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

export default function GoClient({
  code,
  longUrl,
}: {
  code: string;
  longUrl: string;
}) {
  useEffect(() => {
    posthog.capture("shortlink_click", {
      code,
      long_url: longUrl,
      referrer: document.referrer || undefined,
    });

    // super short delay; typically invisible
    const t = setTimeout(() => window.location.replace(longUrl), 80);
    return () => clearTimeout(t);
  }, [code, longUrl]);

  return null; // 👈 no UI
}
