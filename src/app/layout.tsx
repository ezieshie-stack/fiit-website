import type { Metadata } from "next";
import { Oswald, Chakra_Petch, Inter } from "next/font/google";
import "./globals.css";
import ConvexClientProvider from "./ConvexClientProvider";
import SiteNav from "./_components/SiteNav";
import styles from "./site.module.css";

const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald", weight: ["400", "700"] });
const chakra = Chakra_Petch({ subsets: ["latin"], variable: "--font-chakra", weight: ["400", "700"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "FIIT Co. — Boxing & Fitness Studio | Toronto",
  description:
    "FIIT Co. is Toronto's premier boxing and fitness studio. Located at 1047 Gerrard St E in Leslieville. First class free.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${oswald.variable} ${chakra.variable} ${inter.variable}`}>
      <body>
        <ConvexClientProvider>
          <div className={styles.wrap}>
            <SiteNav />
            <div style={{ paddingTop: 72 }}>{children}</div>
          </div>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
