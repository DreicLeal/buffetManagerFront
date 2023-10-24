"use client";
import styles from "./page.module.css";
import Header from "@/components/Header/header";
import { LoginForm } from "@/components/login/loginForm";
import { useUser } from "@/contexts/userContext";
import { useEffect, useState } from "react";

export default function Home() {
  const { token, user } = useUser();
  const [location, setLocation] = useState<string>("")
  useEffect(() => {
    if (window.location.href.includes("saloon")) {
      setLocation("Sala");
    } else if (window.location.href.includes("kitchen")) {
      setLocation("Cozinha")
    }
    if (token && user) {
      window.location.assign("https://buffet-manager-front-27d6-ksl8msesa-dreicleal.vercel.app/lobby");
    }
  }, []);

  return (
    <main className={styles.main}>
      <Header text={location} />
      <LoginForm />
    </main>
  );
}
