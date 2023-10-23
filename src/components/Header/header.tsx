"use client";
import Link from "next/link";
import AddFoodModal from "../modal/addDishes/AddDishesModal";
import styles from "./style.module.scss";
import { useFood } from "@/contexts/foodContext";
import EndModal from "../modal/endModal/EndModal";
import { useUser } from "@/contexts/userContext";

const Header = ({ text }: { text: string }) => {
  const { endModal, setEndModal, token } = useUser();
  const { handleModal, modal } = useFood();

  return (
    <>
      <header className={styles.headerContainer}>
        <Link href="/lobby">Lobby</Link>
        <div className={styles.title}>
          <h1>da Terra</h1>
          <h2>Gestão buffet {text}</h2>
        </div>
        {token && (
          <div className={styles.btnContainer}>
            <button
              className={styles.endBtn}
              onClick={() => setEndModal(!endModal)}
            >
              Encerrar
            </button>
            <button onClick={handleModal}>+</button>
          </div>
        )}
      </header>
      {endModal && <EndModal />}
      {modal && <AddFoodModal />}
    </>
  );
};

export default Header;
