import { BadgeTypes, Props } from "@/types/components/badge.types";
import classNames from "classnames";
import styles from "./index.module.css";


export default function Badge({
  type,
  text
}: Props) {
  const badgeClasses = classNames({
    [styles.defaultJoin]: true,
    [styles.default]: type === BadgeTypes.Default,
  })

  return (
    <div className={badgeClasses}>{text}</div>
  )
}