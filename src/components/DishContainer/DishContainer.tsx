"use client";
import DishFrame from "./dishFrame/DishFrame";
import styles from "./styles.module.scss";
import { useFood } from "@/contexts/foodContext";
import { useEffect } from "react";
import EditDishModal from "../modal/editDishesModal/EditDishModal";

const DishContainer = () => {
  const { dishes, load, editModal, setDishToEditId, getDishes } = useFood();
  
  useEffect(() => {
    getDishes();
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
