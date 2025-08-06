"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const description = searchParams.get("description");

  return (
    <div className="container mx-auto p-8 text-center">
      <h1 className="text-2xl font-bold mb-4 text-red-600">
        Authentication Error
      </h1>

      {error && (
        <div className="mb-4">
          <p className="font-semibold">{error}</p>
          {description && <p className="text-gray-600">{description}</p>}
        </div>
      )}

      <p className="text-gray-600 mb-4">
        There was a problem confirming your email. This could happen if:
      </p>

      <ul className="text-left inline-block mb-6">
        <li>• The confirmation link has expired</li>
        <li>• The link has already been used</li>
        <li>• The link is invalid</li>
      </ul>

      <div className="flex gap-4 justify-center">
        <Link href="/auth/sign-up" className="text-blue-500 hover:underline">
          Try signing up again
        </Link>
        <Link href="/" className="text-blue-500 hover:underline">
          Go home
        </Link>
      </div>
    </div>
  );
}
