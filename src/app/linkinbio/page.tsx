"use client";

import Image from "next/image";
import { api } from "@/app/providers";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useState } from "react";
import ShareButton from "@/components/linkinbio/ShareButton";
import { Ellipsis, Bell } from "lucide-react";

export default function LinkInBioPage() {
  const currentUrl = "https://sgyouthai.org";
  const [showHeader, setShowHeader] = useState(true);
  const { data: titles = [] } = api.linkinbio.getAll.useQuery(
    { showHidden: false },
    {
      // cache tuning
      staleTime: 60_000, // treat data as fresh for 1 min (no refetch on mount)
      gcTime: 10 * 60_000, // keep in cache for 10 min after unused (v5; use cacheTime in v4)
      refetchOnWindowFocus: false,

      // “memo”: derive stable/cheap output without redoing work everywhere
      select: (data) => data.map((l) => l.title),
    }
  );

  return (
    <div className="flex flex-col max-w-xl mx-auto space-y-4 p-5">
      <div
        className={cn(
          "fixed px-3 top-5 w-full container mx-auto left-1/2 -translate-x-1/2 flex justify-between transition-all max-w-xl",
          showHeader ? "opacity-100" : "opacity-0"
        )}
      >
        <Button
          className="rounded-full"
          size="icon"
          onClick={() => toast.info("Coming Soon!")}
        >
          <Bell />
        </Button>
        <ShareButton
          className="rounded-full"
          size="icon"
          linkInfo={{
            name: "SG Youth AI",
            href: currentUrl || "", // Use state for the URL
          }}
          icon={<Ellipsis />}
        ></ShareButton>
      </div>
      <div className="rounded-full border border-pink-500 w-fit mx-auto p-2 mt-5">
        <Image
          width={100}
          height={100}
          alt="SYAI LOGO"
          src="/SYAI_Logo_White.png"
        />
      </div>
      asd
      <Button onClick={() => toast.info("TEST")}>TEST</Button>
      {titles.map((t) => (
        <div key={t}>{t}</div>
      ))}
    </div>
  );
}
