import { getClasses } from "./data/classname";
import styles from "./index.module.css";
import { Props } from "./index.types";

export default function Button({ text, onClick, className, variant, size, fluid }: Props) {
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
      {text}
    </button>
  );
}
