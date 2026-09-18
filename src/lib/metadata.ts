import type { Metadata } from "next";
import { site } from "@/data/site";

type PageMetadataInput = {
  /** Page title without the site name. Omit for the home page. */
  title?: string;
  description: string;
  path: string;
  image?: { url: string; alt: string };
};

const defaultImage = {
  url: "/og/home.jpg",
  alt: "The NumNum Stays logo next to photos of four of the stays",
};

export function pageMetadata({ title, description, path, image = defaultImage }: PageMetadataInput): Metadata {
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} | Cosy, colourful stays in Saket, South Delhi`;
  const images = [{ url: image.url, width: 1200, height: 630, alt: image.alt }];

  return {
    title: title ?? { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: site.name,
      title: fullTitle,
      description,
      url: path,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images,
    },
  };
}
