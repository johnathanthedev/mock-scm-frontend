'use client'

import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";
import styles from "./homepage.module.css";

export default function Home() {
  const router = useRouter();

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Navigating Tomorrow&apos;s Logistics</h1>
      <div className={styles.overlay}></div>
      <Button
        className={styles.button}
        onClick={() => router.push('/access')}
        text={'Get Started'}
        size={"Large"}
        variant={"Dark"}
      />
      <video autoPlay muted loop className={styles.video}>
        <source src="/videos/globe.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </main>
  );
}
