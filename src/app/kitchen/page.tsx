"use client";
import styles from "./../styles.module.scss"
import ChatBox from "@/components/Chat/chatBox";
import DishContainer from "@/components/DishContainer/DishContainer";
import Header from "@/components/Header/header";
import ChatIcon from "@mui/icons-material/Chat";
import RocketMessagesModal from "@/components/modal/chatModal/RocketMsgModal";
import { useUser } from "@/contexts/userContext";
import { useEffect, useState } from "react";
import { baseURL } from "@/database/database";

const Kitchen = () => {
  const { getMessages, messages } = useUser();
  const [chatToggle, setToggleChat] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("@TOKEN");
    if (!token) {
      window.location.assign(baseURL);
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
};
export default Kitchen;
