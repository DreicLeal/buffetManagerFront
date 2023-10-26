"use client";
import {
  IMessage,
  INewMessage,
  IloginInput,
  IupdateMsgProps,
} from "@/interface";
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
  const [user, setUser] = useState<string>("");
  const [endModal, setEndModal] = useState<boolean>(false);
  const [rocketMsg, setRocketMsg] = useState<boolean>(false);
  const handleCheckbox = () => {
    setRocketMsg(!rocketMsg);
  };
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
      window.location.replace("https://buffet-manager-front-27d6-oi9axqjh9-dreicleal.vercel.app/lobby");
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

  useEffect(() => {
    getMessages();
  }, []);

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

  const updateMessages = async (
    messageId: string,
    updatedContent: IupdateMsgProps
  ) => {
    try {
      await buffetManagerApi.patch(`/message/${messageId}`, updatedContent, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        rocketMsg,
        setRocketMsg,
        handleCheckbox,
        setEndModal,
        endModal,
        login,
        token,
        postMessages,
        messages,
        updateMessages,
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
