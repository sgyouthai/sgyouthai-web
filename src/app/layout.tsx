import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "@/styles/globals.css";
import { TRPCReactProvider } from "./providers";
import { Toaster } from "sonner";
import { PostHogProvider } from "@/components/providers/posthog-provider";
import Script from "next/script";
import { totalMembers } from "./const";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AOSProvider from "@/components/providers/aos-provider";

const dm_sans = DM_Sans({ subsets: ["latin"] });

const siteUrl = "https://sgyouthai.org";
const ogImage = `${siteUrl}/SYAI_Logo_White.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "SYAI — Singapore Youth AI | Singapore's Premier Youth AI Community",
    template: "%s | SYAI",
  },
  description: `Singapore Youth AI (SYAI) is Singapore's leading youth-focused AI community. Join ${totalMembers}+ students from polytechnics and junior colleges passionate about AI innovation, education, and technology.`,
  keywords: [
    "Singapore Youth AI",
    "SYAI",
    "Singapore AI community",
    "youth AI Singapore",
    "artificial intelligence Singapore",
    "AI education",
    "polytechnic AI",
    "junior college AI",
    "AI meetups Singapore",
    "AI bootcamps Singapore",
  ],
  authors: [{ name: "Singapore Youth AI" }],
  creator: "Singapore Youth AI",
  publisher: "Singapore Youth AI",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Singapore Youth AI",
    title: "SYAI — Singapore Youth AI | Singapore's Premier Youth AI Community",
    description: `Join Singapore's leading youth AI community with ${totalMembers}+ members from polytechnics and JCs. Explore AI education, meetups, and innovation opportunities.`,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Singapore Youth AI Logo",
      },
    ],
    locale: "en_SG",
  },
  twitter: {
    card: "summary_large_image",
    title: "SYAI — Singapore Youth AI",
    description: `Join Singapore's leading youth AI community with ${totalMembers}+ members.`,
    images: [ogImage],
    site: "@sgyouthai", // if you have one
    creator: "@sgyouthai", // if you have one
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  applicationName: "Singapore Youth AI",
  category: "Technology",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  // manifest: "/site.webmanifest",
  // themeColor: [
  //   { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  //   { media: "(prefers-color-scheme: dark)", color: "#0b0b0f" },
  // ],
  // formatDetection: { email: false, address: false, telephone: false },
  // verification: {
  //   // google: "paste-your-google-search-console-code",
  // },
};

function OrganizationJsonLd() {
  const json = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Singapore Youth AI",
    alternateName: "SYAI",
    url: siteUrl,
    logo: `${siteUrl}/SYAI_Logo_White.png`,
    description: `Singapore's premier youth-focused AI community connecting ${totalMembers}+ students from polytechnics and junior colleges passionate about AI innovation and education.`,
    foundingDate: "2023-01-01",
    address: {
      "@type": "PostalAddress",
      addressCountry: "SG",
      addressRegion: "Singapore",
    },
    sameAs: [
      "https://www.instagram.com/sgyouthai/",
      "https://www.linkedin.com/company/sgyouthai",
      "https://t.me/sgyouthai",
      "https://discord.gg/TacK5vbeDc",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "General",
        email: "hello@sgyouthai.org",
        areaServed: "SG",
        availableLanguage: ["en"],
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

function WebSiteJsonLd() {
  // Adds SearchAction so Google can show a site links search box
  const json = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Singapore Youth AI",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <body
        className={`${dm_sans.className} antialiased fullHeight flex flex-col overscroll-x-auto dark bg-[#000100]`}
      >
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', { anonymize_ip: true });
              `}
            </Script>
          </>
        )}

        <PostHogProvider>
          <TRPCReactProvider>
            <AOSProvider>
              <Navbar />
              {children}
              <Footer />
            </AOSProvider>
            <Toaster richColors />
          </TRPCReactProvider>
        </PostHogProvider>

        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
