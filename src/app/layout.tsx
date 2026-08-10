import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { conference } from "@/lib/conference";

export const metadata: Metadata = {
  title: `${conference.acronym} ${conference.year} | ${conference.name}`,
  description: `${conference.name}, hosted by ${conference.hostOrg.name}. An academic research conference for high school students worldwide.`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full">
      <body className="flex min-h-full flex-col">
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
