"use client";
import ChatBox from "@/components/Chat/chatBox";
import DishContainer from "@/components/DishContainer/DishContainer";
import Header from "@/components/Header/header";
import ChatIcon from "@mui/icons-material/Chat";
import { useState } from "react";
import styles from "./styles.module.scss";
import { useUser } from "@/contexts/userContext";

export default function Saloon() {
  const { token } = useUser();
  const [chatToggle, setToggleChat] = useState<boolean>(false);
  const handleChat = () => {
    setToggleChat(!chatToggle);
  };
  !token && window.location.assign("http://localhost:3000/");
  return (
    <>
      <Header text="Sala" />
      <DishContainer />;
      <div className={styles.chatContainer}>
        <ChatIcon onClick={handleChat} />
        {chatToggle && <ChatBox />}
      </div>
    </>
  );
}
