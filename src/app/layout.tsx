import type { Metadata } from "next";
import { Oswald, Chakra_Petch, Inter } from "next/font/google";
import "./globals.css";
import ConvexClientProvider from "./ConvexClientProvider";
import ThemeProvider from "./_components/ThemeProvider";
import SiteNav from "./_components/SiteNav";
import styles from "./site.module.css";

const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald", weight: ["400", "700"] });
const chakra = Chakra_Petch({ subsets: ["latin"], variable: "--font-chakra", weight: ["400", "700"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const SITE_URL = "https://fiitco.ca";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "FIIT Co. Boxing & Fitness Studio | Leslieville, Toronto",
    template: "%s | FIIT Co.",
  },
  description:
    "FIIT Co. is Toronto's boutique boxing and fitness studio in Leslieville. Group classes, personal training, Boxing Academy, and kids programs at 1047 Gerrard St E. First class free.",
  keywords: [
    "boxing Toronto",
    "Leslieville gym",
    "boxing classes Toronto",
    "personal training Toronto",
    "HIIT Toronto",
    "boxing academy",
    "FIIT Co",
    "Gerrard St East gym",
  ],
  applicationName: "FIIT Co.",
  authors: [{ name: "FIIT Co." }],
  creator: "FIIT Co.",
  publisher: "FIIT Co.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: SITE_URL,
    siteName: "FIIT Co.",
    title: "FIIT Co. Boxing & Fitness Studio | Leslieville, Toronto",
    description:
      "Boutique boxing and fitness studio in Leslieville. Group classes, personal training, Boxing Academy. You're Worth The Fight.",
    images: [
      {
        url: "/hero/home.webp",
        width: 1600,
        height: 900,
        alt: "FIIT Co. training floor in Leslieville, Toronto",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FIIT Co. Boxing & Fitness Studio | Leslieville, Toronto",
    description:
      "Boutique boxing and fitness studio in Leslieville. You're Worth The Fight.",
    images: ["/hero/home.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ExerciseGym", "HealthClub"],
  "@id": `${SITE_URL}/#business`,
  name: "FIIT Co.",
  alternateName: "FIIT Co. Boxing & Fitness",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.ico`,
  image: [`${SITE_URL}/hero/home.webp`],
  telephone: "+1-416-565-9300",
  email: "info@fiitco.ca",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1047 Gerrard St E",
    addressLocality: "Toronto",
    addressRegion: "ON",
    postalCode: "M4M 1Z7",
    addressCountry: "CA",
  },
  areaServed: {
    "@type": "City",
    name: "Toronto",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 43.6689575,
    longitude: -79.3362194,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "06:00",
      closes: "20:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday"],
      opens: "08:00",
      closes: "20:30",
    },
  ],
  sameAs: [
    "https://www.instagram.com/fiitco/",
    "https://www.facebook.com/fiitco/",
  ],
  slogan: "You're Worth The Fight.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${oswald.variable} ${chakra.variable} ${inter.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <ThemeProvider>
          <ConvexClientProvider>
            <div className={styles.wrap}>
              <SiteNav />
              <div style={{ paddingTop: 72 }}>{children}</div>
            </div>
          </ConvexClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
