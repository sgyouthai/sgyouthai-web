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

export default function LinkInBioPage() {
  const [currentUrl, setCurrentUrl] = useState("");
  const [showHeader, setShowHeader] = useState(true);

  const { data: links = [] } = api.linkinbio.getAll.useQuery(
    { showHidden: false },
    {
      staleTime: 60_000,
      gcTime: 10 * 60_000,
      refetchOnWindowFocus: false,
      // ✅ no select -> you get the full objects
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
          variant={"secondary"}
        >
          <Bell />
        </Button>

        <ShareButton
          className="rounded-full"
          size="icon"
          linkInfo={{
            name: "SG Youth AI",
            href: currentUrl,
          }}
          variant={"secondary"}
          icon={<Ellipsis />}
        />
      </div>

      <div className="rounded-full border w-fit mx-auto p-2 mt-5 border-white/10 bg-gradient-to-b from-blue-500/10 to-blue-500/5 backdrop-blur-[5px] shadow-xl">
        <Image
          width={100}
          height={100}
          alt="SYAI LOGO"
          src="/SYAI_Logo_White.png"
        />
      </div>

      {links.map((link, idx) => (
        <Link
          href={link.url}
          key={(link.id ?? link.url ?? link.title) + idx}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0  bg-neutral-100 text-neutral-900 shadow-sm hover:bg-neutral-100/80 w-full px-8 py-6 text-lg min-h-[4.5rem] relative rounded-xl text-center"
        >
          <span>{link.title}</span>

          <ShareButton
            className="absolute right-2"
            size="icon"
            variant="ghost"
            linkInfo={{
              name: link.title,
              href: link.url,
            }}
            icon={<EllipsisVertical />}
          />
        </Link>
      ))}
    </div>
  );
}
