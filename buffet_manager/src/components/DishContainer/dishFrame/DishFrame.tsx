"use client";
import { IBuffetDatabase } from "@/interface";
import styles from "./styles.module.scss";
import { useFood } from "@/contexts/foodContext";
import { Timer } from "@/components/chrono/Chrono";
import { useEffect } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function DishFrame({
  name,
  category,
  extra,
  level,
}: IBuffetDatabase & { initialTime: number }) {
  const { updateDishes } = useFood();
  const location = window.location.pathname === "/saloon";
  useEffect(() => {
    if (level! < 3 && !localStorage.getItem(`initialTime_${name}`)) {
      localStorage.setItem(`initialTime_${name}`, Date.now().toString());
    }
  }, [name, level]);

  const initialTime = parseInt(
    localStorage.getItem(`initialTime_${name}`) || "0",
    10
  );

  const handleRangeChange = (event: any) => {
    const newLevel = parseInt(event.target.value) - 1;
    updateDishes(name, newLevel);
  };
  const replenish = () => {
    updateDishes(name, 4);
    localStorage.removeItem(`initialTime_${name}`);
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

  return (
    <div className={styles.frameContainer}>
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
              {level! < 3 && <Timer initialTime={initialTime} />}
            </div>
            {location && (
              <div className={styles.buttonContainer}>
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
