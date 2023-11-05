"use client";
import styles from "./styles.module.scss";
import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Timer from "@/components/chrono/Chrono";
import { useFood } from "@/contexts/foodContext";
import { IBuffetDatabase } from "@/interface";
import { useState } from "react";

const DishFrame = ({
  name,
  category,
  extra,
  level,
  timer,
  id,
}: IBuffetDatabase) => {
  const { updateDishes, deleteFood, dishes, setDishes } = useFood();
  const location = window.location.pathname === "/saloon";
  const [dragging, setDragging] = useState(false);

  const handleRangeChange = (event: any) => {
    const newLevel = parseInt(event.target.value) - 1;
    const newInfo = { level: newLevel, name: name };
    updateDishes(newInfo);
  };
  const replenish = (event: any) => {
    const replenishInfo = { name: name, level: 4 };
    updateDishes(replenishInfo);
  };
  const fraction = () => {
    if (level! == 4 || level! == 3) {
      return "1";
    } else if (level == 2) {
      return "½";
    } else if (level == 1) {
      return "¼";
    }
    return "FIM";
  };
  const frameClass = `${styles.frame}`;

  const handleDragStart = (event: React.MouseEvent<HTMLDivElement>) => {
    const targetElement = event.target as HTMLElement;
    if (targetElement.tagName === "DIV") {
      setDragging(!dragging);
    }
  };

  const deleteDish = () => {
    deleteFood(id!);
    const remainDishes = dishes.filter((dish) => dish.id !== id);
    setDishes(remainDishes);
  };

  return (
    <div className={styles.container}>
      <div
        className={dragging ? styles.dragging : styles.frameContainer}
        onClick={handleDragStart}
      >
        <div className={styles[`level${level}`]}>{fraction()}</div>
        <div className={frameClass}>
          <div className={styles.infoContainer}>
            <div>
              <h1 className={styles.white}>{name}</h1>
              <div className={styles.categoryContainer}>
                <h3 className={styles.white}>{category} </h3>
                {extra && <p className={styles.white}> (prato extra)</p>}
              </div>
            </div>
            <div className={styles.replenishContainer}>
              <div className={styles.chronoContainer}>
                {level! < 3 && <Timer initialTime={timer!} />}
              </div>
              {location && (
                <span className={styles.buttonContainer}>
                  <RefreshIcon
                    className={styles.replenishBtn}
                    onClick={replenish}
                  />
                  <button
                    className={styles.trending}
                    value={level}
                    onClick={handleRangeChange}
                  >
                    ←
                  </button>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      {dragging && (
        <div className={dragging ? styles.editButtons : styles.displayNone}>
          <DeleteForeverIcon
            className={styles.deleteBtn}
            onClick={deleteDish}
          />
          <EditNoteIcon className={styles.editBtn} />
        </div>
      )}
    </div>
  );
};
export default DishFrame;
