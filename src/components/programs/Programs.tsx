import { Reveal } from "@/components/motion/Reveal";
import BlueHighlighter from "@/components/BlueHighlight";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function ProgramsBody() {
  const programs = [
    {
      title: "AI Monthly Meetup",
      description:
        "Our monthly community event where youths gather to learn AI, showcase projects and network through talks, demos and discussions.",
      src: "https://zbzfzyaozhjskrizhcsc.supabase.co/storage/v1/object/public/syai-web/gallery/MeetupAug25.jpeg",
      cta: "/programs#AIMM",
    },
    {
      title: "SYAI Inspire",
      description:
        "Our youth-led outreach programme that trains youths in AI and empowers them to teach secondary school students through talks and workshops.",
      src: "https://zbzfzyaozhjskrizhcsc.supabase.co/storage/v1/object/public/syai-web/gallery/NewTownPresentation.jpg",
      cta: "/programs#Inspire",
    },
    {
      title: "SYAI Labs",
      description: "Coming Soon!",
      src: "https://zbzfzyaozhjskrizhcsc.supabase.co/storage/v1/object/public/syai-web/gallery/meetupMar.jpg",
      cta: "/programs#Labs",
    },
  ];

  return (
    <section
      id="Programs"
      className="flex flex-col items-center justify-center gap-[30px]"
    >
      <div className="flex flex-col gap-[30px]">
        <Reveal>
          <h1 className="text-center text-[35px] md:text-[54px] tracking-[-2] md:tracking-[-1.9] leading-[32px] md:leading-[50px]">
            Our Programs
          </h1>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="text-current/60 max-w-3xl leading-[26px]"></p>
        </Reveal>
      </div>
      <Reveal delay={0.16} className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
          {programs.map((e, i) => (
            <div
              key={`Program${i}`}
              className="relative h-full w-full shrink-0 flex"
            >
              <BlueHighlighter />
              <div className="h-full w-full p-[10px] rounded-[25px] flex flex-col border border-white/10 bg-gradient-to-b from-blue-500/10 to-blue-500/5 backdrop-blur-[5px] shadow-xl">
                <div className="relative aspect-video w-full rounded-t-[10px] overflow-hidden">
                  <Image
                    src={e.src}
                    alt={e.title}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/20 via-85% to-black" />
                </div>
                <div className="flex flex-col justify-center rounded-b-[15px] grow bg-black p-[10px] w-full">
                  <div className="gap-2 flex flex-col border-blue-500/20 bg-[#000e2b] p-3 border shadow-[2px_4px_24px_10px_rgba(0,0,0,0.35)] backdrop-blur-sm rounded-xl h-full">
                    <div className=" h-full w-full flex flex-col items-center">
                      <p className="text-2xl mb-2 font-medium text-white">
                        {e.title}
                      </p>
                      <p className="text-sm my-auto text-white/70 text-wrap">
                        {e.description}
                      </p>
                      <div className="w-full flex">
                        <Button variant={"default"} asChild>
                          <Link
                            href={e.cta}
                            className="font-medium mt-4 w-full"
                          >
                            Find out more
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
