import type { MetadataRoute } from "next";

const siteUrl = "https://sgyouthai.org";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/programs`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/linkinbio`,
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];
}
