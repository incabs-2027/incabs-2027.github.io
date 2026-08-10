import type { ReactNode } from "react";

type CalloutVariant = "info" | "reassurance" | "disclaimer";

const variantStyles: Record<CalloutVariant, string> = {
  info: "bg-[var(--color-paper-raised)] border-l-[var(--color-border)]",
  reassurance:
    "bg-[var(--color-reassurance)] border-l-[var(--color-reassurance-border)]",
  disclaimer: "bg-[var(--color-paper-raised)] border-l-[var(--color-brand)]",
};

type CalloutProps = {
  variant: CalloutVariant;
  title?: string;
  children: ReactNode;
};

export function Callout({ variant, title, children }: CalloutProps) {
  return (
    <aside
      role="note"
      className={`rounded-lg border-l-4 p-4 shadow-sm sm:p-5 ${variantStyles[variant]}`}
    >
      {title && (
        <p className="mb-2 text-lg font-bold tracking-tight text-[var(--color-ink)]">
          {title}
        </p>
      )}
      <div className="space-y-2 text-[var(--color-ink)] [&_a]:font-semibold [&_a]:text-[var(--color-brand)] [&_a]:underline [&_a]:underline-offset-2">
        {children}
      </div>
    </aside>
  );
}
