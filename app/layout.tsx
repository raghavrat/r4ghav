import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://r4ghav.xyz"),
  title: "Raghav Ratnani | Engineer and Photographer",
  description:
    "Raghav Ratnani builds software at Cumulus Labs, photographs cities after dark, and collects music.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Raghav Ratnani | Engineer and Photographer",
    description:
      "Software, photography, and music from Raghav Ratnani.",
    url: "https://r4ghav.xyz",
    siteName: "Raghav Ratnani",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1536,
        height: 1024,
        alt: "Raghav Ratnani portfolio with a Manhattan Bridge night photograph",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Raghav Ratnani | Engineer and Photographer",
    description: "Software, photography, and music from Raghav Ratnani.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
