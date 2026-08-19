import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider } from "@/lib/i18n";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Developer Portfolio",
    template: "%s - Developer Portfolio",
  },
  description:
    "Fullstack developer yang membangun aplikasi web modern dengan fokus pada performa, UX yang intuitif, dan kode yang bersih.",
  keywords: ["developer", "portfolio", "fullstack", "react", "next.js", "typescript"],
  authors: [{ name: "Developer" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    title: "Developer Portfolio",
    description:
      "Fullstack developer yang membangun aplikasi web modern dengan fokus pada performa dan UX.",
    siteName: "Developer Portfolio",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-full focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent"
        >
          Skip to main content
        </a>
        <ThemeProvider>
          <I18nProvider>
            <Nav />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
