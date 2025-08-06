"use client";

import Link from "next/link";
import { api } from "@/app/providers";

export default function HomePage() {
  const { data: session } = api.auth.getSession.useQuery();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to tRPC + Supabase Blog
      </h1>

      <nav className="flex gap-4 mb-8">
        <Link href="/posts" className="text-blue-500 hover:underline">
          View Posts
        </Link>
        {session ? (
          <>
            <Link href="/dashboard" className="text-blue-500 hover:underline">
              Dashboard
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/auth/sign-in"
              className="text-blue-500 hover:underline"
            >
              Sign In
            </Link>
            <Link
              href="/auth/sign-up"
              className="text-blue-500 hover:underline"
            >
              Sign Up
            </Link>
          </>
        )}
      </nav>

      <div className="prose">
        <p>This is a full-stack application built with:</p>
        <ul>
          <li>Next.js 14 (App Router)</li>
          <li>tRPC v11</li>
          <li>Supabase (Auth & Database)</li>
          <li>TypeScript</li>
          <li>Tailwind CSS</li>
        </ul>
      </div>
    </div>
  );
}
