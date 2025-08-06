import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { TRPCReactProvider } from "./providers";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "tRPC + Supabase App",
  description: "Built with Next.js App Router",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TRPCReactProvider>
          {children}
          <Toaster richColors />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
