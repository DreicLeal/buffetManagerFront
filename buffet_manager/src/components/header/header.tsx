"use client";
import Link from "next/link";
import AddFoodModal from "../modal/addDishes/addDishesModal";
import styles from "./style.module.scss";
import { useFood } from "@/contexts/foodContext";

const Header = ({ text }: { text: string }) => {
  const { handleModal, modal } = useFood();
  return (
    <>
      <header className={styles.headerContainer}>
          <Link href="/lobby">Lobby</Link>
        <div className={styles.title}>
          <h1>da Terra</h1>
          <h2>Gestão buffet {text}</h2>
        </div>
        <button onClick={handleModal}>+</button>
      </header>
      {modal && <AddFoodModal />}
    </>
  );
};

export default Header;
