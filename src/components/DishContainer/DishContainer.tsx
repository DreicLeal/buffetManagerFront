"use client";
import DishFrame from "./dishFrame/DishFrame";
import styles from "./styles.module.scss";
import { useFood } from "@/contexts/foodContext";
import { useEffect } from "react";
import { buffetManagerApi } from "@/requests/api";

const DishContainer = () => {
  const { dishes, setDishes, load } = useFood();
  useEffect(() => {
    const getDishes = async () => {
      try {
        const dishes = await buffetManagerApi.get("/dishes");
        setDishes(dishes.data);
      } catch (error) {
        console.log(error);
      }
    };
    getDishes();
    const interval = setInterval(getDishes, 2500);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={styles.dishContainer}>
      {dishes.length > 0 ? (
        !load ? (
          dishes.map((dish, i) => (
            <DishFrame
              key={i}
              name={dish.name}
              category={dish.category}
              extra={dish.extra}
              level={dish.level}
              timer={dish.timer}
            />
          ))
        ) : (
          <div>carregando...</div>
        )
      ) : (
        <h1>Adicione um prato</h1>
      )}
    </div>
  );
};
export default DishContainer;
