"use client";
import Header from "@/components/Header/header";
import styles from "./styles.module.scss";
import Link from "next/link";
import { useUser } from "@/contexts/userContext";

export default function Lobby() {
  const { token } = useUser();
  return (
    <>
      <Header text={"Lobby"} />
      {token && (
        <div className={styles.linkContainer}>
          <Link href="/saloon">Sala</Link>
          <Link href="/kitchen">Cozinha</Link>
        </div>
      )}
    </>
  );
}
