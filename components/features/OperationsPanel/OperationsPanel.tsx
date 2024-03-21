import { PanelTypeName, Props } from "@/types/components/operations-panel/index.types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import OperationDetails from "./partials/OperationDetails/OperationDetails";
import OperationsList from "./partials/OperationsList/OperationsList";
import styles from "./styles.module.css";

const OperationsPanel = ({ operationID }: Props) => {
  const router = useRouter();

  const [panelType, setPanelType] = useState(PanelTypeName.List);
  const [transitionClass, setTransitionClass] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    if (operationID) {
      setPanelType(PanelTypeName.OperationDetails);
      setIsTransitioning(false);
    } else {
      setIsTransitioning(false);
    }
  }, [operationID]);

  const handleClick = (operationID: string) => {
    if (!isTransitioning) {
      setTransitionClass(styles['slide-out-to-left']);

      setTimeout(() => {
        setPanelType(PanelTypeName.OperationDetails);
        setTransitionClass(styles['slide-in-from-right']);

        setTimeout(() => {
          router.push(`/dashboard?operation-id=${operationID}`)
        }, 500)
      }, 500);
    }
  };

  const goToOperationsList = () => {
    if (!isTransitioning) {
      setTransitionClass(styles['slide-out']);
      setTimeout(() => {
        setPanelType(PanelTypeName.List);
        setTransitionClass(styles['slide-in']);

        setTimeout(() => {
          router.replace("/dashboard");
        }, 500)
      }, 500);
    }
  };

  const renderContent = () => {
    if (panelType === PanelTypeName.List) {
      return <OperationsList operationID={operationID} onClick={handleClick} />;
    }
    return <OperationDetails goBack={goToOperationsList} operationID={operationID} />;
  };

  return (
    <div className={styles.container} style={{ overflow: isTransitioning ? 'hidden' : 'auto' }}>
      <div className={`${styles.content} ${transitionClass}`}>
        {renderContent()}
      </div>
    </div>
  );
};

export default OperationsPanel;
