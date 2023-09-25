"use client";
import styles from "./page.module.css";
import App from "./_app";

export default function Home() {

  return (
    <main className={styles.main}>
      <App />
      <div className={styles.dishesContainer}>

      </div>
    </main>
  );
}
