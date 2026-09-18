import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/site";
import { coverPhoto, stayPath, stays } from "@/data/stays";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = siteUrl();
  const lastModified = new Date();

  return [
    { url, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${url}/stays`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    ...stays.map((stay) => ({
      url: `${url}${stayPath(stay)}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: [`${url}${coverPhoto(stay.slug).src}`],
    })),
    { url: `${url}/about`, lastModified, changeFrequency: "yearly", priority: 0.5 },
    { url: `${url}/terms`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
