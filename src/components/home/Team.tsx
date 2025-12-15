"use client";

import { useMemo } from "react";
import TeamCard from "@/components/home/TeamCard";
import { Reveal } from "@/components/motion/Reveal";
import { api } from "@/app/providers"; // adjust if your api export path differs

type TeamRow = {
  id: string;
  name: string;
  role: string;
  handle: string | null;
  image_url: string | null;
  linkedin_url: string | null;
  border_color: string | null;
  gradient: string | null;
  group: string | null;
  display_order: number | null;
};

export default function Team() {
  const { data, isLoading, error } = api.team.getAll.useQuery(undefined, {
    // optional: prevents refetch on tab focus
    refetchOnWindowFocus: false,
  });

  // Transform DB rows -> UI-friendly items, memoized
  const items = useMemo(() => {
    const rows = (data ?? []) as TeamRow[];

    return rows.map((r) => ({
      id: r.id,
      image: r.image_url ?? "/placeholder-avatar.png",
      name: r.name,
      role: r.role,
      handle: r.handle ?? "",
      borderColor: r.border_color ?? "#3B82F6",
      gradient: r.gradient ?? "linear-gradient(145deg, #3B82F6, #000)",
      url: r.linkedin_url ?? "",
      group: r.group ?? "Team",
      displayOrder: r.display_order ?? 9999,
    }));
  }, [data]);

  // (Optional) group them for display
  const grouped = useMemo(() => {
    return items.reduce<Record<string, typeof items>>((acc, item) => {
      (acc[item.group] ||= []).push(item);
      return acc;
    }, {});
  }, [items]);
  const GROUP_ORDER = [
    "Board Members",
    "Executive Committee",
    "Advisory",
    "Subcommittee",
  ] as const;

  const sortedGroups = useMemo(() => {
    const entries = Object.entries(grouped);

    return entries
      .map(
        ([groupName, members]) =>
          [
            groupName,
            [...members].sort(
              (a, b) =>
                (a.displayOrder ?? 9999) - (b.displayOrder ?? 9999) ||
                a.name.localeCompare(b.name)
            ),
          ] as const
      )
      .sort(([a], [b]) => {
        const ai = GROUP_ORDER.indexOf(a as any);
        const bi = GROUP_ORDER.indexOf(b as any);
        const ax = ai === -1 ? Number.POSITIVE_INFINITY : ai;
        const bx = bi === -1 ? Number.POSITIVE_INFINITY : bi;
        return ax - bx || a.localeCompare(b); // unknown groups go last, alphabetical
      });
  }, [grouped]);

  return (
    <section id="team" className="flex flex-col items-center justify-center">
      <div className="flex flex-col gap-[30px]">
        <Reveal>
          <h1 className="text-center text-[35px] md:text-[54px] tracking-[-2] md:tracking-[-1.9] leading-[32px] md:leading-[50px]">
            Our Team
          </h1>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="text-current/60 max-w-xl leading-[26px]">
            Meet the passionate individuals behind SYAI who are working together
            to build a community of AI enthusiasts and create innovative
            solutions.
          </p>
        </Reveal>
      </div>

      <div className="w-full max-w-5xl mt-10">
        {isLoading && <div className="text-current/60">Loading team…</div>}
        {error && (
          <div className="text-red-500">
            Failed to load team: {error.message}
          </div>
        )}

        {!isLoading && !error && (
          <div className="flex flex-col gap-10">
            {sortedGroups.map(([groupName, members]) => (
              <div key={groupName} className="flex flex-col gap-4">
                <h2 className="text-xl font-semibold">{groupName}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 place-items-stretch lg:grid-cols-4 gap-5">
                  {members.map((m) => (
                    <TeamCard
                      key={m.id}
                      name={m.name}
                      role={m.role}
                      href={m.url}
                      imageUrl={m.image}
                      imageAlt={m.name}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
