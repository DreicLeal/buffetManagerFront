"use client";
import ChatBox from "@/components/Chat/chatBox";
import DishContainer from "@/components/DishContainer/DishContainer";
import Header from "@/components/Header/header";
import NewMessagesModal from "@/components/modal/chatModal/NewMessagesModal";
import { useUser } from "@/contexts/userContext";
import { useEffect, useState } from "react";
import ChatIcon from "@mui/icons-material/Chat";
import styles from "./styles.module.scss";

export default function Kitchen() {
  const { messageModal, getMessages,token } = useUser();
  const [chatToggle, setToggleChat] = useState<boolean>(false);
  useEffect(() => {
    getMessages();
    const interval = setInterval(getMessages, 3000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  const handleChat = () => {
    setToggleChat(!chatToggle);
  };

  !token && window.location.assign("http://localhost:3000/")

  return (
    <>
      <Header text="Cozinha" />
      {messageModal && <NewMessagesModal messageId="soon" text="soon" />}
      <DishContainer />;
      <ChatIcon className={styles.toggleChat} onClick={handleChat} />
      {chatToggle && <ChatBox />}
    </>
  );
}
