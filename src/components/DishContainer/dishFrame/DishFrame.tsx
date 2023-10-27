"use client";
import styles from "./styles.module.scss";
import RefreshIcon from "@mui/icons-material/Refresh";
import Timer from "@/components/chrono/Chrono";
import { useFood } from "@/contexts/foodContext";
import { IBuffetDatabase } from "@/interface";

const DishFrame = ({
  name,
  category,
  extra,
  level,
  timer,
}: IBuffetDatabase) => {
  const { updateDishes } = useFood();
  const location = window.location.pathname === "/saloon";

  const handleRangeChange = (event: any) => {
    const newLevel = parseInt(event.target.value) - 1;
    const newInfo = { level: newLevel, name: name };
    updateDishes(newInfo);
  };
  const replenish = () => {
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
              {level! < 3 && <Timer initialTime={timer!} />}
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
};
export default DishFrame;
