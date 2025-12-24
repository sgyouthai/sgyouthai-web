import { Reveal } from "@/components/motion/Reveal";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AIMM() {
  return (
    <section id="AIMM" className="flex flex-col items-center justify-center">
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
      <Button variant={"default"} asChild>
        <Link href="/link/aimm-signup" target="_blank">Register Now!</Link>
      </Button>
    </section>
  );
}
