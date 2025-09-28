import Navbar from "@/components/nav/Navbar";
import Image from "next/image";
import { totalMembers } from "./const";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import LogoMarquee from "@/components/logo-marquee";

export default function HomePage() {
  return (
    <div className="fullHeight flex flex-col overflow-clip max-w-screen">
      <Navbar />
      <main className="relative flex flex-1 flex-col">
        <section>
          <Image
            loading="eager"
            src="/background.svg"
            alt=""
            className="blur-lg fixed -z-50 -translate-x-1/2 inset-x-1/2 -inset-y-3/4 w-[2353px] h-[1969px] object-cover max-w-[unset]"
            width={256}
            height={214}
          />
          <div className="max-w-7xl mx-auto py-28 md:py-40 px-7 md:px-10">
            <div className="flex flex-col gap-[26px]">
              <h1 className="text-[56px] md:text-[86px] max-w-[750px] tracking-[-3.4] md:tracking-[-3.8] leading-[55px] md:leading-[90px]">
                Singapore&apos;s Largest AI Community
              </h1>
              <p className="font-light text-current/60 max-w-md leading-[26px]">
                Join over {totalMembers} of the brightest young minds from
                polytechnics and JCs to shape the future of AI in Singapore.
              </p>
              <div className="flex flex-col md:flex-row items-start justify-left gap-3 pt-10 md:pt-5">
                <Button className="text-[16px] trakcing-[-0.5] font-medium">
                  Connect With Us
                </Button>
                <Button
                  className="text-[16px] trakcing-[-0.5] font-medium"
                  variant={"secondary"}
                >
                  What is SYAI?
                </Button>
              </div>
              <div className="max-w-sm flex flex-col gap-5 pt-[50px]">
                <Separator
                  className="h-[1px]"
                  style={{
                    background:
                      "linear-gradient(270deg, var(--token-4ba9d2af-bbc9-422d-912b-c0d857289d96, rgba(255, 255, 255, 0)) 0%, var(--token-4ef09f89-9c35-4972-a9c1-8efc95820553, rgba(255, 255, 255, .2)) 50%, var(--token-4ba9d2af-bbc9-422d-912b-c0d857289d96, rgba(255, 255, 255, 0)) 100%)",
                  }}
                />
                <LogoMarquee />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
