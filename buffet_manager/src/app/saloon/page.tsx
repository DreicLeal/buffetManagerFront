"use client"
import ChatBox from "@/components/Chat/chatBox";
import DishContainer from "@/components/DishContainer/DishContainer";
import Header from "@/components/Header/header";
import ChatIcon from "@mui/icons-material/Chat";
import { useState } from "react";
import styles from "./styles.module.scss";

export default function Saloon() {
  const [chatToggle, setToggleChat] = useState<boolean>(false);
  const handleChat = () => {
    setToggleChat(!chatToggle);
  };
  return (
    <>
      <Header text="Sala" />
      <DishContainer />;
      <ChatIcon className={styles.toggleChat} onClick={handleChat} />
      {chatToggle && <ChatBox />}
    </>
  );
}
