import type { Metadata } from "next";
import Link from "next/link";
import { DoorPlate } from "@/components/door-plate";
import { button } from "@/components/ui";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[70vh] flex-col items-start justify-center py-20">
      <DoorPlate unit="404" size="lg" />
      <h1 className="mt-8 text-title font-bold uppercase">Wrong door</h1>
      <p className="mt-6 max-w-lg text-lead text-muted">
        There&apos;s no page at this address. If you followed an old link, the page may have moved when the site
        was rebuilt.
      </p>
      <div className="mt-9 flex flex-wrap gap-3">
        <Link href="/stays" className={button.ink}>
          See all stays
        </Link>
        <Link href="/" className={button.outline}>
          Go to the home page
        </Link>
      </div>
    </div>
  );
}
