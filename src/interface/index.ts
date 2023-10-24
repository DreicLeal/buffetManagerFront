import { UseFormRegisterReturn, FieldError } from "react-hook-form";

export interface IBuffetDatabase {
  id?: string;
  name: string;
  category: string;
  extra?: boolean;
  level?: number;
  timer?: number | null;
  created_at?: string;
  updated_at?: string;
}
export interface IUpdateDish {
  id?: string;
  name: string;
  extra?: boolean;
  level?: number;
  timer?: number | null;
}

export interface IloginInput {
  name: string;
  password: string;
}

export interface IMessage {
  id: string;
  text: string;
  checked?: boolean;
  created_at?: string;
  user?: IUser;
  rocket?: boolean;
}
export interface IUser {
  id: string;
  name: string;
}

export interface IUserProfile {
  id: string;
  is_adm: boolean;
  name: string;
  dishes?: IBuffetDatabase[];
  messages?: IMessage[];
}

export interface INewMessage {
  text: string;
  user: string;
  rocket?: boolean;
}

export interface IMessagesModalProps {
  messageId: string;
  text: string;
}

export interface IupdateMsgProps {
  checked: boolean;
  rocket: boolean;
}

export interface IInputProps {
  label: string;
  type: "text" | "password" | "checkbox";
  register: UseFormRegisterReturn<string>;
  error?: FieldError;
  defaultValue?: string | undefined | null;
  value?: boolean;
  onChange?: () => void;
}
