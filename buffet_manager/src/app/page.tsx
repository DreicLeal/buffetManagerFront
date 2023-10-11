"use client";
import styles from "./page.module.css";
import Header from "@/components/Header/header";
import { LoginForm } from "@/components/login/loginForm";

export default function Home() {
  let location = "";
  if (window.location.href.includes("saloon")) {
    location = "Sala";
  } else if (window.location.href.includes("kitchen")) {
    location = "Cozinha";
  } else {
  }

  return (
    <main className={styles.main}>
      <h1>Bem vindo!</h1>
      <Header text={location} />
      <LoginForm />
    </main>
  );
}
