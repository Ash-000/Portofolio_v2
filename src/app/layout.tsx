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
      <body className="min-h-full flex flex-col font-sans">
        <ThemeProvider>
          <I18nProvider>
            <Nav />
            <main className="flex-1">{children}</main>
            <Footer />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
