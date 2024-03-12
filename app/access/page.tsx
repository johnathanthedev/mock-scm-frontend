'use client'

import Button from "@/components/shared/Button/Button";
import { useAlert } from "@/global-state/alert/alert.context";
import { createUser, signIn } from "@/services/accountsService";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./access.module.css";
import logo from "/public/images/scm-logo.png";

export default function Home() {
  const { triggerAlert } = useAlert();
  const router = useRouter();

  const [username, setUsername] = useState<string>("");
  const [loading, setLoading] = useState(false);;

  const handleClick = async () => {
    try {
      setLoading(true);

      const loginResults = await signIn({ username })

      if (loginResults.status !== 200) {
        const createUserResults = await createUser({ username })

        if (createUserResults.status !== 201) {
          setLoading(false);
          return triggerAlert(createUserResults.data.error, "Danger")
        }
      }

      setLoading(false);
      localStorage.setItem("username", username)
      router.push("/dashboard")

    } catch (error: any) {
      triggerAlert(error.error, "Danger")
    }
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
            loading={loading}
          />
        </form>
      </div>
    </div>
  );
}
