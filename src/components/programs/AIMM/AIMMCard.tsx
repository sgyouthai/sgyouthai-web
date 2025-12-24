import BlueHighlighter from "@/components/BlueHighlight";
import Image from "next/image";

export const AIMMCard = ({
  src,
  topic,
  title,
  i,
}: {
  src: string;
  topic: string;
  title: string;
  i: number;
}) => (
  <div className="relative h-full w-80 md:w-128 shrink-0 px-3 flex">
    <BlueHighlighter />
    <div className="h-full w-full p-[10px] rounded-[25px] flex flex-col border border-white/10 bg-gradient-to-b from-blue-500/10 to-blue-500/5 backdrop-blur-[5px] shadow-xl">
      {/* <div className="w-full p-[10px] rounded-[25px] flex flex-col border border-white/10 bg-gradient-to-b from-blue-500/10 to-blue-500/5 backdrop-blur-[5px] shadow-xl"> */}
      <div className="relative aspect-video w-full rounded-t-[10px] overflow-hidden">
        <Image
          src={src}
          alt={title}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/20 via-85% to-black" />
      </div>
      <div className="flex flex-col justify-center rounded-b-[15px] grow bg-black p-[10px] w-full">
        <div className="gap-2 flex flex-col border-blue-500/20 bg-[#000e2b] p-3 border shadow-[2px_4px_24px_10px_rgba(0,0,0,0.35)] backdrop-blur-sm rounded-xl">
          <div className="relative flex items-center justify-between gap-4">
            <div className="min-w-0 w-full">
              <p className="text-sm font-semibold text-white">{title}</p>
              <p className="text-xs text-white/70 text-wrap">{topic}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
