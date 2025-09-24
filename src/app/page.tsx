import Navbar from "@/components/nav/Navbar";
import Image from "next/image";

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
            className="blur-lg absolute -z-50 -translate-x-1/2 inset-x-1/2 -inset-y-3/4 w-[2353px] h-[1969px] object-cover max-w-[unset]"
            width={256}
            height={214}
          />
        </section>
      </main>
    </div>
  );
}
