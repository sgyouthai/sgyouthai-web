import "server-only";
import { unstable_cache } from "next/cache";
import { api } from "@/server/api/server";
import PartnersClient from "@/components/home/Partners/PartnersClient";

const getPartners = unstable_cache(
  async () => {
    const caller = await api();
    return (await caller.partners.getAll()) ?? [];
  },
  ["home-partners"],
    {
    revalidate: 60 * 30,
    tags: ["home-partners"],
  }
);

export default async function Partners() {
  const initialRows = await getPartners();
  return <PartnersClient initialRows={initialRows} />;
}
