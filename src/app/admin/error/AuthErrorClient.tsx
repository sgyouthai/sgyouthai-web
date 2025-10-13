"use client";

import { useSearchParams } from "next/navigation";

export default function AuthErrorClient() {
  const params = useSearchParams();
  const error = params.get("error");

  return <div>Auth Error: {error ?? "Unknown"}</div>;
}
