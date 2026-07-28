import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Programs for Youth in Singapore",
  description:
    "Explore Singapore Youth AI programs, including AI Monthly Meetups, SYAI Inspire, and SYAI Labs.",
  alternates: {
    canonical: "/programs",
  },
  openGraph: {
    url: "/programs",
    title: "AI Programs for Youth in Singapore",
    description:
      "Explore AI meetups, education, and hands-on innovation programs from Singapore Youth AI.",
  },
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
