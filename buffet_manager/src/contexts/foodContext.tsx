import IBuffetDatabase from "@/interface";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface FoodProviderData {
  dishes: IBuffetDatabase[];
  setDishes: Dispatch<SetStateAction<IBuffetDatabase[]>>;
  handleModal: () => void;
  addDishes: (newDish: IBuffetDatabase) => void;
  modal: boolean;
}
const FoodContext = createContext<FoodProviderData>({} as FoodProviderData);
export interface IProviderProps {
  children: ReactNode;
}

export const FoodProvider = ({ children }: IProviderProps) => {
  const [dishes, setDishes] = useState<IBuffetDatabase[]>([]);
  const [modal, setModal] = useState<boolean>(false);
  const handleModal = () => {
    setModal(!modal);
    console.log(modal);
  };
  const addDishes = (newDish: IBuffetDatabase) => {
    setDishes([...dishes, newDish]);
    setModal(!modal);
  };
  return (
    <FoodContext.Provider
      value={{ dishes, setDishes, handleModal, modal, addDishes }}
    >
      {children}
    </FoodContext.Provider>
  );
};

export const useFood = () => useContext(FoodContext);
