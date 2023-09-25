"use client";
import { useState } from "react";
import styles from "./styles.module.scss";
import buffetFoodList from "@/database/database";
import { useFood } from "@/contexts/foodContext";
const AddFoodModal = () => {
    const {handleModal, addDishes} = useFood()
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    const filterSuggestions = buffetFoodList
      .filter((food) => food.name.toLowerCase().includes(value.toLowerCase()))
      .map((food) => food.name);

    setSuggestions(filterSuggestions);
};
const filteredDish = buffetFoodList.filter((food) => food.name === inputValue)

  const addToInput = (event: any) => {
    const liValue = event.target.textContent;
    setInputValue(liValue);
    setSuggestions([]);
  };
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.container}>
        <button onClick={handleModal} className={styles.closeBtn}>fechar</button>
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
          <button onClick={() => addDishes(filteredDish[0])} className={styles.addBtn}>Adicionar</button>
        </ul>
      </div>
    </div>
  );
};

export default AddFoodModal;
