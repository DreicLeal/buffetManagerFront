"use client";
import { IBuffetDatabase } from "@/interface";
import { buffetManagerApi } from "@/requests/api";
import { createContext, useContext, useState } from "react";
import { useUser } from "./userContext";
import {
  FoodProviderData,
  IProviderProps,
} from "@/interface/contextsInterface";

const FoodContext = createContext<FoodProviderData>({} as FoodProviderData);

export const FoodProvider = ({ children }: IProviderProps) => {
  const { token } = useUser();
  const [dishes, setDishes] = useState<IBuffetDatabase[]>([]);
  const [modal, setModal] = useState<boolean>(false);

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

  const updateDishes = async (name: string, nLevel: number) => {
    const dishId = dishes.filter((dish) => dish.name === name);
    const newLevel = { level: nLevel };
    try {
      const dishUpdateResponse = await buffetManagerApi.patch(
        `/dishes/${dishId[0].id}`,
        newLevel
      );
      const updated = dishes.filter(
        (dish) => dish.id !== dishUpdateResponse.data.id
      );
      setDishes([...updated, ...dishUpdateResponse.data.id]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModal = () => {
    setModal(!modal);
  };

  return (
    <FoodContext.Provider
      value={{
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
