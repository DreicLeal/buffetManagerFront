"use client";
import ChatBox from "@/components/Chat/chatBox";
import DishContainer from "@/components/DishContainer/DishContainer";
import Header from "@/components/Header/header";
import ChatIcon from "@mui/icons-material/Chat";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useUser } from "@/contexts/userContext";

export default function Saloon() {
  const { token } = useUser();
  const [chatToggle, setToggleChat] = useState<boolean>(false);
  const handleChat = () => {
    setToggleChat(!chatToggle);
  };

  useEffect(() => {
    if (!token) {
      window.location.assign("https://buffetmanagerapi007.onrender.com/");
    }
  }, []);
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
