"use client";
import Header from "@/components/Header/header";
import styles from "./styles.module.scss";
import Link from "next/link";

export default function Lobby() {
  return (
    <>
      <Header text={"Lobby"} />
      <div className={styles.linkContainer}>
        <Link href="/saloon">Sala</Link>
        <Link href="/kitchen">Cozinha</Link>
      </div>
    </>
  );
}
