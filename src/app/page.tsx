"use client";
import styles from "./page.module.css";
import Header from "@/components/Header/header";
import { LoginForm } from "@/components/login/loginForm";
import { useUser } from "@/contexts/userContext";
import { useEffect } from "react";

export default function Home() {
  const { token, user } = useUser();
  let location = "";
  if (window.location.href.includes("saloon")) {
    location = "Sala";
  } else if (window.location.href.includes("kitchen")) {
    location = "Cozinha";
  } else {
  }

  useEffect(() => {
    if (token && user) {
      window.location.assign("http://localhost:3000/lobby");
    }
  }, []);

  return (
    <main className={styles.main}>
      <Header text={location} />
      <LoginForm />
    </main>
  );
}
