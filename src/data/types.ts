export type Photo = {
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
};

export type StayGroup = "homes" | "compact" | "budget";

export type Stay = {
  slug: string;
  /** The number on the door plate, e.g. "2001". */
  unit: string;
  name: string;
  /** Short type label shown on tags, e.g. "3 BHK". */
  type: "3 BHK" | "1 BHK" | "Studio" | "Room";
  group: StayGroup;
  /** One line for cards: what the place feels like. */
  tagline: string;
  /** A paragraph for the stay page, describing what's in the photos. */
  description: string;
  guests: number;
  bedrooms: string;
  beds: string;
  bathrooms: string;
  floor: string;
  parking: string;
  highlights: string[];
  /** Stay-specific notes a guest should know before booking. */
  notes: string[];
  airbnbUrl: string;
  /** Photo numbers (1-based) used for the mosaic at the top of the stay page. */
  featured: number[];
  /** Old URLs from the previous site, redirected to this stay. */
  legacyPaths: string[];
};
