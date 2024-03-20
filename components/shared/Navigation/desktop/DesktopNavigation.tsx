'use client'

import Image from "next/image";
import styles from "./index.module.css";
import pfp from "/public/images/pfp.svg";
import logo from "/public/images/scm-logo.png";

export default function DesktopNavigation() {
  return (
    <div className={styles.container}>
      <div className={styles.logoWrapper}>
        <Image onClick={() => null} src={logo} alt="Supply Chain Management Globe logo" />
      </div>
      <div className={styles.navigationLinksContainer}>
      </div>
      <div className={styles.pfpWrapper}>
        <Image src={pfp} alt="Temporary profile picture icon" />
      </div>
    </div>
  )
}