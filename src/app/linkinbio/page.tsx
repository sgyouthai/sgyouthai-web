"use client";

import Image from "next/image";
import { api } from "@/app/providers";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import ShareButton from "@/components/linkinbio/ShareButton";
import { EllipsisVertical, Ellipsis, Bell } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import BlueHighlighter from "@/components/BlueHighlight";

function LinkRowSkeleton({ twoLines = false }: { twoLines?: boolean }) {
  return (
    <div className="w-full rounded-[10px] border border-white/10 bg-white/[0.03] p-4 min-h-[70px] flex items-center">
      <BlueHighlighter />
      <div className="flex items-center justify-between gap-3 w-full">
        {/* left text area */}
        <div className="flex flex-col gap-2 flex-1 min-w-0">
          <Skeleton className="h-5 w-full" />
          {twoLines && <Skeleton className="h-5 w-3/4 md:hidden" />}
        </div>

        {/* right icon */}
      </div>
    </div>
  );
}

export default function LinkInBioPage() {
  const [currentUrl, setCurrentUrl] = useState("");
  const [showHeader, setShowHeader] = useState(true);

  const {
    data: links = [],
    isLoading,
    isFetching,
  } = api.linkinbio.getAll.useQuery(
    { showHidden: false },
    {
      staleTime: 60_000,
      gcTime: 10 * 60_000,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    const handleScroll = () => setShowHeader(window.scrollY <= 75);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const showSkeletons = isLoading || (isFetching && links.length === 0);

  return (
    <div className="flex flex-col max-w-xl mx-auto space-y-5 p-5 w-full">
      <div
        className={cn(
          "fixed px-3 top-5 w-full container mx-auto left-1/2 -translate-x-1/2 flex justify-between transition-all max-w-xl",
          showHeader ? "opacity-100" : "opacity-0"
        )}
      >
        <Button
          className="rounded-full border border-white/10 bg-gradient-to-b from-blue-500/10 to-blue-500/5 backdrop-blur-[5px] shadow-xl"
          size="icon"
          onClick={() => toast.info("Coming Soon!")}
          variant={"ghost"}
        >
          <Bell />
        </Button>

        <ShareButton
          className="rounded-full border border-white/10 bg-gradient-to-b from-blue-500/10 to-blue-500/5 backdrop-blur-[5px] shadow-xl"
          size="icon"
          linkInfo={{
            name: "SG Youth AI",
            href: currentUrl,
          }}
          variant={"ghost"}
          icon={<Ellipsis />}
        />
      </div>

      <div className="rounded-full border w-fit mx-auto p-2 mt-5 mb-7.5 border-white/10 bg-gradient-to-b from-blue-500/10 to-blue-500/5 backdrop-blur-[5px] shadow-xl">
        <Image
          width={100}
          height={100}
          alt="SYAI LOGO"
          src="/SYAI_Logo_White.png"
        />
      </div>

      <div className="flex flex-col gap-5">
        {showSkeletons ? (
          <>
            {Array.from({ length: 5 }).map((_, i) => (
              <LinkRowSkeleton key={i} twoLines={[0, 1, 3].includes(i)} />
            ))}
          </>
        ) : (
          links.map((link, idx) => (
            <Link
              href={link.url}
              key={(link.id ?? link.url ?? link.title) + idx}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "group w-full flex items-center justify-between rounded-[10px] border py-4 text-left relative",
                "transition hover:-translate-y-[1px] hover:shadow-sm active:translate-y-0",
                "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
              )}
            >
              <BlueHighlighter />
              <span className="pl-[10px]">{link.title}</span>
              <ShareButton
                className="right-2 w-[36px]"
                size="icon"
                variant="ghost"
                linkInfo={{
                  name: link.title,
                  href: link.url,
                }}
                icon={<EllipsisVertical />}
              />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
