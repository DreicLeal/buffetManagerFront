"use client";
import AddFoodModal from "../modal/addDishesModal";
import styles from "./style.module.scss";

import { useFood } from "@/contexts/foodContext";
const Header = () => {
  const { handleModal, modal } = useFood();
  return (
    <>
      <header className={styles.headerContainer}>
        <div className={styles.title}>
          <h1>da Terra</h1>
          <h2>Gestão buffet SALA</h2>
        </div>
        <button onClick={handleModal}>+</button>
      </header>
      {modal && <AddFoodModal />}
    </>
  );
};

export default Header;
