import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  skipTrailingSlashRedirect: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Content-Security-Policy",
            value: `
    default-src 'self';

    script-src 'self' 'unsafe-eval' 'unsafe-inline'
      https://*.posthog.com
      https://us.i.posthog.com
      https://us-assets.i.posthog.com;

    connect-src 'self'
      https://*.posthog.com
      https://us.i.posthog.com
      https://us-assets.i.posthog.com
      https://*.supabase.co
      wss://*.supabase.co
      https://vitals.vercel-insights.com
      https://va.vercel-scripts.com
      https://forms.gle
      https://docs.google.com;

    form-action 'self'
      https://forms.gle
      https://docs.google.com;

    style-src 'self' 'unsafe-inline'
      https://us.i.posthog.com;

    img-src 'self' blob: data:
      https://*.posthog.com
      https://*.googleusercontent.com
      https://ssl.gstatic.com;

    font-src 'self';
    object-src 'none';
    base-uri 'self';
    frame-ancestors 'none';
  `
              .replace(/\s{2,}/g, " ")
              .trim(),
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**.supabase.co" }],
  },
};

export default nextConfig;
