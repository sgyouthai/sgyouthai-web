import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, type LucideIcon } from "lucide-react";

export type LabsPhase = {
  day: string;
  title: string;
  description: string;
  steps: string[];
  highlights: string[];
  icon: LucideIcon;
};

export default function LabsPhaseCard({ phase }: { phase: LabsPhase }) {
  const Icon = phase.icon;

  return (
    <Card
      className={`h-full gap-0 overflow-hidden rounded-[25px] border-white/10 bg-gradient-to-b from-blue-500/15 to-blue-500/5 py-0 shadow-xl backdrop-blur-[5px]`}
    >
      <CardHeader className="gap-5 px-6 py-6">
        <div className="flex items-center justify-between gap-4">
          <span className="rounded-full border border-blue-400/25 bg-blue-500/15 px-3 py-1 text-xs font-medium tracking-[0.14em] text-blue-200 uppercase">
            {phase.day}
          </span>
          <span className="flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-blue-300">
            <Icon className="size-5" aria-hidden="true" />
          </span>
        </div>
        <div className="space-y-2">
          <CardTitle className="text-2xl text-white md:text-3xl">
            {phase.title}
          </CardTitle>
          <CardDescription className="text-sm leading-6 text-white/55">
            {phase.description}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-6 border-t border-white/10 px-6 py-6">
        <div className="h-[125px]">
          <p className="mb-3 text-xs font-medium tracking-[0.14em] text-white/45 uppercase">
            What you&apos;ll do
          </p>
          <ul className="space-y-3">
            {phase.steps.map((step) => (
              <li
                key={step}
                className="flex items-start gap-3 text-sm leading-6 text-white/80"
              >
                <span className="mt-1 flex size-4 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-blue-300">
                  <Check className="size-3" aria-hidden="true" />
                </span>
                {step}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto mb-auto rounded-2xl border border-white/10 bg-black/25 p-4">
          <p className="mb-2 text-xs font-medium tracking-[0.14em] text-blue-200 uppercase">
            Highlights
          </p>
          <ul className="space-y-2 text-sm leading-6 text-white/60">
            {phase.highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-2">
                <span className="mt-[10px] size-1 shrink-0 rounded-full bg-blue-300" />
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
