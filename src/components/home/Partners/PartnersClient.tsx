import { Reveal } from "@/components/motion/Reveal";
import BlueHighlighter from "@/components/BlueHighlight";
import Image from "next/image";

export type PartnersRow = {
  id: number;
  name: string;
  image_url: string;
  display_order: number | null;
};

export default function TeamClient({
  initialRows,
}: {
  initialRows: PartnersRow[];
}) {
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
      <div className="w-full max-w-5xl mt-10 grid grid-cols-4 gap-5">
        {initialRows.map((e) => (
          <div
            key={e.id}
            className="relative w-full p-5 rounded-[15px] flex flex-col border border-white/10 bg-gradient-to-b from-blue-500/10 to-blue-500/5 backdrop-blur-[5px]"
          >
            <BlueHighlighter />
            <div className="w-full relative h-24">
              <Image
                src={e.image_url}
                alt={e.name}
                fill
                priority={false}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain object-center"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
