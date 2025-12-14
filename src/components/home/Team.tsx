"use client";

import { useMemo } from "react";
import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { api } from "@/app/providers"; // adjust if your api export path differs

type TeamRow = {
  id: string;
  name: string;
  role: string;
  handle: string | null;
  image_url: string | null;
  profile_url: string | null;
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
      title: r.name,
      subtitle: r.role,
      handle: r.handle ?? "",
      borderColor: r.border_color ?? "#3B82F6",
      gradient: r.gradient ?? "linear-gradient(145deg, #3B82F6, #000)",
      url: r.profile_url ?? undefined,
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
            {Object.entries(grouped).map(([groupName, members]) => (
              <div key={groupName} className="flex flex-col gap-4">
                <h2 className="text-xl font-semibold">{groupName}</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {members.map((m) => (
                    <a
                      key={m.id}
                      href={m.url ?? "#"}
                      target={m.url ? "_blank" : undefined}
                      rel={m.url ? "noreferrer" : undefined}
                      className="rounded-2xl border p-5 hover:opacity-90 transition"
                      style={{
                        borderColor: m.borderColor,
                        background: m.gradient,
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative h-14 w-14 overflow-hidden rounded-full bg-black/20">
                          <Image
                            src={m.image}
                            alt={m.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-col">
                          <div className="font-semibold">{m.title}</div>
                          <div className="text-sm text-white/70">
                            {m.subtitle}
                          </div>
                          {m.handle ? (
                            <div className="text-sm text-white/60">
                              {m.handle}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </a>
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
