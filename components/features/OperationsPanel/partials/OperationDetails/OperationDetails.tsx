import ActionText from "@/components/shared/ActionText/ActionText";
import { Props } from "@/types/components/operations-panel/operation-details.types";
import classNames from "classnames";
import styles from "./index.module.css";

const OperationDetails = ({
  goBack,
  className
}: Props) => {
  const classStyles = classNames({
    [styles.container]: true,
    className
  })


  return (
    <div className={classStyles}>
      <div className={styles.headerWrapper}>
        <ActionText text={"Go back"} onClick={goBack} />
        <h1>Operation Details</h1>
      </div>
    </div>
  )
}

export default OperationDetails