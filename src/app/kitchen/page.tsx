"use client";
import ChatBox from "@/components/Chat/chatBox";
import DishContainer from "@/components/DishContainer/DishContainer";
import Header from "@/components/Header/header";
import { useUser } from "@/contexts/userContext";
import { useEffect, useState } from "react";
import ChatIcon from "@mui/icons-material/Chat";
import styles from "./styles.module.scss";
import RocketMessagesModal from "@/components/modal/chatModal/RocketMsgModal";

export default function Kitchen() {
  const { getMessages, messages } = useUser();
  const [chatToggle, setToggleChat] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("@TOKEN");
    if (!token) {
      window.location.assign("https://buffetmanagerapi007.onrender.com/");
    }
    getMessages();
    const interval = setInterval(getMessages, 3000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  const handleChat = () => {
    setToggleChat(!chatToggle);
  };

  const lastMsg = messages[messages.length - 1];

  return (
    <>
      <Header text="Cozinha" />
      {lastMsg && lastMsg.rocket && (
        <RocketMessagesModal messageId={lastMsg.id} text={lastMsg.text} />
      )}
      <DishContainer />;
      <ChatIcon className={styles.toggleChat} onClick={handleChat} />
      {chatToggle && <ChatBox />}
    </>
  );
}
