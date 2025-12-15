import Image from "next/image";
import { totalMembers } from "@/app/const";
import { Button } from "@/components/ui/button";
import LogoMarquee from "@/components/logo-marquee";
import { Separator } from "@radix-ui/react-separator";
import { HeroReveal } from "@/components/motion/Reveal";
import Link from "next/link";

export default function Hero() {
  const stickers = [
    "/stickers/404.png",
    "/stickers/CAMERA.png",
    "/stickers/COFFEE.png",
    "/stickers/COMPUTER.png",
    "/stickers/ssssh.png",
  ];

  return (
    <section>
      <div className="max-w-7xl mx-auto py-20 pb-10 md:pt-40 md:pb-16 relative">
        <HeroReveal delay={0.3}>
          <Image
            src="/HEY.png"
            alt=""
            width={250}
            height={250}
            sizes="(min-width: 768px) 250px, 0px"
            className="absolute bottom-10 right-0 hidden md:block"
            loading="lazy"
          />
        </HeroReveal>
        <div className="flex flex-col gap-[26px]">
          <HeroReveal delay={0}>
            <h1 className="text-[56px] md:text-[86px] max-w-[750px] tracking-[-3.4] md:tracking-[-3.8] leading-[55px] md:leading-[90px]">
              Singapore&apos;s Largest AI Community
            </h1>
          </HeroReveal>
          <HeroReveal delay={0.08}>
            <p className="text-current/60 max-w-md leading-[26px]">
              Join over {totalMembers} of the brightest young minds from
              polytechnics and JCs to shape the future of AI in Singapore.
            </p>
          </HeroReveal>
          <HeroReveal delay={0.16}>
            <div className="flex flex-col md:flex-row items-start justify-left gap-3 pt-5 md:pt-5">
              <Button
                className="text-[16px] tracking-[-0.5] font-medium  py-6 px-6"
                asChild
              >
                <Link
                  href={"mailto:hello@sgyouthai.org?subject=Connect With Us"}
                >
                  Connect With Us
                </Link>
              </Button>
              <Button
                className="text-[16px] tracking-[-0.5] font-medium py-6 px-6"
                variant={"secondary"}
                asChild
              >
                <Link href={"#about"}>Explore Our Story</Link>
              </Button>
            </div>
          </HeroReveal>
          <HeroReveal delay={0.24}>
            <div className="max-w-sm flex flex-col gap-5 pt-[50px]">
              <Separator
                className="h-[1px]"
                style={{
                  background:
                    "linear-gradient(270deg, var(--token-4ba9d2af-bbc9-422d-912b-c0d857289d96, rgba(255, 255, 255, 0)) 0%, var(--token-4ef09f89-9c35-4972-a9c1-8efc95820553, rgba(255, 255, 255, .2)) 50%, var(--token-4ba9d2af-bbc9-422d-912b-c0d857289d96, rgba(255, 255, 255, 0)) 100%)",
                }}
              />
              <LogoMarquee speed={25} logos={stickers} />
            </div>
          </HeroReveal>
        </div>
      </div>
    </section>
  );
}
