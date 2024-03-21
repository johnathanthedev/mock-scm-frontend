import ActionText from "@/components/shared/ActionText/ActionText";
import { useAlert } from "@/global-state/alert/alert.context";
import { getOperation } from "@/services/operations-service";
import { Props } from "@/types/components/operations-panel/operation-details.types";
import { OperationDto } from "@/types/services/operations-service.types";
import { useEffect, useState } from "react";
import { classStyles } from "./data/classes";
import styles from "./index.module.css";

const OperationDetails = ({
  goBack,
  className,
  operationID
}: Props) => {
  const { triggerAlert } = useAlert();

  const [operationName, setOperationName] = useState<null | string>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        if (operationID) {
          const { status, data } = await getOperation(operationID);

          if (status !== 200) {
            triggerAlert("Unable to retrieve operation details", "Danger")
          }

          const { Name }: OperationDto = data

          setOperationName(Name);
        }
      } catch (error) {
        if (error) {
          triggerAlert("Sorry something went wrong", "Danger")
        }
      }
    }

    getData();;
  }, [operationID, triggerAlert])

  return (
    <div className={classStyles(className)}>
      <div className={styles.headerWrapper}>
        <ActionText text={"Go back"} onClick={goBack} />
        <h1>{operationName}</h1>
      </div>
    </div>
  )
}

export default OperationDetails