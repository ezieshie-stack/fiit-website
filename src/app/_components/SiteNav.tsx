"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "../site.module.css";
import { MINDBODY_SCHEDULE_URL, MINDBODY_SHOP_URL } from "@/lib/mindbody";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs & Pricing" },
  { href: "/studio", label: "Studio" },
  { href: "/community", label: "Community" },
  { href: "/blog", label: "Journal" },
];

export default function SiteNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close drawer on route change (belt and suspenders — the click handler
  // also closes it, but this catches programmatic navigation too).
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Escape key closes the drawer.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  // Lock body scroll when drawer is open so the background doesn't slide
  // around under the overlay.
  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isOpen]);

  return (
    <>
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
        <div className={styles.navRight}>
          <a
            href={MINDBODY_SCHEDULE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.navCta}
          >
            Book a Class
          </a>
          <button
            type="button"
            className={styles.navHamburger}
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <span
              className={`${styles.navHamburgerBar} ${
                isOpen ? styles.navHamburgerBarOpen1 : ""
              }`}
            />
            <span
              className={`${styles.navHamburgerBar} ${
                isOpen ? styles.navHamburgerBarOpen2 : ""
              }`}
            />
            <span
              className={`${styles.navHamburgerBar} ${
                isOpen ? styles.navHamburgerBarOpen3 : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile drawer — only rendered when open so it doesn't trap focus
          or block clicks on desktop. */}
      <div
        id="mobile-menu"
        className={`${styles.navMobileMenu} ${
          isOpen ? styles.navMobileMenuOpen : ""
        }`}
        aria-hidden={!isOpen}
      >
        <ul className={styles.navMobileLinks}>
          {LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`${styles.navMobileLink} ${
                    active ? styles.navMobileLinkActive : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <a
          href={MINDBODY_SHOP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.navMobileCta}
          onClick={() => setIsOpen(false)}
        >
          Book Free Class
        </a>
        <div className={styles.navMobileAddress}>
          1047 Gerrard St E
          <br />
          Toronto · Leslieville
        </div>
      </div>
    </>
  );
}
