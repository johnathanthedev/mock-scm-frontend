import { OperationStatusName } from "@/types/dtos/operations/index.types"
import classNames from "classnames"
import styles from "../index.module.css"


export const operationActiveClasses = (active: OperationStatusName) => classNames({
  [styles.defaultActive]: true,
  [styles.active]: active === OperationStatusName.Active,
  [styles.inactive]: active === OperationStatusName.Inactive,
})

export const operationJoinStatusClasses = (joinStatus: boolean) => classNames({
  [styles.defaultJoin]: true,
  [styles.joined]: joinStatus,
  [styles.unjoined]: !joinStatus,
})

export const currentOperationClasses = (operationID: string, currentOperation: string) => classNames({
  [styles.operationItem]: true,
  [styles.currentOperation]: currentOperation === operationID,
})
