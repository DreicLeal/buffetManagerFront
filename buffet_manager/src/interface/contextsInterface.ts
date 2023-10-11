import { Dispatch, ReactNode, SetStateAction } from "react";
import {
  IBuffetDatabase,
  IMessage,
  INewMessage,
  IloginInput,
} from ".";

export interface IProviderProps {
  children: ReactNode;
}

export interface UserProviderData {
  login: (loginData: IloginInput) => Promise<void>;
  token: string | null;
  postMessages: (messageContent: INewMessage) => Promise<void>;
  updateMessages: (messageId: string, isChecked: boolean) => Promise<void>;
  messages: IMessage[];
  setMessageModal: Dispatch<SetStateAction<boolean>>;
  messageModal: boolean;
  getMessages: () => Promise<void>;
  user: string;
}

export interface FoodProviderData {
  dishes: IBuffetDatabase[];
  handleModal: () => void;
  modal: boolean;
  addFood: (dishData: IBuffetDatabase) => Promise<void>;
  setDishes: Dispatch<SetStateAction<IBuffetDatabase[]>>;
  updateDishes: (name: string, toUpdateData: number) => Promise<void>;
}
