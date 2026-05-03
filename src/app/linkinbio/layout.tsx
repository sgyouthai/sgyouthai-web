import { currentYear } from "@/app/const";

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
