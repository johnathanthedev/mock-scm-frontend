'use client'

import Button from "@/components/Button/Button";
import { useAlert } from "@/global-state/alert/alert.context";
import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./access.module.css";
import logo from "/public/images/scm-logo.png";

export default function Home() {
  const { triggerAlert } = useAlert();

  const [username, setUsername] = useState<string>("");

  const handleClick = async () => {
    triggerAlert("Hello World", "Danger");
    // const loginResults = await signIn({ username })

    // console.log(loginResults)
  }

  const handleFormSubmit = (e: FormEvent) => {
    return e.preventDefault();
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.logoWrapper}>
            <Image src={logo} alt="Supply Chain Management Globe logo" />
          </div>
          <div className={styles.title}>
            <h2>Mock SCM App</h2>
          </div>
          <div className={styles.subtext}>
            <p>Submit to sign in or create an account</p>
          </div>
        </div>
        <form className={styles.form} onSubmit={handleFormSubmit}>
          <input
            className={styles.input}
            type="text"
            placeholder="Username"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
          />
          <Button
            fluid
            text={'Submit'}
            size={"Small"}
            variant={"Primary"}
            onClick={handleClick}
          />
        </form>
      </div>
    </div>
  );
}
