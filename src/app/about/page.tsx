import Image from "next/image";
import Link from "next/link";
import { BrandIcon } from "@/components/brand-icon";
import { DoorPlate } from "@/components/door-plate";
import { button, compactOnPhones } from "@/components/ui";
import { bookingMessage, whatsappLink } from "@/data/site";
import { photosFor, stayCount, stayPath, stays } from "@/data/stays";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "About",
  description: `NumNum Stays offers cosy, stylish and peaceful stays in Saket, South Delhi: ${stayCount} individually designed homes, studios, rooms and 1 BHKs.`,
  path: "/about",
});

// One photo from three different stays, to show how differently each is done.
const collage = [
  { photo: photosFor("wonk-studio")[0], alt: "Wonk Studio's lavender walls and mustard sofa-cum-bed" },
  { photo: photosFor("jolly-house")[0], alt: "The living room at Jolly House, with its pink neon sign" },
  { photo: photosFor("chillax-pod")[0], alt: "The lounge at Chillax Pod, with film posters and warm lights" },
];

export default function AboutPage() {
  return (
    <>
      <section className="container-page grid gap-14 py-14 lg:grid-cols-12 lg:gap-10 lg:py-20">
        <div className="lg:col-span-6">
          <h1 className="text-title font-bold uppercase">About NumNum Stays</h1>
          <p className="mt-8 text-lead">
            NumNum Stays is designed to offer a cosy and luxurious experience for travellers. We focus on comfort, a
            peaceful atmosphere and stylish interiors to make your stay memorable.
          </p>
          <p className="mt-5 text-muted">
            Whether you&apos;re here to relax or on a short getaway, we make sure you have a premium, welcoming
            place to come back to.
          </p>
          <p className="mt-5 text-muted">
            There are {stayCount} stays, all in Saket, South Delhi: two 3 BHK homes for groups, studios, rooms and
            1 BHKs for couples and small groups, and budget 1 BHKs for up to four. No two are decorated alike. One
            is lavender and mustard, one is Santorini blue and white, one is all black under pink neon, and one has
            a neon sign in the living room that reads “This must be the place”.
          </p>
          <div data-booking-cta className="mt-9 flex flex-wrap gap-3">
            <a
              href={whatsappLink(bookingMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(button.primary, compactOnPhones)}
            >
              <BrandIcon name="whatsapp" className="size-5" />
              Book on WhatsApp
            </a>
            <Link href="/stays" className={cn(button.outline, compactOnPhones)}>
              See the stays
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 self-start lg:col-span-6">
          {collage.map(({ photo, alt }, index) => (
            <div
              key={photo.src}
              className={
                index === 0
                  ? "house-frame relative col-span-2 aspect-[16/11] overflow-hidden bg-line"
                  : "relative aspect-[4/3] overflow-hidden rounded-lg bg-line"
              }
            >
              <Image
                src={photo.src}
                alt={alt}
                fill
                sizes={index === 0 ? "(min-width: 1024px) 40rem, 100vw" : "(min-width: 1024px) 20rem, 50vw"}
                placeholder="blur"
                blurDataURL={photo.blurDataURL}
                preload={index === 0}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Like the directory board in a building lobby. */}
      <section aria-labelledby="directory-heading" className="on-ink bg-ink py-16 text-white lg:py-24">
        <div className="container-page">
          <h2 id="directory-heading" className="text-section font-semibold">
            The {stayCount} stays at a glance
          </h2>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[40rem] text-left">
              <thead className="text-sm text-mist">
                <tr className="border-b border-white/10">
                  <th scope="col" className="py-3 pr-4 font-medium">
                    Door
                  </th>
                  <th scope="col" className="py-3 pr-4 font-medium">
                    Stay
                  </th>
                  <th scope="col" className="py-3 pr-4 font-medium">
                    Type
                  </th>
                  <th scope="col" className="py-3 pr-4 font-medium">
                    Sleeps
                  </th>
                  <th scope="col" className="py-3 pr-4 font-medium">
                    Floor
                  </th>
                  <th scope="col" className="py-3 font-medium">
                    Parking
                  </th>
                </tr>
              </thead>
              <tbody>
                {stays.map((stay) => (
                  <tr key={stay.slug} className="border-b border-white/10 transition-colors hover:bg-white/[0.03]">
                    <td className="py-4 pr-4">
                      <DoorPlate unit={stay.unit} className="w-14 bg-ink-raised" />
                    </td>
                    <th scope="row" className="py-4 pr-4 font-semibold">
                      <Link href={stayPath(stay)} className="underline-offset-4 hover:underline">
                        {stay.name}
                      </Link>
                    </th>
                    <td className="py-4 pr-4 text-white/85">{stay.type}</td>
                    <td className="py-4 pr-4 tabular-nums text-white/85">{stay.guests}</td>
                    <td className="py-4 pr-4 text-white/85">{stay.floor}</td>
                    <td className="py-4 text-white/85">{stay.parking}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
