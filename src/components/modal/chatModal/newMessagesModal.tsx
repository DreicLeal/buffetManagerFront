"use client";
import { IMessagesModalProps } from "@/interface";
import styles from "./styles.module.scss";

import { useUser } from "@/contexts/userContext";

const NewMessagesModal = ({ messageId, text }: IMessagesModalProps) => {
  const { updateMessages } = useUser();

  const handleModal = (id: string) => {
    const updatedInfo = { checked: true, rocket: false };
    updateMessages(id, updatedInfo);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.rocketContainer}>
        <h2>{text}</h2>
        <button onClick={() => handleModal(messageId)}>Ok</button>
      </div>
    </div>
  );
};
export default NewMessagesModal;