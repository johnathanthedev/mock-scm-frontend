import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from 'react';
import styles from "./index.module.css";
import menu from "/public/images/menu.svg";
import logo from "/public/images/scm-logo.png";

export default function MobileNavigation() {
  const currentPath = usePathname();
  const router = useRouter()

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className={styles.container}>
      <div className={styles.logoWrapper}>
        <Image src={logo} alt="Supply Chain Management Globe logo" />
      </div>
      <div className={styles.menuWrapper} onClick={toggleDrawer}>
        <Image src={menu} alt="Menu icon" />
      </div>
      {isDrawerOpen && <div className={styles.backdrop} onClick={toggleDrawer}></div>}
      <div className={isDrawerOpen ? styles.drawerOpen : styles.drawerClosed}>
        <div className={styles.navigationItemsContainer}>
          <div onClick={() => router.push("/dashboard")} className={`${currentPath === "/dashboard" && styles.active} ${styles.navigationItem}`}>
            <span>Home</span>
          </div>
          <div onClick={() => router.push("/facilities")} className={`${currentPath === "/facilities" && styles.active} ${styles.navigationItem}`}>
            <span>Facilities</span>
          </div>
        </div>
      </div>
    </div>
  )
}