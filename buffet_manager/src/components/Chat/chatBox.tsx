"use client";
import { useUser } from "@/contexts/userContext";
import { INewMessage } from "@/interface";
import { Input } from "../Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import styles from "./styles.module.scss";

const ChatBox = () => {
  const { postMessages, getMessages, messages } = useUser();
  const user = localStorage.getItem("@UserId");
  useEffect(() => {
    getMessages();
    const interval = setInterval(getMessages, 3000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<INewMessage>();
  const submit: SubmitHandler<INewMessage> = (messageContent) => {
    postMessages(messageContent);
  };

  return (
    <div className={styles.chatContainer}>
      <ul className={styles.messagesContainer}>
        {messages.map((message) => (
          <li
            key={message.id}
            className={
              user === message.user?.id ? styles.yourMessage : styles.partner
            }
          >
            <p>
              {message.text}
            </p>
            <p className={styles.time}>
              {message.created_at!.slice(
                message.created_at!.indexOf("T") + 1,
                message.created_at!.indexOf("T") + 6
              )}
            </p>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit(submit)}>
        <Input
          label="Sua mensagem"
          type="text"
          register={register("text")}
          defaultValue=""
          error={errors.text}
        />
        <button type="submit">Ok</button>
      </form>
    </div>
  );
};

export default ChatBox;
