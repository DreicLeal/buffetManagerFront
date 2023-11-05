import { Dispatch, ReactNode, SetStateAction } from "react";
import {
  IBuffetDatabase,
  IMessage,
  INewMessage,
  IUpdateDish,
  IloginInput,
  IupdateMsgProps,
} from ".";

export interface IProviderProps {
  children: ReactNode;
}

export interface UserProviderData {
  login: (loginData: IloginInput) => Promise<void>;
  token: string | null;
  postMessages: (messageContent: INewMessage) => Promise<void>;
  updateMessages: (
    messageId: string,
    updatedContent: IupdateMsgProps
  ) => Promise<void>;
  messages: IMessage[];
  getMessages: () => Promise<void>;
  deleteAllMessages: () => Promise<void>;
  user: string;
  setEndModal: Dispatch<SetStateAction<boolean>>;
  endModal: boolean;
  handleCheckbox: () => void;
  setRocketMsg: Dispatch<SetStateAction<boolean>>;
  rocketMsg: boolean;
}

export interface FoodProviderData {
  dishes: IBuffetDatabase[];
  handleModal: () => void;
  modal: boolean;
  addFood: (dishData: IBuffetDatabase) => Promise<void>;
  setDishes: Dispatch<SetStateAction<IBuffetDatabase[]>>;
  updateDishes: ({ name, timer }: IUpdateDish) => Promise<void>
  deleteAllFood: () => Promise<void>;
  load: boolean
  setLoad: Dispatch<SetStateAction<boolean>>
  deleteFood: (dishId: string) => Promise<void>
}
