import { PanelTypeName, Props } from "@/types/components/operations-panel/index.types";
import OperationsList from "./partials/OperationsList/OperationsList";
import styles from "./styles.module.css";

const OperationsPanel = ({ type, operationID }: Props) => {
  const renderContent = () => {
    if (type === PanelTypeName.List) {
      return <OperationsList operationID={operationID} />
    };

    return "";
  };


  return (
    <div className={styles.container}>
      {renderContent()}
    </div>
  )
}

export default OperationsPanel