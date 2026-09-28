import { photosBySlug } from "./photos.generated";
import type { Photo, Stay, StayGroup } from "./types";

// Listed in door-number order, the way the previous site listed them.
export const stays: Stay[] = [
  {
    slug: "ample-house",
    unit: "2001",
    name: "Ample House",
    type: "3 BHK",
    group: "homes",
    tagline: "Three bedrooms, a big dining table and a turfed balcony. Sleeps up to 10.",
    description:
      "A private three-bedroom apartment made for get-togethers. Purple cove lights run across the living and dining area, the bedrooms are done in coral, green and white, and there's a large separate kitchen and a balcony laid with turf.",
    guests: 10,
    bedrooms: "3 bedrooms",
    beds: "3 beds + 2 extra mattresses",
    bathrooms: "2 bathrooms",
    floor: "2nd floor, no lift",
    parking: "Parking for 1 car",
    highlights: [
      "Private 3 BHK with a spacious living and dining area",
      "Large, separate kitchen",
      "AC in both master bedrooms and the hall",
      "2 extra mattresses and extra pillows for bigger groups",
      "Balcony for fresh air",
      "Parking for 1 car",
      "Luggage drop-off before check-in or after checkout",
      "Highly photogenic space",
    ],
    notes: [
      "It's on the 2nd floor and there's no lift.",
      "The smaller bedroom doesn't have AC.",
    ],
    airbnbUrl: "https://www.airbnb.co.in/rooms/1671909041436262490",
    featured: [1, 7, 10, 15, 22],
    legacyPaths: ["/room1", "/room1.html"],
  },
  {
    slug: "wonk-studio",
    unit: "2002",
    name: "Wonk Studio",
    type: "Studio",
    group: "compact",
    tagline: "Lavender walls, a mustard sofa-cum-bed and a neon heart. Sleeps up to 4.",
    description:
      "An open-plan studio in lavender and mustard, with a zebra-print rug, a patch of turf underfoot and a pink neon heart above the kitchenette. Two guests sleep on the bed and two more on the sofa-cum-bed.",
    guests: 4,
    bedrooms: "Studio",
    beds: "1 bed + sofa-cum-bed",
    bathrooms: "1 bathroom",
    floor: "2nd floor, no lift",
    parking: "Bike parking only",
    highlights: [
      "Beautiful studio flat, great for photos",
      "Couple friendly",
      "Kitchenette with microwave, kettle and fridge",
      "43-inch TV",
      "Partial power backup",
      "Self check-in",
    ],
    notes: [
      "It's on the 2nd floor and there's no lift.",
      "No car parking. There's space for 1 bike.",
    ],
    airbnbUrl: "https://www.airbnb.co.in/rooms/1674621585516649825",
    featured: [1, 2, 6, 14, 12],
    legacyPaths: ["/room2", "/room2.html"],
  },
  {
    slug: "jolly-house",
    unit: "3001",
    name: "Jolly House",
    type: "3 BHK",
    group: "homes",
    tagline: "A neon sign, pink and mustard bedrooms and a long dining table. Sleeps up to 10.",
    description:
      "A private three-bedroom apartment built around a pink neon sign that reads “This must be the place”. There's an orange sofa and a long dining table in the living room, pink, mustard and white bedrooms, a teal modular kitchen and a balcony laid with turf.",
    guests: 10,
    bedrooms: "3 bedrooms",
    beds: "3 beds + 2 extra mattresses",
    bathrooms: "2 bathrooms",
    floor: "3rd floor, no lift",
    parking: "Parking for 1 car",
    highlights: [
      "Private 3 BHK with a spacious living and dining area",
      "Large, separate kitchen",
      "AC in both master bedrooms and the hall",
      "2 extra mattresses and extra pillows for bigger groups",
      "Balcony for fresh air",
      "Partial power backup",
      "Parking for 1 car",
      "Luggage drop-off before check-in or after checkout",
    ],
    notes: [
      "It's on the 3rd floor and there's no lift.",
      "The smaller bedroom doesn't have AC.",
    ],
    airbnbUrl: "https://www.airbnb.co.in/rooms/1672361436573703946",
    featured: [1, 3, 9, 15, 24],
    legacyPaths: ["/room3", "/room3.html"],
  },
  {
    slug: "snug-studio",
    unit: "3002",
    name: "Snug Studio",
    type: "Studio",
    group: "compact",
    tagline: "A sky-blue studio with a sunburst rug and a sofa lounge, for two.",
    description:
      "A bright studio room with a sky-blue feature wall, a sunburst rug and a sofa lounge around a glass-topped coffee table. The kitchenette corner has a microwave, kettle and fridge.",
    guests: 2,
    bedrooms: "Studio",
    beds: "1 bed",
    bathrooms: "1 bathroom",
    floor: "3rd floor, no lift",
    parking: "Bike parking only",
    highlights: [
      "Cosy, private studio room",
      "Microwave, kettle and fridge",
      "Partial power backup",
      "Luggage drop-off available",
      "Highly photogenic space",
    ],
    notes: [
      "It's on the 3rd floor and there's no lift.",
      "No car parking. There's space for 1 bike.",
      "Quiet hours start at 10 pm.",
      "The door has a physical lock, so carry the keys when you step out. At checkout, pull the door shut and it locks itself.",
    ],
    airbnbUrl: "https://www.airbnb.co.in/rooms/1672460476793968868",
    featured: [1, 13, 5, 14, 17],
    legacyPaths: ["/room4", "/room4.html"],
  },
  {
    slug: "comfy-pod",
    unit: "G001",
    name: "Comfy Pod",
    type: "Room",
    group: "compact",
    tagline: "A compact ground-floor room for two, with self check-in.",
    description:
      "A 10 × 10 ft room with a double bed, a warm geometric feature wall, a small kitchen corner and its own bathroom. It's on the ground floor, so there are no stairs, and you check yourself in.",
    guests: 2,
    bedrooms: "1 room",
    beds: "1 double bed",
    bathrooms: "1 bathroom",
    floor: "Ground floor",
    parking: "No car parking",
    highlights: [
      "Private room with its own bathroom",
      "Small kitchen with microwave, kettle and fridge",
      "AC, geyser and smart TV",
      "Self check-in",
      "Couple friendly",
      "On the ground floor",
    ],
    notes: [
      "The kitchen has appliances only. There's no stove for cooking.",
      "No car parking.",
    ],
    airbnbUrl: "https://www.airbnb.co.in/rooms/1672366547504021419",
    featured: [1, 4, 2, 5, 3],
    legacyPaths: ["/room5", "/room5.html"],
  },
  {
    slug: "chillax-pod",
    unit: "G002",
    name: "Chillax Pod",
    type: "1 BHK",
    group: "compact",
    tagline: "A complete ground-floor 1 BHK with film posters and warm lights.",
    description:
      "A complete 1 BHK on the ground floor, all to yourselves. The lounge has a black sofa, film posters, macramé dreamcatchers and warm string lights, and there's a kitchen and a separate bedroom.",
    guests: 2,
    bedrooms: "1 bedroom",
    beds: "2 beds",
    bathrooms: "1 bathroom",
    floor: "Ground floor",
    parking: "Bike parking only",
    highlights: [
      "Complete 1 BHK, no sharing",
      "Kitchen with induction, microwave, kettle, fridge and cutlery",
      "AC in the bedroom",
      "32-inch smart Fire TV",
      "Couple friendly",
      "On the ground floor",
    ],
    notes: ["No car parking. There's space for bikes."],
    airbnbUrl: "https://www.airbnb.co.in/rooms/1676060044454400810",
    featured: [1, 11, 4, 6, 14],
    legacyPaths: ["/room6", "/room6.html"],
  },
  {
    slug: "light-house",
    unit: "C2",
    name: "Light House",
    type: "1 BHK",
    group: "compact",
    tagline: "A bright, boho 1 BHK with a turfed balcony. Sleeps up to 4.",
    description:
      "A bright, boho 1 BHK with a sofa lounge, a bedroom with a striped accent wall, a kitchen with an induction cooktop and a balcony laid with turf. Saket Metro, Select Citywalk and Max Hospital are 5–10 minutes away.",
    guests: 4,
    bedrooms: "1 bedroom",
    beds: "1 bed",
    bathrooms: "1 bathroom",
    floor: "3rd floor, no lift",
    parking: "No car parking",
    highlights: [
      "Complete 1 BHK flat",
      "Kitchen with cooktop, kettle and fridge",
      "Balcony for fresh air",
      "OTT on the TV",
      "Partial power backup",
      "Self check-in",
      "Cleaning staff visit every morning",
    ],
    notes: [
      "It's on the 3rd floor and there's no lift.",
      "No car parking.",
      "Smoking is allowed on the balcony only.",
      "No parties or decorations, please.",
      "Checkout is strictly on time, as the flat is deep-cleaned after every stay.",
    ],
    airbnbUrl: "https://www.airbnb.co.in/rooms/1435259600683325397",
    featured: [1, 3, 5, 13, 16],
    legacyPaths: ["/room7", "/room7.html"],
  },
];

export const groups: Record<StayGroup, { title: string; intro: string }> = {
  homes: {
    title: "3 BHK homes",
    intro:
      "Three bedrooms, two bathrooms, a full kitchen and parking for one car. Room for up to 10, so bring everyone.",
  },
  compact: {
    title: "Studios, rooms and 1 BHKs",
    intro: "Self-contained places for couples and small groups of up to four.",
  },
  budget: {
    title: "Budget stays",
    intro: "Clean, comfortable places at a lower price.",
  },
};

export function getStay(slug: string) {
  return stays.find((stay) => stay.slug === slug);
}

export function staysIn(group: StayGroup) {
  return stays.filter((stay) => stay.group === group);
}

export function photosFor(slug: string): Photo[] {
  return photosBySlug[slug] ?? [];
}

export function coverPhoto(slug: string): Photo {
  return photosFor(slug)[0];
}

export function stayPath(stay: Pick<Stay, "slug">) {
  return `/stays/${stay.slug}`;
}
