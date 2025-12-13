export default function LinkInBioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <div className="text-center text-sm mt-auto py-4">
        &copy; 2025 Singapore Youth AI
      </div>
    </>
  );
}
