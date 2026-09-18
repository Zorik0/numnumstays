import { mapEmbedUrl } from "@/data/site";
import { cn } from "@/lib/cn";

export function MapEmbed({ className }: { className?: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded-xl border border-line bg-lilac", className)}>
      <iframe
        title="Map of NumNum Stays on IGNOU Road, Saidulajab, near Saket"
        src={mapEmbedUrl}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="absolute inset-0 size-full border-0"
      />
    </div>
  );
}
