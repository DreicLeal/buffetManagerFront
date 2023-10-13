"use client";
import { IMessage, INewMessage, IloginInput } from "@/interface";
import {
  IProviderProps,
  UserProviderData,
} from "@/interface/contextsInterface";
import { buffetManagerApi } from "@/requests/api";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext<UserProviderData>({} as UserProviderData);

export const UserProvider = ({ children }: IProviderProps) => {
  const logToken =
    typeof window !== "undefined" ? localStorage.getItem("@TOKEN") : null;

  const [token, setToken] = useState(logToken);
  const [messages, setMessages] = useState<IMessage[]>([] as IMessage[]);
  const [messageModal, setMessageModal] = useState<boolean>(false);
  const [user, setUser] = useState<string>("");
  const [endModal, setEndModal] = useState<boolean>(false);

  const login = async (loginData: IloginInput) => {
    try {
      const res = await buffetManagerApi.post("/login", loginData);
      setToken(res.data.token);
      localStorage.setItem("@TOKEN", res.data.token);
      setTimeout(retrieveProfile, 500);
    } catch (error) {
      console.log(error);
    }
  };

  const retrieveProfile = async () => {
    try {
      const res = await buffetManagerApi.get("/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { dishes, messages, ...rest } = res.data;
      setUser(rest.id);
      localStorage.setItem("@UserId", rest.id);
      window.location.replace("http://localhost:3000/lobby");
    } catch (error) {
      console.log(error);
    }
  };

  const postMessages = async (messageContent: INewMessage) => {
    try {
      const response = await buffetManagerApi.post("/message", messageContent, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const newMessage: IMessage = response.data;
      console.log(newMessage, "nova msg");
      setMessages([...messages, newMessage]);
    } catch (error) {
      console.log(error);
    }
  };

  const getMessages = async () => {
    try {
      const response = await buffetManagerApi.get("/message", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const messages: IMessage[] = response.data;
      setMessages(messages);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAllMessages = async () => {
    try {
      await buffetManagerApi.delete("/message", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages([]);
      setEndModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const updateMessages = async (messageId: string, isChecked: boolean) => {
    const checked = { checked: isChecked };
    try {
      await buffetManagerApi.patch(`/message/${messageId}`, checked, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        setEndModal,
        endModal,
        login,
        token,
        postMessages,
        messages,
        updateMessages,
        messageModal,
        setMessageModal,
        getMessages,
        deleteAllMessages,
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
