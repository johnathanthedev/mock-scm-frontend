import styles from "@/app/dashboard/index.module.css";
import classNames from "classnames";

export const mapWrapperClasses = (operationID: null | string) => classNames({
  [styles.mapWrapper]: true,
  [styles.selectionRequiredWrapper]: !operationID
})