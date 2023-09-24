import DishFrame from "@/components/dishFrame/DishFrame";
import styles from "./page.module.css";
import AddFoodModal from "@/components/modal/addDishesModal";
import Header from "@/components/header/header";

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
      {/* <AddFoodModal /> */}
      <div className={styles.dishesContainer}>
        <DishFrame type="quente" name="Tofu" />
        <DishFrame type="sopa" name="Sopa do campo" />
        <DishFrame type="salada" name="Mix Verde" />
        <DishFrame type="quente" name="Tofu" />
        <DishFrame type="sopa" name="Sopa do campo" />
        <DishFrame type="salada" name="Mix Verde" />
        <DishFrame type="quente" name="Tofu" />
        <DishFrame type="sopa" name="Sopa do campo" />
        <DishFrame type="salada" name="Mix Verde" />
        <DishFrame type="quente" name="Tofu" />
        <DishFrame type="sopa" name="Sopa do campo" />
        <DishFrame type="salada" name="Mix Verde" />
      </div>
    </main>
  );
}
