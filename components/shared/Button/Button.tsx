import Loading from "../Loading/Loading";
import { getClasses } from "./data/classname";
import styles from "./index.module.css";
import { Props } from "./index.types";

export default function Button({ text, onClick, className, variant, size, fluid, loading }: Props) {
  const handleOnClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <button
      className={getClasses(variant, styles, className, size, fluid)}
      onClick={handleOnClick}
    >
      {loading ? <Loading color={"var(--text-color-100)"} /> : text}
    </button>
  );
}
