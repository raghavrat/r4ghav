import type { Metadata } from "next";
import { FinderExperience } from "./FinderExperience";

export const metadata: Metadata = {
  metadataBase: new URL("https://test.r4ghav.xyz"),
  title: "Raghav's Finder",
  description:
    "Open Raghav Ratnani's work, photography, and music like files in Finder.",
  openGraph: {
    title: "Raghav's Finder",
    description: "Work, photography, and music inside a Finder-style portfolio.",
    url: "https://test.r4ghav.xyz",
    siteName: "Raghav Ratnani",
    type: "website",
    images: [
      {
        url: "/og-finder.png",
        width: 1536,
        height: 1024,
        alt: "Raghav's Finder desktop with Work, Photography, and Music folders",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Raghav's Finder",
    description: "Work, photography, and music inside a Finder-style portfolio.",
    images: ["/og-finder.png"],
  },
};

export default function FinderPage() {
  return <FinderExperience />;
}
