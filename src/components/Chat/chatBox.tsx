"use client";
import Input from "../Input";
import SendIcon from "@mui/icons-material/Send";
import styles from "./styles.module.scss";
import { useUser } from "@/contexts/userContext";
import { INewMessage } from "@/interface";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useRef } from "react";

const ChatBox = () => {
  const { postMessages, getMessages, messages, handleCheckbox, rocketMsg } =
    useUser();
  const user = localStorage.getItem("@UserId");

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    getMessages();
    scrollToBottom();
  }, []);

  const saloon = window.location.pathname === "/saloon";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<INewMessage>();
  const submit: SubmitHandler<INewMessage> = (messageContent) => {
    postMessages(messageContent);
    reset();
    const interval = setInterval(() => {
      getMessages();
      scrollToBottom();
    }, 1500);
    return () => {
      clearInterval(interval);
    };
  };

  return (
    <div className={styles.chatContainer}>
      <ul className={styles.messagesContainer}>
        {messages
          .sort((a, b) => {
            if (a.created_at && b.created_at) {
              return (
                new Date(a.created_at).getTime() -
                new Date(b.created_at).getTime()
              );
            } else {
              return 0;
            }
          })
          .map((message) => (
            <li
              key={message.id}
              className={
                user === message.user?.id ? styles.yourMessage : styles.partner
              }
            >
              <p>{message.text}</p>
              <p className={styles.time}>
                {message.created_at!.slice(
                  message.created_at!.indexOf("T") + 1,
                  message.created_at!.indexOf("T") + 6
                )}
              </p>
            </li>
          ))}
        <div ref={messagesEndRef} />
      </ul>
      <form className={styles.msgForm} onSubmit={handleSubmit(submit)}>
        <div>
          <Input
            label="Sua mensagem"
            type="text"
            register={register("text")}
            defaultValue=""
            error={errors.text}
          />
          {saloon && (
            <div>
              <p>Torpedo</p>
              <Input
                type="checkbox"
                label=""
                value={rocketMsg}
                register={register("rocket")}
                onChange={handleCheckbox}
              />
            </div>
          )}
        </div>
        <button type="submit">
          <SendIcon />
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
