"use client";

import Image from "next/image";
import { totalMembers } from "@/app/const";
import { Button } from "@/components/ui/button";
import LogoMarquee from "@/components/logo-marquee";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";
import { useAtom } from "jotai";
import { cursorActiveAtom } from "@/state/cursor";

export default function Hero() {
  const [, setActive] = useAtom(cursorActiveAtom);
  return (
    <section>
      <div className="max-w-7xl mx-auto py-20 pb-10 md:pt-40 md:pb-16 relative">
        <Image
          className="absolute w-[250px] bottom-10 right-0 md:block hidden"
          src="/HEY.png"
          alt=""
          width={500}
          height={500}
          data-aos="fade"
          data-aos-delay="500"
        />
        <div className="flex flex-col gap-[26px]">
          <h1
            className="text-[56px] md:text-[86px] max-w-[750px] tracking-[-3.4] md:tracking-[-3.8] leading-[55px] md:leading-[90px]"
            data-aos="fade"
          >
            Singapore&apos;s Largest AI Community
          </h1>
          <p
            className="text-current/60 max-w-md leading-[26px]"
            data-aos="fade"
            data-aos-delay="100"
          >
            Join over {totalMembers} of the brightest young minds from
            polytechnics and JCs to shape the future of AI in Singapore.
          </p>
          <div
            className="flex flex-col md:flex-row items-start justify-left gap-3 pt-5 md:pt-5"
            data-aos="fade"
            data-aos-delay="150"
          >
            <Button
              className="text-[16px] tracking-[-0.5] font-medium  py-6 px-6"
              asChild
              onMouseEnter={() => setActive(true)}
              onMouseLeave={() => setActive(false)}
            >
              <Link href={"mailto:hello@sgyouthai.org?subject=Connect With Us"}>
                Connect With Us
              </Link>
            </Button>
            <Button
              className="text-[16px] tracking-[-0.5] font-medium py-6 px-6"
              variant={"secondary"}
              asChild
              onMouseEnter={() => setActive(true)}
              onMouseLeave={() => setActive(false)}
            >
              <Link href={"#about"}>Explore Our Story</Link>
            </Button>
          </div>
          <div
            className="max-w-sm flex flex-col gap-5 pt-[50px]"
            data-aos="fade"
            data-aos-delay="200"
          >
            <Separator
              className="h-[1px]"
              style={{
                background:
                  "linear-gradient(270deg, var(--token-4ba9d2af-bbc9-422d-912b-c0d857289d96, rgba(255, 255, 255, 0)) 0%, var(--token-4ef09f89-9c35-4972-a9c1-8efc95820553, rgba(255, 255, 255, .2)) 50%, var(--token-4ba9d2af-bbc9-422d-912b-c0d857289d96, rgba(255, 255, 255, 0)) 100%)",
              }}
            />
            <LogoMarquee speed={25} />
          </div>
        </div>
      </div>
    </section>
  );
}
