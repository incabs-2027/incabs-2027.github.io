import { conference } from "@/lib/conference";

// The distributed Call for Papers document. This site hosts the only copy;
// the GYST-AI site links to this URL rather than keeping its own, so the two
// sites can never drift out of sync.
//
// The file size is shown next to the link on purpose. A good part of this
// audience is on metered mobile data, where an unannounced 2 MB download is a
// real cost, not a rounding error.

type DownloadCFPProps = {
  /** "primary" is the gold prestige button, "secondary" is a bordered link. */
  variant?: "primary" | "secondary";
};

const variantStyles = {
  primary:
    "bg-[var(--color-gold)] text-[var(--color-ink)] hover:bg-[#ff8a3d]",
  secondary:
    "border border-[var(--color-border)] bg-[var(--color-paper-raised)] text-[var(--color-brand)] hover:border-[var(--color-brand)]",
} as const;

export function DownloadCFP({ variant = "primary" }: DownloadCFPProps) {
  const doc = conference.cfpDocument;
  if (!doc.url) return null;

  return (
    <a
      href={doc.url}
      download
      className={`inline-flex items-center gap-2.5 rounded-md px-5 py-3 text-sm font-bold ${variantStyles[variant]}`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        className="h-4 w-4 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 1.5v8.5" />
        <path d="M4.5 7L8 10.5 11.5 7" />
        <path d="M2 12.5v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-1" />
      </svg>
      Download the Call for Papers
      {doc.fileSizeLabel && (
        <span className="font-semibold opacity-70">
          ({doc.fileSizeLabel})
        </span>
      )}
    </a>
  );
}
