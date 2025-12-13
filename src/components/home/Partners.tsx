import { Reveal } from "@/components/motion/Reveal";

export default function Partners() {
  return (
    <section
      id="partners"
      className="flex flex-col items-center justify-center"
    >
      <div className="flex flex-col gap-[30px]">
        <Reveal>
          <h1 className="text-center text-[35px] md:text-[54px] tracking-[-2] md:tracking-[-1.9] leading-[32px] md:leading-[50px]">
            Our Partners
          </h1>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="text-current/60 max-w-lg leading-[26px]">
            Working together with Singapore&apos;s leading organizations to
            advance AI education and innovation.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
