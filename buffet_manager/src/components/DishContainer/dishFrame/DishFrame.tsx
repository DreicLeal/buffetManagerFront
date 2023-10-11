"use client";
import { IBuffetDatabase } from "@/interface";
import styles from "./styles.module.scss";
import { useFood } from "@/contexts/foodContext";
import { Timer } from "@/components/chrono/Chrono";
import { useEffect } from "react";
import RefreshIcon from '@mui/icons-material/Refresh';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
export default function DishFrame({
  name,
  category,
  extra,
  level,
}: IBuffetDatabase & { initialTime: number }) {
  const { updateDishes } = useFood();

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
  const replenish = (event: any) => {
    updateDishes(name, 4);
    localStorage.removeItem(`initialTime_${name}`);
  };

  const frameClass = `${styles.frame}`;

  return (
    <div className={styles.frameContainer}>
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
            <div className={styles.buttonContainer}>
              <RefreshIcon className={styles.replenishBtn}onClick={replenish}/>
              <button value={level} onClick={handleRangeChange}>
                <TrendingDownIcon/>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div id={styles[`level${level}`]}></div>
    </div>
  );
}
