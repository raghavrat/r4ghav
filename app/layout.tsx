import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  metadataBase: new URL("https://r4ghav.xyz"),
  title: "Raghav Ratnani | Systems, Software, Machines",
  description:
    "Raghav Ratnani builds AI infrastructure, software, and machines at full speed.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Raghav Ratnani | Systems, Software, Machines",
    description:
      "Engineer at Cumulus Labs. Building across AI infrastructure, software, and machines.",
    url: "https://r4ghav.xyz",
    siteName: "Raghav Ratnani",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Raghav Ratnani | Systems, Software, Machines",
    description:
      "Engineer at Cumulus Labs. Building across AI infrastructure, software, and machines.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
