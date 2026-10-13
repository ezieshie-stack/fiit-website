"use client";

/**
 * Studio page Location + Hours block. Reads the primary location from
 * Convex (edited via ops tool's Website Locations admin) with a static
 * Leslieville fallback.
 *
 * Replaces the hardcoded Location/Hours twoColGrid block that previously
 * lived inline in /studio/page.tsx.
 */

import { useQuery } from "convex/react";
import { anyApi } from "convex/server";
import styles from "@/app/site.module.css";

type LiveLocation = {
  _id: string;
  name: string;
  address1: string;
  address2?: string;
  city: string;
  region: string;
  postalCode: string;
  phone: string;
  email: string;
  hoursMonFri: string;
  hoursSatSun: string;
};

const FALLBACK = {
  name: "FIIT Co. Leslieville",
  address1: "1047 Gerrard St E",
  city: "Toronto",
  region: "ON",
  postalCode: "M4M 1Z7",
  phone: "(416) 565-9300",
  email: "info@fiitco.ca",
  hoursMonFri: "6:00 AM – 8:30 PM",
  hoursSatSun: "8:00 AM – 8:30 PM",
};

export default function LiveStudioLocation() {
  const live = useQuery(anyApi.websiteContent.getPrimaryLocation) as
    | LiveLocation
    | null
    | undefined;

  const loc = live && live._id ? live : FALLBACK;

  // Mon-Fri share the same hours string; same for Sat-Sun. Render as a
  // full per-day table for the studio page so it looks like a normal
  // hours table vs. the compact footer format.
  const days: [string, string][] = [
    ["Monday", loc.hoursMonFri],
    ["Tuesday", loc.hoursMonFri],
    ["Wednesday", loc.hoursMonFri],
    ["Thursday", loc.hoursMonFri],
    ["Friday", loc.hoursMonFri],
    ["Saturday", loc.hoursSatSun],
    ["Sunday", loc.hoursSatSun],
  ];

  return (
    <div className={styles.twoColGrid}>
      <div>
        <div className={styles.label}>Location</div>
        <h2 className={styles.headlineMd} style={{ marginBottom: "1.5rem" }}>
          {loc.address1}
        </h2>
        <p className={styles.bodyLg} style={{ marginBottom: "2.5rem" }}>
          {loc.city}, {loc.region} {loc.postalCode}
          <br />
          Leslieville, just east of Jones Ave.
        </p>

        <div className={styles.contactRow}>
          <div>
            <div className={styles.contactLabel}>Phone</div>
            <div className={styles.body}>{loc.phone}</div>
          </div>
          <div>
            <div className={styles.contactLabel}>Email</div>
            <div className={styles.body}>{loc.email}</div>
          </div>
        </div>
      </div>

      <div>
        <div className={styles.label}>Hours</div>
        <h2 className={styles.headlineMd} style={{ marginBottom: "1.5rem" }}>
          Open 7 Days.
        </h2>
        <table className={styles.hoursTable}>
          <tbody>
            {days.map(([day, hours]) => (
              <tr key={day}>
                <td>{day}</td>
                <td>{hours}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
