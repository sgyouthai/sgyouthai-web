"use client";

import dynamic from "next/dynamic";

const TrailingCursor = dynamic(() => import("@/components/TrailingCursor"), {
  ssr: false,
});
export default function ClientEffects() {
  return (
    <>
      <TrailingCursor />
    </>
  );
}
