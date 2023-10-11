"use client";
import ChatBox from "@/components/Chat/chatBox";
import DishContainer from "@/components/DishContainer/DishContainer";
import Header from "@/components/Header/header";
import NewMessagesModal from "@/components/modal/chatModal/newMessagesModal";
import { useUser } from "@/contexts/userContext";
import { useEffect } from "react";

export default function Kitchen() {
  const { messageModal, getMessages } = useUser();

  useEffect(() => {
    getMessages();
    const interval = setInterval(getMessages, 3000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <Header text="Cozinha" />
      {messageModal && <NewMessagesModal messageId="soon" text="soon" />}
      <DishContainer />;
      <ChatBox />
    </>
  );
}
