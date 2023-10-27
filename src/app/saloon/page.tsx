"use client";
import ChatBox from "@/components/Chat/chatBox";
import DishContainer from "@/components/DishContainer/DishContainer";
import Header from "@/components/Header/header";
import ChatIcon from "@mui/icons-material/Chat";
import styles from "./../styles.module.scss";
import { useEffect, useState } from "react";
import { useUser } from "@/contexts/userContext";
import { baseURL } from "@/database/database";

const Saloon = () => {
  const { token } = useUser();
  const [chatToggle, setToggleChat] = useState<boolean>(false);
  const handleChat = () => {
    setToggleChat(!chatToggle);
  };

  useEffect(() => {
    if (!token) {
      window.location.assign(baseURL);
    }
  }, []);
  return (
    <>
      <Header text="Sala" />
      <DishContainer />;
      <ChatIcon className={styles.toggleChat} onClick={handleChat} />
      {chatToggle && <ChatBox />}
    </>
  );
};
export default Saloon;
