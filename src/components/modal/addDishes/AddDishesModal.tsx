"use client";
import styles from "./styles.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useFood } from "@/contexts/foodContext";
import { buffetFoodList } from "@/database/database";

const AddFoodModal = () => {
  const { handleModal, addFood, getDishes } = useFood();
  const [inputValue, setInputValue] = useState("");
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleCheckbox = () => {
    setCheckboxValue(!checkboxValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    const filterSuggestions = buffetFoodList
      .filter((food) => food.name.toLowerCase().includes(value.toLowerCase()))
      .map((food) => food.name);

    setSuggestions(filterSuggestions);
  };
  const filteredDish = buffetFoodList.find((food) => food.name === inputValue);
  const dishData = { ...filteredDish!, extra: checkboxValue };
  const addToInput = (event: any) => {
    const liValue = event.target.textContent;
    setInputValue(liValue);
    setSuggestions([]);
  };

  const addDishes = (newDish: any) => {
    addFood(newDish);
    const interval = setInterval(getDishes, 1500);
    return () => {
      clearInterval(interval);
    };
  };
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.container}>
        <button onClick={handleModal} className={styles.closeBtn}>
          <CloseIcon />
        </button>
        <h1>Qual prato deseja adicionar?</h1>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Digite o nome do prato"
        />
        <ul>
          {suggestions.map((suggestion, index) => (
            <li onClick={addToInput} key={index}>
              {suggestion}
            </li>
          ))}
          <div className={styles.extraDish}>
            <p>Prato extra?</p>
            <input
              type="checkbox"
              checked={checkboxValue}
              name="extra"
              onChange={handleCheckbox}
            />
          </div>
          <button onClick={() => addDishes(dishData)} className={styles.addBtn}>
            Adicionar
          </button>
        </ul>
      </div>
    </div>
  );
};

export default AddFoodModal;
