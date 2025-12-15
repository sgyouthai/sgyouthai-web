import "server-only";
import { unstable_cache } from "next/cache";
import { api } from "@/server/api/server";
import TeamClient from "@/components/home/TeamClient";

const getTeam = unstable_cache(
  async () => {
    const caller = await api();
    return (await caller.team.getAll()) ?? [];
  },
  ["home-team"],
  { revalidate: 60 * 30 } // 30 min
);

export default async function Team() {
  const initialRows = await getTeam();
  return <TeamClient initialRows={initialRows} />;
}
