// src/app/link/[eventName]/go/page.tsx
import { notFound } from "next/navigation";
import { api } from "@/server/api/server";
import GoClient from "./go-client";

export default async function GoPage({
  params,
}: {
  params: { eventName: string };
}) {
  const t = await api();
  let link;
  try {
    link = await t.shortLinks.getByCode({ code: params.eventName });
  } catch {
    notFound();
  }
  return <GoClient code={params.eventName} longUrl={link.long_url} />;
}
