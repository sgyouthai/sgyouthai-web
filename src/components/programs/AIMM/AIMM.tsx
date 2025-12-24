import { Reveal } from "@/components/motion/Reveal";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Marquee from "react-fast-marquee";
import { AIMMCard } from "@/components/programs/AIMM/AIMMCard";
import BlueHighlighter from "@/components/BlueHighlight";
import { Shield, PieChart, Zap } from "lucide-react";

export default function AIMM() {
  const goals = [
    {
      icon: <Shield />,
      title: "Expert Presentations",
      text: "Learn from industry experts and innovators sharing cutting-edge AI developments.",
    },
    {
      icon: <Zap />,
      title: "Interactive Workshops",
      text: "Engage in hands-on skill-building sessions to enhance your AI capabilities.",
    },
    {
      icon: <PieChart />,
      title: "Networking Activities",
      text: "Connect with peers and discover collaboration opportunities in a supportive environment.",
    },
  ];

  const meetups = [
    {
      title: "Monthly Meetup Jan 25",
      topic: "Fireside Chat with Dr. Mukundan A P & Mr. Mohammed Khambhati",
      src: "https://zbzfzyaozhjskrizhcsc.supabase.co/storage/v1/object/public/syai-web/gallery/meetup.jpg",
    },
    {
      title: "Monthly Meetup Feb 25",
      topic: "AI Project Showcase",
      src: "https://zbzfzyaozhjskrizhcsc.supabase.co/storage/v1/object/public/syai-web/gallery/MonthlyMeetupFeb.jpg",
    },
    {
      title: "Monthly Meetup Mar 25",
      topic: '"Resume Roasting" by Ms. Lim Mei Yu',
      src: "https://zbzfzyaozhjskrizhcsc.supabase.co/storage/v1/object/public/syai-web/gallery/meetupMar.jpg",
    },
    {
      title: "Monthly Meetup Apr 25",
      topic: "AI Startup Pitching",
      src: "https://zbzfzyaozhjskrizhcsc.supabase.co/storage/v1/object/public/syai-web/gallery/meetupApr.jpg",
    },
    // {
    //   title: "Monthly Meetup May 25",
    //   topic: "Fireside Chat at ATxSummit: AI Student Developer Conference 2025",
    //   src: "https://zbzfzyaozhjskrizhcsc.supabase.co/storage/v1/object/public/syai-web/gallery/meetupApr.jpg",
    // },
    {
      title: "Monthly Meetup Jun 25",
      topic: "Vibe Coding Workshop",
      src: "https://zbzfzyaozhjskrizhcsc.supabase.co/storage/v1/object/public/syai-web/gallery/MonthlyAIMeetupJun.jpg",
    },
    {
      title: "Monthly Meetup Jul 25",
      topic:
        "SG60 Special: Multiligual AI by A* Star MERaLiON & Speech Synthesis by ElevenLabs",
      src: "https://zbzfzyaozhjskrizhcsc.supabase.co/storage/v1/object/public/syai-web/gallery/MeetupJuly.jpg",
    },
    {
      title: "Monthly Meetup Aug 25",
      topic: "AI Youth Startups Showcase @ SMU",
      src: "https://zbzfzyaozhjskrizhcsc.supabase.co/storage/v1/object/public/syai-web/gallery/MeetupAug25.jpeg",
    },
    // {
    //   title: "Monthly Meetup Sep 25",
    //   topic: "Fireside Chat with Ms. Assel Mussagaliyeva-Tang",
    //   src: "https://zbzfzyaozhjskrizhcsc.supabase.co/storage/v1/object/public/syai-web/gallery/MeetupAug25.jpeg",
    // },
  ];

  return (
    <section
      id="AIMM"
      className="flex flex-col items-center justify-center gap-[30px]"
    >
      <div className="flex flex-col gap-[30px]">
        <Reveal>
          <h1 className="text-center text-[35px] md:text-[54px] tracking-[-2] md:tracking-[-1.9] leading-[32px] md:leading-[50px]">
            AI Monthly Meetups
          </h1>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="text-current/60 max-w-3xl leading-[26px]">
            Our community engagement initiative, developed in collaboration with{" "}
            <Link href="https://www.youthtech.sg/" target="_blank">
              YouthTechSG (previously known as Cyber Youth Singapore)
            </Link>
            , has secured $50,000 in funding to host Monthly AI Meetups.
          </p>
        </Reveal>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {goals.map((e, i) => (
          <div
            key={"Goals" + i}
            className="relative  h-full gap-5 w-full p-[20px] rounded-[10px] flex border border-white/10 bg-gradient-to-b from-blue-500/10 to-blue-500/5 backdrop-blur-[5px] shadow-xl"
          >
            <BlueHighlighter />
            <div className="w-6">{e.icon}</div>
            <div className="flex flex-col gap-1">
              <h3 className="font-semibold">{e.title}</h3>
              <p className="text-sm">{e.text}</p>
            </div>
          </div>
        ))}
      </div>
      <Reveal delay={0.16}>
        <Button variant={"default"} asChild>
          <Link
            href="/link/aimm-signup"
            target="_blank"
            className="text-[16px] tracking-[-0.5] font-medium  py-6 px-6"
          >
            Register for this month's AI Meetup!
          </Link>
        </Button>
      </Reveal>
      <Reveal delay={0.16}>
        <div className="w-[100dvw]">
          <Marquee
            autoFill
            pauseOnHover
            className="
    [&_.rfm-marquee]:items-stretch
    [&_.rfm-initial-child-container]:items-stretch
    [&_.rfm-child]:self-stretch
    [&_.rfm-child]:flex
  "
          >
            {meetups.map((e, i) => (
              <AIMMCard
                key={e.title + i}
                src={e.src}
                title={e.title}
                topic={e.topic}
                i={i}
              />
            ))}
          </Marquee>
        </div>
      </Reveal>
    </section>
  );
}
