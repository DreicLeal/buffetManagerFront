import { useFood } from "@/contexts/foodContext";
import { useUser } from "@/contexts/userContext";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./styles.module.scss";

const EndModal = () => {
  const { setEndModal, deleteAllMessages } = useUser();
  const { deleteAllFood } = useFood();
  return (
    <div className={styles.modalOverlay}>
      <button className={styles.closeBtn} onClick={() => setEndModal(false)}>
        <CloseIcon />
      </button>
      <div className={styles.btnContainer}>
        <button onClick={() => deleteAllMessages}>Deletar Buffet</button>
        <button onClick={() => deleteAllFood}>Limpar Chat</button>
      </div>
    </div>
  );
};
export default EndModal;
