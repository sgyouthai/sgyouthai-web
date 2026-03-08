import "server-only";
import { api } from "@/server/api/server";
import TeamClient from "@/components/home/Team/TeamClient";

export default async function Team() {
  const caller = await api();
  const initialRows = (await caller.team.getAll()) ?? [];
  return <TeamClient initialRows={initialRows} />;
}
