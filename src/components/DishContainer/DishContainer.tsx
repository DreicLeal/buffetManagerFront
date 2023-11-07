"use client";
import DishFrame from "./dishFrame/DishFrame";
import styles from "./styles.module.scss";
import { useFood } from "@/contexts/foodContext";
import { useEffect } from "react";
import { buffetManagerApi } from "@/requests/api";
import EditDishModal from "../modal/editDishesModal/EditDishModal";

const DishContainer = () => {
  const { dishes, setDishes, load, editModal, setDishToEditId, dishToEditId } =
    useFood();
  useEffect(() => {
    const getDishes = async () => {
      try {
        const dishesResponse = await buffetManagerApi.get("/dishes");
        setDishes(dishesResponse.data);
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

  const eventSeeker = (e: any) => {
    const isEditBtn = e.target.innerHTML === "Editar";
    if (isEditBtn) {
      setDishToEditId(e.target.id);
    }
  };

  return (
    <div className={styles.dishContainer} onClick={(e) => eventSeeker(e)}>
      {editModal && <EditDishModal />}
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
              id={dish.id}
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
