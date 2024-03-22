import ActionText from "@/components/shared/ActionText/ActionText";
import Loading from "@/components/shared/Loading/Loading";
import { useAlert } from "@/global-state/alert/alert.context";
import { useOperationInformation } from "@/global-state/operation-information/operation-information.context";
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
  const { setBasicInfo } = useOperationInformation();

  const [operationName, setOperationName] = useState<null | string>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        if (operationID) {
          const { status, data } = await getOperation(operationID);

          if (status !== 200) {
            triggerAlert("Unable to retrieve operation details", "Danger")
            return goBack()
          }

          const { ID, Name, Status, Joined }: OperationDto = data;

          setBasicInfo({
            id: ID,
            name: Name,
            status: Status,
            joined: Joined
          })

          setOperationName(Name);

          setLoading(false);
        }
      } catch (error) {
        if (error) {
          triggerAlert("Sorry something went wrong", "Danger")
        }
      }
    }

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operationID, triggerAlert])

  return (
    <div className={classStyles(className)}>
      {loading ? <div className={styles.loadingWrapper}>
        <Loading color="var(--brand-color)" />
      </div> : <div className={styles.headerWrapper}>
        <ActionText text={"Go back"} onClick={goBack} />
        <h1>{operationName}</h1>
      </div>}
    </div>)
}

export default OperationDetails