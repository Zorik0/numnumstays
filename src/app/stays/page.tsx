import { StaysDirectory } from "@/components/stays-directory";
import { stayCount } from "@/data/stays";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "All stays",
  description:
    "Two 3 BHK homes for groups of up to 10, studios, rooms and 1 BHKs for couples and small groups, and value stays for two to four. All in Saket, South Delhi.",
  path: "/stays",
});

export default function StaysPage() {
  return (
    <div className="container-page py-14 lg:py-20">
      <div className="max-w-2xl">
        <h1 className="text-title font-bold uppercase">All stays</h1>
        <p className="mt-6 text-lead text-muted">
          All {stayCount} are in Saket, a 5–7 minute drive from Saket Metro Station. Each one is decorated in its own
          way, and all of them are kept very clean and well maintained.
        </p>
      </div>
      <div className="mt-16">
        <StaysDirectory headingLevel="h2" />
      </div>
    </div>
  );
}
