import { currentYear } from "@/app/const";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Official Links",
  description:
    "Find Singapore Youth AI's official community, event, program, and social links.",
  alternates: {
    canonical: "/linkinbio",
  },
  openGraph: {
    url: "/linkinbio",
    title: "Singapore Youth AI Official Links",
    description:
      "Find Singapore Youth AI's official community, event, program, and social links.",
  },
};

export default function LinkInBioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <div className="text-center text-sm mt-auto py-4">
        &copy; {currentYear} Singapore Youth AI
      </div>
    </>
  );
}
