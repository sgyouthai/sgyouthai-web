import { redirect } from "next/navigation";
import { api } from "@/server/api/server";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const caller = await api();
  const session = await caller.auth.getSession();

  if (!session) {
    redirect("/auth/sign-in");
  }

  return <>{children}</>;
}
