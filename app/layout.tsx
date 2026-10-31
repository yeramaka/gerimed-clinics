import type { Metadata, Viewport } from "next";
import { Caveat, Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: "500",
  display: "swap",
});

export const metadata: Metadata = {
  applicationName: "GERIMED CLINICS",
  title: {
    default: "GERIMED CLINICS | General, Geriatrics, Lifestyle Care",
    template: "%s | GERIMED CLINICS",
  },
  description:
    "GERIMED CLINICS provides general, geriatrics, and lifestyle-focused healthcare in a warm, trustworthy clinic setting.",
  keywords: [
    "GERIMED CLINICS",
    "general medicine clinic",
    "geriatric care",
    "lifestyle medicine",
    "healthcare clinic",
  ],
  openGraph: {
    title: "GERIMED CLINICS",
    description:
      "General, geriatrics, and lifestyle-focused healthcare from GERIMED CLINICS.",
    siteName: "GERIMED CLINICS",
    type: "website",
  },
  icons: {
    icon: [
      {
        url: "/logo/gerimed-icon.png",
        type: "image/png",
      },
    ],
    shortcut: "/logo/gerimed-icon.png",
    apple: [
      {
        url: "/logo/gerimed-icon.png",
        type: "image/png",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#1F4D3A",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${caveat.variable} h-full`}>
      <body className="min-h-full bg-background font-sans text-foreground antialiased">
        <a href="#main-content" className="sr-only fixed left-4 top-4 z-[100] rounded-md bg-brand-forest px-5 py-3 font-semibold text-white focus:not-sr-only focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
