import Image from "next/image";
import Link from "next/link";
import { FaLinkedinIn } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import BlueHighlighter from "@/components/BlueHighlight";

type TeamCardProps = {
  name: string;
  role: string;
  href: string;
  imageUrl: string;
  imageAlt?: string;
};

export default function TeamCard({
  name,
  role,
  href,
  imageUrl,
  imageAlt = "Portrait",
}: TeamCardProps) {
  return (
    <div className="w-full self-stretch flex relative">
      <BlueHighlighter />
      <div className="w-full p-[10px] rounded-[15px] flex flex-col border border-white/10 bg-gradient-to-b from-blue-500/10 to-blue-500/5 backdrop-blur-[5px]">
        <div className="relative w-full rounded-t-[15px] aspect-square overflow-hidden">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            priority={false}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/20 via-85% to-black" />
        </div>
        <div className="flex flex-col justify-center rounded-b-[15px] grow bg-black p-[10px] w-full">
          <div className="gap-2 flex flex-col border-blue-500/20 bg-[#000e2b] p-3 border shadow-[2px_4px_24px_10px_rgba(0,0,0,0.35)] backdrop-blur-sm rounded-xl">
            <div className="relative flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white">{name}</p>
                <p className="text-xs text-white/70">{role}</p>
              </div>
            </div>
            <Button
              asChild
              size={"icon"}
              type="button"
              variant={"ghost"}
              className="w-4 h-4"
            >
              <Link href={href} target="_blank">
                <FaLinkedinIn />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
