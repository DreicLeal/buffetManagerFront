"use client";
import { useFood } from "@/contexts/foodContext";
import { useUser } from "@/contexts/userContext";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./styles.module.scss";

const EndModal = () => {
  const { setEndModal, deleteAllMessages } = useUser();
  const { deleteAllFood } = useFood();
  const logout = () => {
    deleteAllFood();
    deleteAllMessages();
    localStorage.removeItem("@TOKEN")
    localStorage.removeItem("@UserId")
    setTimeout(()=> {
      window.location.replace("http://localhost:3000/")
    },500)

  };
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <button className={styles.closeBtn} onClick={() => setEndModal(false)}>
          <CloseIcon />
        </button>
        <div className={styles.btnContainer}>
          <button onClick={() => deleteAllFood()}>Deletar Buffet</button>
          <button onClick={() => deleteAllMessages()}>Limpar Chat</button>
          <button onClick={() => logout()}>Logout</button>
        </div>
      </div>
    </div>
  );
};
export default EndModal;
