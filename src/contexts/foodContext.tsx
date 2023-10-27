"use client";
import { IBuffetDatabase, IUpdateDish } from "@/interface";
import { buffetManagerApi } from "@/requests/api";
import { createContext, useContext, useState } from "react";
import { useUser } from "./userContext";
import {
  FoodProviderData,
  IProviderProps,
} from "@/interface/contextsInterface";

const FoodContext = createContext<FoodProviderData>({} as FoodProviderData);

export const FoodProvider = ({ children }: IProviderProps) => {
  const { token, setEndModal } = useUser();
  const [dishes, setDishes] = useState<IBuffetDatabase[]>([]);
  const [modal, setModal] = useState<boolean>(false);
  const [load, setLoad] = useState<boolean>(false);

  const addFood = async (dishData: IBuffetDatabase) => {
    try {
      await buffetManagerApi.post("/dishes", dishData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setModal(!modal);
      getDishes();
    } catch (error) {
      console.log(error);
    }
  };
  const deleteAllFood = async () => {
    try {
      await buffetManagerApi.delete("/dishes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDishes([]);
      setEndModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getDishes = async () => {
    try {
      const dishes = await buffetManagerApi.get("/dishes");
      setDishes(dishes.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateDishes = async ({ name, level }: IUpdateDish) => {
    const dishId = dishes.filter((dish) => dish.name === name);
    let chrono;
    if (level! < 3 && dishId[0].timer == null) {
      chrono = new Date();
    }

    if (level == 4) {
      chrono = null;
    }

    const newInfo = { level: level, timer: chrono };
    try {
      setLoad(true);
      const dishUpdateResponse = await buffetManagerApi.patch(
        `/dishes/${dishId[0].id}`,
        newInfo
      );
      const updated = dishes.filter(
        (dish) => dish.id !== dishUpdateResponse.data.id
      );
      setDishes([...updated, ...dishUpdateResponse.data.id]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoad(false);
    }
  };

  const handleModal = () => {
    setModal(!modal);
  };

  return (
    <FoodContext.Provider
      value={{
        load,
        dishes,
        handleModal,
        modal,
        addFood,
        deleteAllFood,
        setDishes,
        updateDishes,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
};

export const useFood = () => useContext(FoodContext);
