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
  const token = localStorage.getItem("@TOKEN");
  !token && window.location.assign("http://localhost:3000/");

  const { getMessages, rocketMsg, messages } = useUser();

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

  const rocket = messages.filter((message) => message.rocket === true);
  const rocketModal = rocketMsg && rocket[0].rocket && rocket[0].checked;

  return (
    <>
      <Header text="Cozinha" />
      {rocketModal && (
        <NewMessagesModal messageId={rocket[0]!.id} text={rocket[0]!.text} />
      )}
      <DishContainer />;
      <ChatIcon className={styles.toggleChat} onClick={handleChat} />
      {chatToggle && <ChatBox />}
    </>
  );
}
