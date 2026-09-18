export const site = {
  name: "NumNum Stays",
  tagline: "Luxury & cosy stays in Saket, South Delhi.",
  description:
    "Seven colourful, individually designed studios, 1 BHKs and 3 BHK homes in Saket, South Delhi, a 5–7 minute drive from Saket Metro. Book direct on WhatsApp or through Airbnb.",
  area: "Saket, South Delhi",
  phones: [
    { display: "+91 93100 68010", tel: "+919310068010" },
    { display: "+91 98739 19584", tel: "+919873919584" },
  ],
  whatsappNumber: "919310068010",
  email: "numnumstays@gmail.com",
  instagram: {
    handle: "bnbgirlekta",
    url: "https://www.instagram.com/bnbgirlekta/",
  },
  address: {
    street: "C 2/12, IGNOU Road, Saidulajab",
    locality: "New Delhi",
    region: "Delhi",
    postalCode: "110030",
    country: "India",
    countryCode: "IN",
  },
  geo: { lat: 28.516348, lng: 77.205869 },
  checkIn: "1:00 pm",
  checkOut: "10:00 am",
} as const;

export const primaryPhone = site.phones[0];

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const bookingMessage = "Hi! I'd like to book a stay at NumNum Stays.";

export function stayBookingMessage(name: string, unit: string) {
  return `Hi! I'd like to book ${name} (${unit}) at NumNum Stays.\nDates: \nNumber of guests: `;
}

export const emailLink = `mailto:${site.email}?subject=${encodeURIComponent(
  "Booking enquiry",
)}&body=${encodeURIComponent("Hi, I want to know more about your property.")}`;

export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${site.geo.lat},${site.geo.lng}`;

export const mapEmbedUrl = `https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1s${site.geo.lat},${site.geo.lng}!6i16`;

export const fullAddress = `${site.address.street}, ${site.address.locality}, ${site.address.region} ${site.address.postalCode}`;

export function siteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
}
