import Hero from "@/components/home/Hero";
import { Separator } from "@radix-ui/react-separator";

export default function HomePage() {
  return (
    <div className="fullHeight flex flex-col overflow-x-clip overflow-y-visible max-w-screen">
      <main className="relative flex flex-1 flex-col max-w-7xl mx-auto w-full">
        <Hero />
        <Separator
          className="h-[1px] my-24 mx-auto w-full"
          style={{
            background:
              "linear-gradient(270deg, var(--token-4ba9d2af-bbc9-422d-912b-c0d857289d96, rgba(255, 255, 255, 0)) 0%, var(--token-4ef09f89-9c35-4972-a9c1-8efc95820553, rgba(255, 255, 255, .2)) 50%, var(--token-4ba9d2af-bbc9-422d-912b-c0d857289d96, rgba(255, 255, 255, 0)) 100%)",
          }}
        />
        <section>
          <h1>Our story</h1>
          <h2>Building Stronger Brands Creating Impressions!</h2>
        </section>
      </main>
    </div>
  );
}
