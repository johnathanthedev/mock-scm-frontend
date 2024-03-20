import Image from "next/image";
import { useState } from 'react';
import styles from "./index.module.css";
import menu from "/public/images/menu.svg";
import logo from "/public/images/scm-logo.png";

export default function MobileNavigation() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className={styles.container}>
      <div className={styles.logoWrapper}>
        <Image onClick={() => null} src={logo} alt="Supply Chain Management Globe logo" />
      </div>
      <div className={styles.menuWrapper} onClick={toggleDrawer}>
        <Image src={menu} alt="Menu icon" />
      </div>
      {isDrawerOpen && <div className={styles.backdrop} onClick={toggleDrawer}></div>}
      <div className={isDrawerOpen ? styles.drawerOpen : styles.drawerClosed}>
        <div className={styles.navigationItemsContainer}>
        </div>
      </div>
    </div>
  )
}
