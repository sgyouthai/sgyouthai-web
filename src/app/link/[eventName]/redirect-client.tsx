"use client";

import { useEffect } from "react";

export default function RedirectClient({ to }: { to: string }) {
  useEffect(() => {
    const t = setTimeout(() => window.location.replace(to), 250);
    return () => clearTimeout(t);
  }, [to]);

  return null;
}
