"use client";

import { useMemo } from "react";
import TeamCard from "@/components/home/Team/TeamCard";
import { Reveal } from "@/components/motion/Reveal";
import { api } from "@/app/providers";
import { Skeleton } from "@/components/ui/skeleton";

export type TeamRow = {
  id: string;
  name: string;
  role: string;
  image_url: string | null;
  linkedin_url: string | null;
  group: string | null;
  display_order: number | null;
};

type TeamItem = {
  id: string;
  image: string;
  name: string;
  role: string;
  url: string;
  group: string;
  displayOrder: number;
};

function TeamSkeleton() {
  return (
    <div className="flex flex-col gap-10">
      {Array.from({ length: 4 }).map((_, gi) => (
        <div key={gi} className="flex flex-col gap-4">
          <Skeleton className="h-6 w-48" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((__, i) => (
              <div
                key={i}
                className="w-full p-[10px] rounded-[15px] flex flex-col border border-white/10 bg-white/5"
              >
                <Skeleton className="aspect-square w-full rounded-[12px]" />
                <div className="mt-3 flex flex-col gap-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function TeamClient({
  initialRows,
}: {
  initialRows: TeamRow[];
}) {
  const {
    data = initialRows,
    isFetching,
    isLoading,
    error,
  } = api.team.getAll.useQuery(undefined, {
    initialData: initialRows,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10,
  });

  const items = useMemo<TeamItem[]>(() => {
    const rows = data ?? [];
    return rows.map((r) => ({
      id: r.id,
      image: r.image_url ?? "/placeholder-avatar.png",
      name: r.name,
      role: r.role,
      url: r.linkedin_url ?? "",
      group: r.group ?? "Team",
      displayOrder: r.display_order ?? 9999,
    }));
  }, [data]);

  const grouped = useMemo<Record<string, TeamItem[]>>(() => {
    return items.reduce<Record<string, TeamItem[]>>((acc, item) => {
      (acc[item.group] ??= []).push(item);
      return acc;
    }, {});
  }, [items]);

  const GROUP_ORDER = [
    "Board Members",
    "Executive Committee",
    "Advisory",
    "Subcommittee",
  ] as const;

  const groupRank = useMemo<Record<string, number>>(() => {
    const rank: Record<string, number> = {};
    GROUP_ORDER.forEach((g, i) => {
      rank[g] = i;
    });
    return rank;
  }, []);

  const sortedGroups = useMemo(() => {
    return Object.entries(grouped)
      .map(([groupName, members]) => {
        const sortedMembers = [...members].sort(
          (a, b) =>
            a.displayOrder - b.displayOrder || a.name.localeCompare(b.name)
        );
        return [groupName, sortedMembers] as const;
      })
      .sort(([a], [b]) => {
        const ax = groupRank[a] ?? Number.POSITIVE_INFINITY;
        const bx = groupRank[b] ?? Number.POSITIVE_INFINITY;
        return ax - bx || a.localeCompare(b);
      });
  }, [grouped, groupRank]);

  if (error) {
    return (
      <div className="text-red-500">Failed to load team: {error.message}</div>
    );
  }

  if ((isLoading || isFetching) && initialRows.length === 0) {
    return <TeamSkeleton />;
  }

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
        <div className="flex flex-col gap-10">
          {sortedGroups.map(([groupName, members], idx) => (
            <div key={groupName} className="flex flex-col gap-4">
              <Reveal delay={0.08 * (idx + 1)}>
                <h2 className="text-xl font-semibold">{groupName}</h2>
              </Reveal>
              <Reveal
                delay={0.08 * (idx + 2)}
                amount={idx == sortedGroups.length - 1 ? "some" : undefined}
              >
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
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
