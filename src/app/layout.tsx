import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { conference } from "@/lib/conference";
import { buildEventJsonLd, SITE_URL } from "@/lib/eventSchema";

const title = `${conference.acronym} ${conference.year} | ${conference.name}`;
const description = `${conference.name}, hosted by ${conference.hostOrg.name}. An academic research conference for high school students worldwide.`;
// The logo is a real asset, not a fabricated preview card — a proper
// 1200x630 social image would be a good follow-up design task.
const socialImage = {
  url: "/images/incabs-logo.png",
  width: 299,
  height: 320,
  alt: `${conference.acronym} ${conference.year} logo`,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  openGraph: {
    title,
    description,
    url: SITE_URL,
    siteName: `${conference.acronym} ${conference.year}`,
    images: [socialImage],
    type: "website",
  },
  twitter: {
    card: "summary",
    title,
    description,
    images: [socialImage.url],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const eventJsonLd = buildEventJsonLd();

  return (
    <html lang="en" className="h-full">
      <body className="flex min-h-full flex-col">
        {eventJsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(eventJsonLd).replace(/</g, "\\u003c"),
            }}
          />
        )}
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
