import AIMM from "@/components/programs/AIMM/AIMM";
import Inspire from "@/components/programs/Inspire/Inspire";
import Labs from "@/components/programs/Labs/Labs";
import GradientSeparator from "@/components/GradientSeparator";

export default function Programs() {
  return (
    <div className="fullHeight flex flex-col overflow-x-clip overflow-y-visible max-w-screen mb-[120px]">
      <main className="relative flex flex-1 flex-col max-w-7xl mx-auto w-full px-7 md:px-10 md:py-24 py-17.5">
        <AIMM />
        <GradientSeparator />
        <Inspire />
        <GradientSeparator />
        <Labs />
      </main>
    </div>
  );
}
