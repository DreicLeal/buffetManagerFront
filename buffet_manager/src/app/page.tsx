"use client";
import styles from "./page.module.css";
import Header from "@/components/Header/header";
import { LoginForm } from "@/components/login/loginForm";
import { useUser } from "@/contexts/userContext";

export default function Home() {
  const { token } = useUser();
  let location = "";
  if (window.location.href.includes("saloon")) {
    location = "Sala";
  } else if (window.location.href.includes("kitchen")) {
    location = "Cozinha";
  } else {
  }
  token && window.location.assign("http://localhost:3000/lobby");
  return (
    <main className={styles.main}>
      <Header text={location} />
      <LoginForm />
    </main>
  );
}
