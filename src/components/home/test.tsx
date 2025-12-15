import Image from "next/image";

type TeamCardProps = {
  name: string;
  role: string;
  href: string; // external link (LinkedIn, etc.)
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
    <div className="w-full self-stretch flex">
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
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black" />
        </div>
        <div className="flex flex-col rounded-b-[15px] grow bg-black py-[10px] px-[15px] w-full">
          <div className="mt-auto relative flex items-center justify-between gap-4 rounded-xl border border-blue-500/20 bg-[#000e2b] p-4 shadow-[2px_4px_24px_10px_rgba(0,0,0,0.35)] backdrop-blur-sm">
            {/* Text */}
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white">{name}</p>
              <p className="text-xs text-white/70">{role}</p>
            </div>
            {/* <div className="relative shrink-0">
                <div className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-[10px] border border-blue-500/20 shadow-[0px_5px_25px_0px_rgba(0,85,255,0.25),_0px_10px_10px_-1px_rgba(255,255,255,0.08)_inset]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,153,255,0.15)_0%,rgb(9,9,18)_100%)] shadow-[0px_10px_10px_-1px_rgba(0,85,255,0.1)_inset]" />
                  <div className="relative opacity-60">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 256 256"
                      className="h-5 w-5 fill-white"
                      aria-hidden="true"
                    >
                      <path d="M214.75,211.71l-62.6-98.38,61.77-67.95a8,8,0,0,0-11.84-10.76L143.24,99.34,102.75,35.71A8,8,0,0,0,96,32H48a8,8,0,0,0-6.75,12.3l62.6,98.37-61.77,68a8,8,0,1,0,11.84,10.76l58.84-64.72,40.49,63.63A8,8,0,0,0,160,224h48a8,8,0,0,0,6.75-12.29ZM164.39,208,62.57,48h29L193.43,208Z" />
                    </svg>
                  </div>
                </div>
              </div> */}
            {/* subtle inner shadow blob */}
            {/* <div className="pointer-events-none absolute -inset-8 -z-10 rounded-[999px] bg-[radial-gradient(43%_50%,rgba(9,9,18,0.15)_0%,rgb(9,9,18)_100%)] opacity-80" /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
