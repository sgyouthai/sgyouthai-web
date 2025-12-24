"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { api } from "@/app/providers";

export default function LinkCodePage() {
  const params = useParams<{ eventName: string }>();
  const code = params?.eventName;

  const { data, isLoading, isError, error } = api.shortLinks.getByCode.useQuery(
    { code: code ?? "" },
    {
      enabled: !!code,
      staleTime: 60_000,
      gcTime: 10 * 60_000,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (!data?.long_url) return;
    // Use replace so back button doesn't bounce back to /link/code
    window.location.replace(data.long_url);
  }, [data?.long_url]);

  if (isLoading || !code) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-6">
        <div className="text-lg font-semibold">Redirecting…</div>
        <div className="mt-2 text-sm text-gray-600">Loading link…</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-6">
        <div className="text-lg font-semibold">Link not found</div>
        <div className="text-sm text-gray-600">
          {error?.message ?? "This short link doesn't exist."}
        </div>
      </div>
    );
  }

  // data exists but redirect hasn't happened yet (very brief)
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <div>
        <div className="text-lg font-semibold">Redirecting…</div>
        <div className="text-sm text-gray-600 break-words">
          {data?.og_title ?? "Opening link"}
        </div>

        {data?.og_image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={data.og_image}
            alt={data.og_title ?? "Preview"}
            className="w-full rounded-lg border"
          />
        ) : null}

        {data?.og_desc ? (
          <p className="text-sm text-gray-700">{data.og_desc}</p>
        ) : null}

        <div className="text-xs text-gray-500 break-all">
          <span className="font-medium">Destination:</span> {data?.long_url}
        </div>

        <a
          href={data?.long_url}
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
        >
          Continue now
        </a>
      </div>
    </div>
  );
}
