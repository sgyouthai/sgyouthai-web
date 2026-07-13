import { Reveal } from "@/components/motion/Reveal";
import CustomButton from "@/components/CustomButton";
import BlueHighlighter from "@/components/BlueHighlight";
import ImageCarousel from "@/components/ImageCarousel";
import LabsPhaseCard, {
  type LabsPhase,
} from "@/components/programs/Labs/LabsPhaseCard";
import {
  ArrowRight,
  ExternalLink,
  Lightbulb,
  Presentation,
  SearchCheck,
  UserPlus,
} from "lucide-react";
import Link from "next/link";

const phases: LabsPhase[] = [
  {
    day: "Day 1",
    title: "Introduction",
    description: "Turn an open-ended brief into a focused AI research problem.",
    steps: [
      "Understand the research brief",
      "Frame the problem and identify its constraints",
    ],
    highlights: [
      "Formulate problem statements for open-ended AI research challenges.",
      "Work in groups with hands-on guidance from postgraduate mentors.",
    ],
    icon: Lightbulb,
  },
  {
    day: "Days 2 - 4",
    title: "Research",
    description:
      "Build a credible proposal using evidence, collaboration and responsible AI tools.",
    steps: [
      "Gather relevant information",
      "Verify accuracy and source credibility",
      "Evaluate how different sources connect",
    ],
    highlights: [
      "Collaborate with graduate-student mentors on a real-world research project.",
      "Use AI tools for research while identifying and mitigating their risks.",
    ],
    icon: SearchCheck,
  },
  {
    day: "Day 5",
    title: "Presentation",
    description:
      "Turn your findings into a proposal and communicate them with confidence.",
    steps: [
      "Submit your research proposal",
      "Pitch your work live at AI Singapore",
      "Respond to questions from researchers",
    ],
    highlights: [
      "Receive feedback from industry experts and experienced researchers.",
    ],
    icon: Presentation,
  },
];

const labsPhotos = [
  {
    src: "/gallery/syai_labs.jpg",
    alt: "SYAI Labs Jun 2026 batch at AI Singapore",
    title: "SYAI Labs at AI Singapore",
    description:
      "The June 2026 programme team coming together at AI Singapore for a week of guided AI research.",
  },
  {
    src: "/gallery/syai_labs_wip.jpg",
    alt: "SYAI Labs Jun 2026 participants collaborating during a research session",
    title: "Research in progress",
    description:
      "Participants collaborate on research questions, source evaluation and proposal development with support from mentors.",
  },
  // Add more programme photos here after placing them in public/gallery.
  // Example: { src: "/gallery/photo.jpg", alt: "...", title: "...", description: "..." },
];

export default function Labs() {
  return (
    <section id="Labs" className="flex flex-col items-center justify-center">
      <div className="flex w-full flex-col gap-12">
        <div className="flex flex-col items-center gap-[30px]">
          <Reveal>
            <div className="flex flex-col items-center gap-4 text-center">
              <h1 className="text-center text-[35px] leading-[32px] tracking-[-2px] md:text-[54px] md:leading-[50px] md:tracking-[-1.9px]">
                SYAI Labs
              </h1>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex flex-col gap-4">
              <p className="max-w-3xl leading-[26px] text-current/60">
                Our youth-led AI research initiative gives JC, Polytechnic and
                pre-university students early exposure to AI research through
                hands-on programmes, mentorship and real-world problem-solving.
              </p>
              <p className="max-w-3xl leading-[26px] text-current/60">
                In collaboration with{" "}
                <Link href="https://aisingapore.org/" target="_blank">
                  AI Singapore
                </Link>
                , students build practical skills, confidence and curiosity
                while exploring meaningful research opportunities.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:gap-4 h-full">
          {phases.map((phase, index) => (
            <div key={phase.title} className="contents">
              <Reveal delay={0.2 + index * 0.08} className="h-full">
                <LabsPhaseCard phase={phase} />
              </Reveal>
              {index < phases.length - 1 && (
                <Reveal
                  delay={0.26 + index * 0.08}
                  className="hidden items-center justify-center text-blue-400/70 lg:flex"
                >
                  <ArrowRight className="size-8" aria-hidden="true" />
                </Reveal>
              )}
            </div>
          ))}
        </div>

        <Reveal delay={0.08} className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-3 text-center">
            <h2 className="text-3xl tracking-[-1px] md:text-4xl">
              SYAI Labs Highlights
            </h2>
            <p className="max-w-2xl leading-7 text-current/55">
              A closer look at the people, mentorship and collaborative work
              behind the programme.
            </p>
          </div>

          <div className="relative mx-auto flex w-full max-w-3xl gap-5 rounded-[25px] border border-white/10 bg-gradient-to-b from-blue-500/10 to-blue-500/5 p-[10px] shadow-xl backdrop-blur-[5px]">
            <BlueHighlighter />
            <ImageCarousel
              images={labsPhotos}
              intervalMs={3500}
              className="w-full"
            />
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="flex flex-col items-center gap-5 text-center">
            <div className="space-y-2">
              <h2 className="text-2xl tracking-[-0.5px] md:text-3xl">
                Ready to explore AI research?
              </h2>
              <p className="text-current/55">
                Register your interest or learn more about the SYAI Labs
                programme.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <CustomButton asChild className="w-full sm:w-fit">
                <Link
                  href="/link/syai-labs-signup"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Sign up for SYAI Labs
                  <UserPlus className="size-4" aria-hidden="true" />
                </Link>
              </CustomButton>

              <CustomButton
                asChild
                variant="secondary"
                className="w-full sm:w-fit"
              >
                <Link
                  href="https://httyr.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Explore SYAI Labs
                  <ExternalLink className="size-4" aria-hidden="true" />
                </Link>
              </CustomButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
