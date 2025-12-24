import { totalMembers } from "@/app/const";
import Image from "next/image";
import CountUp from "@/components/CountUp";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";

type Stat = {
  to: number;
  label: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
};

function StatItem({ stat }: { stat: Stat }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-6 py-6">
      <CountUp
        to={stat.to}
        prefix={stat.prefix ?? ""}
        suffix={stat.suffix ?? ""}
        decimals={stat.decimals ?? 0}
        duration={1.25}
        className="text-4xl md:text-5xl font-medium tracking-tight text-center"
      />
      <div className="text-sm md:text-base text-current/60 text-center">
        {stat.label}
      </div>
    </div>
  );
}

export default function About() {
  const stats: Stat[] = [
    { to: totalMembers, suffix: "+", label: "Members" },
    { to: 4000, suffix: "+", label: "Youths Reached" },
    { to: 4, label: "Academic Partners" },
    {
      to: 64.3,
      prefix: "$",
      suffix: "K",
      decimals: 1,
      label: "Total Funding Secured",
    },
  ];

  return (
    <section id="about" className="gap-[30px] flex flex-col">
      <div className="space-y-[3px] md:space-y-[10px]">
        <Reveal>
          <h1 className="text-center text-[35px] md:text-[54px] tracking-[-2] md:tracking-[-1.9] leading-[32px] md:leading-[50px]">
            Our Story
          </h1>
        </Reveal>
        <Reveal delay={0.08}>
          <h3 className="text-3xl font-medium text-center text-current/60">
            For Youths, By Youths!
          </h3>
        </Reveal>
      </div>
      <Reveal delay={0.16}>
        <div className="flex gap-4 md:gap-12 items-center justify-center flex-col md:flex-row">
          <Image
            src="/SYAI_Logo_White.png"
            height={200}
            width={200}
            alt="SYAI Logo"
            className="w-96"
          />
          <Reveal delay={0.16}>
            <div className="flex text-base md:text-lg gap-4 md:gap-8 lg:gap-12  flex-col md:flex-row">
              <p>
                Singapore Youth AI (SYAI) began in 2023, started by students
                from Polytechnics and Junior Colleges. We wanted one place where
                young people who love AI could actually meet and learn together.
              </p>
              <p>
                Since then, we&apos;ve grown into a community of {totalMembers}+
                youth innovators. We connect people, spark collaborations, and
                support Singapore-focused initiatives that start from student
                curiosity.
              </p>
            </div>
          </Reveal>
        </div>
      </Reveal>
      <Reveal delay={0.24}>
        <div className="grid grid-cols-2 gap-y-2 md:grid-cols-4">
          {stats.map((s, idx) => (
            <div key={s.label} className="relative">
              <StatItem stat={s} />
              {/* dividers */}
              <div
                className={cn(
                  "hidden md:block absolute right-0 top-6 bottom-6 w-px bg-white/10",
                  idx == stats.length - 1 && "md:hidden"
                )}
              />
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
