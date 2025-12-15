"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import BlueHighlighter from "@/components/BlueHighlight";
import { api } from "@/app/providers";
import { Skeleton } from "@/components/ui/skeleton";

export type PartnersRow = {
  id: number;
  name: string;
  href: string | null;
  image_url: string;
  display_order: number | null;
};

type PartnerItem = {
  id: number;
  name: string;
  href: string | null;
  image: string;
  displayOrder: number;
};

function PartnersSkeleton() {
  return (
    <div className="w-full max-w-5xl mt-10">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="relative w-full p-5 rounded-[15px] flex flex-col border border-white/10 bg-white/5"
          >
            <Skeleton className="h-24 w-full rounded-[12px]" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PartnersClient({
  initialRows,
}: {
  initialRows: PartnersRow[];
}) {
  const { data, isLoading, isFetching, error } = api.partners.getAll.useQuery(
    undefined,
    {
      initialData: initialRows,
      refetchOnWindowFocus: false,
      staleTime: 1,
    }
  );

  const rows = data ?? initialRows;

  const showSkeleton = isLoading && rows.length === 0;

  const items = useMemo<PartnerItem[]>(() => {
    const rows = data ?? [];
    return rows.map((r) => ({
      id: r.id,
      name: r.name,
      href: r.href ?? null,
      image: r.image_url,
      displayOrder: r.display_order ?? 9999,
    }));
  }, [data]);

  const sorted = useMemo(() => {
    return [...items].sort(
      (a, b) => a.displayOrder - b.displayOrder || a.name.localeCompare(b.name)
    );
  }, [items]);

  if (error) {
    return (
      <div className="text-red-500">
        Failed to load partners: {error.message}
      </div>
    );
  }

  return (
    <section
      id="partners"
      className="flex flex-col items-center justify-center"
    >
      <div className="flex flex-col gap-[30px]">
        <Reveal>
          <h1 className="text-center text-[35px] md:text-[54px] tracking-[-2] md:tracking-[-1.9] leading-[32px] md:leading-[50px]">
            Our Partners
          </h1>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="text-current/60 max-w-lg leading-[26px]">
            Working together with Singapore&apos;s leading organisations to
            advance AI education and innovation.
          </p>
        </Reveal>
      </div>

      {showSkeleton ? (
        <PartnersSkeleton />
      ) : (
        <>
          <Grid sorted={sorted} />
          {/* optional: show a tiny “updating…” indicator if isFetching */}
          {isFetching && (
            <div className="mt-3 text-sm text-white/50">Updating…</div>
          )}
        </>
      )}
    </section>
  );
}

function Grid({ sorted }: { sorted: PartnerItem[] }) {
  return (
    <div className="w-full max-w-5xl mt-10">
      <Reveal delay={0.16}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {sorted.map((p) => {
            if (!p.image) return null;

            const card = (
              <div
                className={[
                  "relative w-full p-5 rounded-[15px] flex flex-col border border-white/10",
                  "bg-gradient-to-b from-blue-500/20 to-blue-500/10 backdrop-blur-[5px]",
                  p.href ? "cursor-pointer hover:border-white/20" : "",
                ].join(" ")}
              >
                <BlueHighlighter />
                <div className="w-full relative h-24">
                  <Image
                    src={p.image}
                    alt={p.name ?? "Partner"}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    className="object-contain object-center scale-[0.95] hover:scale-[1.05] transition-all"
                  />
                </div>
              </div>
            );
            console.log(p);
            return p.href ? (
              <Link
                key={p.id}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${p.name}`}
                className="block"
              >
                {card}
              </Link>
            ) : (
              <div key={p.id}>{card}</div>
            );
          })}
        </div>
      </Reveal>
    </div>
  );
}
