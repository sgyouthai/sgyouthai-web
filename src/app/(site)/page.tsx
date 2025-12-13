import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Team from "@/components/home/Team";
import Partners from "@/components/home/Partners";
import EventGallery from "@/components/home/EventGallery";
import GradientSeparator from "@/components/home/GradientSeparator";

export default function HomePage() {
  return (
    <div className="fullHeight flex flex-col overflow-x-clip overflow-y-visible max-w-screen mb-[120px]">
      <main className="relative flex flex-1 flex-col max-w-7xl mx-auto w-full px-7 md:px-10 ">
        <Hero />
        <GradientSeparator />
        <About />
        <GradientSeparator />

        <Team />
        <GradientSeparator />

        <Partners />
        <GradientSeparator />

        <EventGallery />
      </main>
    </div>
  );
}
