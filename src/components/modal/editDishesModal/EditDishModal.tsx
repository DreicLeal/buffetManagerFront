"use client";
import { useFood } from "@/contexts/foodContext";
import styles from "./style.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { IUpdateDish } from "@/interface";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "@/components/Input";
import { useState } from "react";

const EditDishModal = () => {
  const { editModal, setEditModal, updateDishes, dishToEditId } = useFood();
  const [checkboxValue, setCheckboxValue] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUpdateDish>();

  const submit: SubmitHandler<IUpdateDish> = (formData) => {
    const updatedData = {
      id: dishToEditId,
      name: formData.name,
      extra: formData.extra,
    };
    updateDishes(updatedData);
    setEditModal(!editModal);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.container}>
        <button
          onClick={() => setEditModal(!editModal)}
          className={styles.closeBtn}
        >
          <CloseIcon />
        </button>
        <form onSubmit={handleSubmit(submit)}>
          <Input
            label="nome"
            type="text"
            register={register("name")}
            error={errors.name}
          />
          <div className={styles.extra}>
            <span>extra?</span>
            <Input
              label="extra?"
              type="checkbox"
              register={register("extra")}
              value={checkboxValue}
              checked={checkboxValue}
              onChange={() => setCheckboxValue(!checkboxValue)}
            />
          </div>
          <button className={styles.submit} type="submit">
            Atualizar dados
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditDishModal;
