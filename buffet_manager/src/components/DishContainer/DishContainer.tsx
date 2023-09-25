import { useFood } from "@/contexts/foodContext";
import DishFrame from "./dishFrame/DishFrame";
import styles from "./styles.module.scss"
export default function DishContainer() {
  const { dishes } = useFood();
  console.log(dishes)
  return (
    <div className={styles.dishContainer}>
      {dishes.length > 0 ? (
        dishes.map((dish, i) => (
          <DishFrame key={i} name={dish.name} type={dish.type} />
        ))
      ) : (
        <h1>Adicione um prato</h1>
      )}
    </div>
  );
}
