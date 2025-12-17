import { Reveal } from "@/components/motion/Reveal";

export default function Inspire() {
  return (
    <section id="Inspire" className="flex flex-col items-center justify-center">
      <div className="flex flex-col gap-[30px]">
        <Reveal>
          <h1 className="text-center text-[35px] md:text-[54px] tracking-[-2] md:tracking-[-1.9] leading-[32px] md:leading-[50px]">
            SYAI Inspire
          </h1>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="text-current/60 max-w-xl leading-[26px]">
            Meet the passionate individuals behind SYAI who are working together
            to build a community of AI enthusiasts and create innovative
            solutions.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
