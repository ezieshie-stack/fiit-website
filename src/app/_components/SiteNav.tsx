"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../site.module.css";

const MINDBODY_URL =
  "https://www.mindbodyonline.com/explore/deals/fiit-co/intro-offer-10377";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/studio", label: "Studio" },
  { href: "/blog", label: "Journal" },
];

export default function SiteNav() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.navLogo}>
        FIIT<span className={styles.navLogoAccent}>.CO</span>
      </Link>
      <ul className={styles.navLinks}>
        {LINKS.map((link) => {
          const active =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`${styles.navLink} ${active ? styles.navLinkActive : ""}`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
      <a
        href={MINDBODY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.navCta}
      >
        Book a Class
      </a>
    </nav>
  );
}
