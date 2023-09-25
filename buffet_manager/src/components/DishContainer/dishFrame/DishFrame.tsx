"use client";
import IBuffetDatabase from "@/interface";
import styles from "./styles.module.scss";
import { useState } from "react";

export default function DishFrame({ name, type }: IBuffetDatabase) {
  const [level, setLevel] = useState(4);

  const handleRangeChange = (event: any) => {
    const newLevel = parseInt(event.target.value);
    setLevel(newLevel);
  };
  const frameClass = `${styles.frame}`;
  return (
    <div className={frameClass} id={styles[`level${level}`]}>
      <h1>{name}</h1>
      <h3>{type}</h3>
      <p>Level:</p>
      <input
        className={styles["range-slider"]}
        type="range"
        min={0}
        max={4}
        step={type !== "salada" ? 1 : 2}
        value={level}
        onChange={handleRangeChange}
      />
    </div>
  );
}
