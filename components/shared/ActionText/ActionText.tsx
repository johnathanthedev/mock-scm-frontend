import { Props } from "@/types/components/action-text.types";
import styles from "./index.module.css";

const ActionText = ({
  text,
  onClick
}: Props) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <span>{text}</span>
    </div>
  )
}

export default ActionText