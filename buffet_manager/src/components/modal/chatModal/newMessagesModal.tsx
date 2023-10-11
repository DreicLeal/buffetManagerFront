"use client";
import { IMessagesModalProps } from "@/interface";
import styles from "./styles.module.scss";

import { useUser } from "@/contexts/userContext";

const NewMessagesModal = ({ messageId, text }: IMessagesModalProps) => {
  const { updateMessages, setMessageModal } = useUser();

  const handleModal = (id: string) => {
    const isChecked = true;
    updateMessages(id, isChecked);
    setMessageModal(false);
  };

  return (
    <div className={styles.modalOverlay}>
      <div>
        <p>{text}</p>
        <button onClick={() => handleModal(messageId)}>Ok</button>
      </div>
    </div>
  );
};
export default NewMessagesModal;
