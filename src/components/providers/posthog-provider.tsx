"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect } from "react";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      process.env.NEXT_PUBLIC_POSTHOG_KEY &&
      process.env.NEXT_PUBLIC_POSTHOG_HOST
    ) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        ui_host:
          process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
        api_host: "/relay-UYdl/",
        person_profiles: "always",
        enable_heatmaps: true,
        autocapture: true,
        capture_pageleave: true,
        capture_pageview: false,
        advanced_disable_feature_flags: true,
        advanced_disable_feature_flags_on_first_load: true,
        loaded: (posthog) => {
          if (process.env.NODE_ENV === "development") posthog.debug(false);
        },
      });
    }
  }, []);

  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    return <>{children}</>;
  }

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
