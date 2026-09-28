# NumNum Stays

The website for [NumNum Stays](https://numnumstays.com): seven cosy, colourful short-stay apartments in Saket, South Delhi. Built with Next.js 16 (App Router), React 19 and Tailwind CSS 4, and deployed on Vercel.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Home: hero with the door-number picker, all stays, good-to-know facts, how to book, contact and map |
| `/stays` | All stays, grouped into 3 BHK homes, smaller places and budget stays |
| `/stays/[slug]` | One stay: photo mosaic, facts, highlights, notes, map, every photo in a lightbox, booking links |
| `/about` | About NumNum Stays, plus a table of all seven stays |
| `/terms` | Terms & conditions, check-in and checkout times |

Old URLs from the previous site (`/room1` to `/room7`, `/about.html`, `/terms.html`) redirect permanently to their new pages. See `next.config.ts`.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint
npm run typecheck
```

Requires Node.js 20.9 or later.

## Editing content

Everything a guest reads lives in `src/data/`:

- **`site.ts`**: phone numbers, WhatsApp number, email, Instagram, address, map location, check-in and checkout times.
- **`stays.ts`**: one entry per stay, with door number, name, type, guests, beds, floor, parking, highlights, notes and the Airbnb link. `featured` picks the five photos (by number) shown at the top of the stay's page.

### Photos

Each stay's photos live in `public/stays/<slug>/` and are named `01.webp`, `02.webp` and so on. Photos appear in filename order, and `01` is the cover.

After adding, removing or reordering photos, run:

```bash
npm run photos
```

This regenerates `src/data/photos.generated.ts` with each photo's size and a small blurred preview shown while it loads.

### Adding a stay

1. Add its photos to `public/stays/<new-slug>/`.
2. Add an entry to `stays` in `src/data/stays.ts`. Its `group` picks the section it's listed under: `"homes"` (3 BHK homes), `"compact"` (studios, rooms and 1 BHKs) or `"budget"` (budget stays). The Budget stays section only appears once it has at least one stay.
3. Run `npm run photos`.
4. Add a 1200 × 630 share image at `public/og/<new-slug>.jpg`. It's used when the link is shared on WhatsApp or social media.

## Project layout

```
src/
  app/            routes, metadata, sitemap, robots, icons
  components/     UI: header, footer, hero picker, gallery + lightbox, stay cards, booking panel
  data/           site info, stays, generated photo manifest
  lib/            small helpers (class names, metadata, reduced-motion hook)
public/
  stays/          stay photos
  og/             link-preview images
  media/          the night-in video loop and its poster
scripts/
  generate-photos.mjs
```

## Deployment

Pushing to `main` deploys to production on Vercel. Pull requests get preview deployments.

To use the custom domain, add `numnumstays.com` under **Vercel → Project → Settings → Domains** and update the DNS records it shows you (the domain currently points at Netlify). The site picks up its public URL automatically from Vercel. To override it, set `NEXT_PUBLIC_SITE_URL`.
