'use client'

import FacilityIcon from "@/components/shared/icons/FacilityIcon";
import HomeIcon from "@/components/shared/icons/HomeIcon";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import styles from "./index.module.css";
import pfp from "/public/images/pfp.svg";
import logo from "/public/images/scm-logo.png";

export default function DesktopNavigation() {
  const currentPath = usePathname();
  const router = useRouter()

  return (
    <div className={styles.container}>
      <div className={styles.logoWrapper}>
        <Image src={logo} alt="Supply Chain Management Globe logo" />
      </div>
      <div className={styles.navigationLinksContainer}>
        <div onClick={() => router.push("/dashboard")} className={`${currentPath === "/dashboard" && styles.active} ${styles.navigationItem}`}>
          <HomeIcon color={`${currentPath === "/dashboard" ? "var(--brand-color)" : "var(--text-color-100)"}`} />
          <span>Home</span>
        </div>
        <div onClick={() => router.push("/facilities")} className={`${currentPath === "/facilities" && styles.active} ${styles.navigationItem}`}>
          <FacilityIcon color={`${currentPath === "/facilities" ? "var(--brand-color)" : "var(--text-color-100)"}`} />
          <span>Facilities</span>
        </div>
      </div>
      <div className={styles.pfpWrapper}>
        <Image src={pfp} alt="Temporary profile picture icon" />
      </div>
    </div>
  )
}