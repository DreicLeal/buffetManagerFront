"use client";
import styles from "./styles.module.scss";
import { IMessagesModalProps } from "@/interface";
import { useUser } from "@/contexts/userContext";

const RocketMessagesModal = ({ messageId, text }: IMessagesModalProps) => {
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
export default RocketMessagesModal;
