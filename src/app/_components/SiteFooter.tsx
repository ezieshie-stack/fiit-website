import Link from "next/link";
import styles from "../site.module.css";

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerLogo}>
        FIIT<span className={styles.navLogoAccent}>.CO</span>
      </div>
      <div className={styles.footerCenter}>
        <Link href="/about" className={styles.footerLink}>About</Link>
        <Link href="/programs" className={styles.footerLink}>Programs</Link>
        <Link href="/studio" className={styles.footerLink}>Studio</Link>
        <Link href="/blog" className={styles.footerLink}>Journal</Link>
      </div>
      <div className={styles.footerRight}>
        1047 Gerrard St E<br />
        Toronto, ON · Leslieville<br />
        © {new Date().getFullYear()} FIIT Co.
      </div>
    </footer>
  );
}
