import { Reveal } from "@/components/motion/Reveal";
import BlueHighlighter from "@/components/BlueHighlight";
import Link from "next/link";
import { InspireCarousel } from "./InspireCarousel";
import { BsPatchCheckFill } from "react-icons/bs";
import CustomButton from "@/components/CustomButton";

export default function Inspire() {
  const afterBootcampGoals = [
    {
      name: "certified",
      component: (
        <span>
          Be certified as Youth Facilitators by{" "}
          <Link href="https://aisingapore.org/" target="_blank">
            AI Singapore
          </Link>
        </span>
      ),
    },
    {
      name: "lead",
      component: <span>Co-lead and support school talks and workshops</span>,
    },
    {
      name: "deliver",
      component: <span>Deliver engaging sessions to school students</span>,
    },
    {
      name: "facilitation",
      component: <span>Progressively take on full facilitation roles</span>,
    },
  ];

  const afterInspireGoals = [
    {
      name: "realWorld",
      component: (
        <span>
          Gain foundational AI knowledge and understanding of real-world
          applications
        </span>
      ),
    },
    {
      name: "discussions",
      component: (
        <span>
          Participate in open discussions on AI opportunities and challenges
        </span>
      ),
    },
    {
      name: "develop",
      component: (
        <span>Develop awareness of ethics and responsible AI use</span>
      ),
    },
    {
      name: "learning",
      component: (
        <span>Learn how to apply AI effectively in their daily learning</span>
      ),
    },
  ];

  const inspireOutreach = 2000;

  const intervalMs = 3000;
  const bootcampImages = [
    {
      src: "https://zbzfzyaozhjskrizhcsc.supabase.co/storage/v1/object/public/syai-web/gallery/BootcampAISGTeach.jpg",
      alt: "Bootcamp Lecture",
    },
    {
      src: "https://zbzfzyaozhjskrizhcsc.supabase.co/storage/v1/object/public/syai-web/gallery/Bootcamp.jpg",
      alt: "Bootcamp Group Photo",
    },
    {
      src: "https://zbzfzyaozhjskrizhcsc.supabase.co/storage/v1/object/public/syai-web/gallery/BootcampKahoot.jpg",
      alt: "Bootcamp Kahoot",
    },
    {
      src: "https://zbzfzyaozhjskrizhcsc.supabase.co/storage/v1/object/public/syai-web/gallery/BootcampPresentation.jpg",
      alt: "Bootcamp Presentation",
    },
    {
      src: "https://zbzfzyaozhjskrizhcsc.supabase.co/storage/v1/object/public/syai-web/gallery/BootcampPresentation2.jpg",
      alt: "Bootcamp Presentation",
    },
  ];

  const inspireImages = [
    {
      src: "https://zbzfzyaozhjskrizhcsc.supabase.co/storage/v1/object/public/syai-web/gallery/NewTownSharing.jpg",
      alt: "NewTown Sharing",
    },
    {
      src: "https://zbzfzyaozhjskrizhcsc.supabase.co/storage/v1/object/public/syai-web/gallery/NewTownPresentation.jpg",
      alt: "NewTown Presentation",
    },
    {
      src: "https://zbzfzyaozhjskrizhcsc.supabase.co/storage/v1/object/public/syai-web/gallery/NewTownTeam.jpg",
      alt: "NewTown Team",
    },
    {
      src: "https://zbzfzyaozhjskrizhcsc.supabase.co/storage/v1/object/public/syai-web/gallery/SchoolSharing.jpg",
      alt: "NewTown Team",
    },
    {
      src: "https://zbzfzyaozhjskrizhcsc.supabase.co/storage/v1/object/public/syai-web/gallery/cedar1.png",
      alt: "Cedar Girls 1",
    },
    {
      src: "https://zbzfzyaozhjskrizhcsc.supabase.co/storage/v1/object/public/syai-web/gallery/cedar2.png",
      alt: "Cedar Girls 2",
    },
  ];

  return (
    <section id="Inspire" className="flex flex-col items-center justify-center">
      <div className="flex flex-col gap-[30px] items-center w-full">
        <Reveal>
          <h1 className="text-center text-[35px] md:text-[54px] tracking-[-2] md:tracking-[-1.9] leading-[32px] md:leading-[50px]">
            SYAI Inspire
          </h1>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="text-current/60 max-w-3xl leading-[26px]">
            Our flagship education program is funded with $14,300 to develop the
            next generation of AI educators. In collaboration with{" "}
            <Link href="https://aisingapore.org/" target="_blank">
              AI Singapore
            </Link>
            , we run comprehensive bootcamps that prepare pre-university and
            university students to become AI trainers.
          </p>
        </Reveal>

        <Reveal
          delay={0.16}
          className="flex gap-12 md:gap-21 flex-col md:flex-row w-full mt-12"
        >
          <div className="order-2 md:order-1 w-full relative h-full gap-5 p-[10px] rounded-[25px] flex border border-white/10 bg-gradient-to-b from-blue-500/10 to-blue-500/5 backdrop-blur-[5px] shadow-xl">
            <BlueHighlighter />
            <InspireCarousel
              images={bootcampImages}
              intervalMs={intervalMs}
              className="w-full max-w-3xl"
            />
          </div>
          <div className="order-1 md:order-2 flex flex-col w-full gap-[30px]">
            <h2 className="text-3xl md:text-4xl font-normal text-left">
              AI Bootcamps
            </h2>
            <p className="text-current/60 max-w-3xl leading-[26px]">
              Our AI Bootcamps, supported by{" "}
              <Link href="https://aisingapore.org/" target="_blank">
                AI Singapore
              </Link>
              , is an intensive training and certification programme that equips
              our youth volunteers with strong AI fundamentals, real-world AI
              applications, responsible AI and ethics, engagement tactics,
              facilitation methods, and public speaking confidence. Volunteers
              are then empowered to deliver accurate, interactive, and
              high-impact talks and workshops for school students.
            </p>
            <div className="flex flex-col text-current/60 gap-3">
              <p>After the bootcamp, volunteers will:</p>
              <ul className="space-y-2">
                {afterBootcampGoals.map((e) => {
                  return (
                    <li
                      className="flex items-start gap-2"
                      key={`bootcampGoals-${e.name}`}
                    >
                      <BsPatchCheckFill
                        className="mt-0.5 shrink-0 text-xl"
                        aria-hidden="true"
                        fill={"white"}
                      />
                      {e.component}
                    </li>
                  );
                })}
              </ul>
            </div>
            <CustomButton asChild className="w-fit">
              <Link href="/signup/subcommittee" target="_blank">
                Sign up for Bootcamps!
              </Link>
            </CustomButton>
          </div>
        </Reveal>

        <Reveal
          delay={0.24}
          className="flex gap-12 md:gap-21 flex-col md:flex-row w-full mt-12"
        >
          <div className="order-2 md:order-2 w-full relative h-full gap-5 p-[10px] rounded-[25px] flex border border-white/10 bg-gradient-to-b from-blue-500/10 to-blue-500/5 backdrop-blur-[5px] shadow-xl">
            <BlueHighlighter />
            <InspireCarousel
              images={inspireImages}
              intervalMs={intervalMs}
              className="w-full max-w-3xl"
            />
          </div>
          <div className="order-1 md:order-1 flex flex-col w-full gap-[30px]">
            <h2 className="text-3xl md:text-4xl font-normal text-left">
              School Talks/Workshops
            </h2>
            <p className="text-current/60 max-w-3xl leading-[26px]">
              We engage school students through youth-led sessions that build
              foundational AI knowledge, encourage open discussions, and
              strengthen awareness of ethics and responsible AI use, enabling
              students to apply AI more effectively to boost productivity and
              learning.
            </p>
            <p className="text-current/60 max-w-3xl leading-[26px]">
              To date, we have reached {inspireOutreach}+ students across
              schools in Singapore through our talks and workshops.
            </p>
            <div className="flex flex-col text-current/60 gap-3">
              <p>Students will:</p>
              <ul className="space-y-2">
                {afterInspireGoals.map((e) => {
                  return (
                    <li
                      className="flex items-start gap-2"
                      key={`inspireGoals-${e.name}`}
                    >
                      <BsPatchCheckFill
                        className="mt-0.5 shrink-0 text-xl"
                        aria-hidden="true"
                        fill={"white"}
                      />
                      {e.component}
                    </li>
                  );
                })}
              </ul>
            </div>
            <CustomButton asChild className="w-fit">
              <Link
                href={"mailto:inspire@sgyouthai.org?subject=Connect With Us"}
              >
                Reach Out to Inspire
              </Link>
            </CustomButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
