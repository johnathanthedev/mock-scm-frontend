import { classnameType } from "@/types/components/generic.types";
import classNames from "classnames";
import styles from "../index.module.css";

export const classStyles = (className: classnameType) => classNames({
  [styles.container]: true,
  className
})