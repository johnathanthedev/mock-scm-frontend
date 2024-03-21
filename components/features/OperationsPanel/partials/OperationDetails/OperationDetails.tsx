import ActionText from "@/components/shared/ActionText/ActionText";
<<<<<<< Updated upstream
import { Props } from "@/types/components/operations-panel/operation-details.types";
import classNames from "classnames";
=======
import Loading from "@/components/shared/Loading/Loading";
import { useAlert } from "@/global-state/alert/alert.context";
import { useOperationInformation } from "@/global-state/operation-information/operation-information.context";
import { getOperation } from "@/services/operations-service";
import { Props } from "@/types/components/operations-panel/operation-details.types";
import { OperationDto } from "@/types/services/operations-service.types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { classStyles } from "./data/classes";
>>>>>>> Stashed changes
import styles from "./index.module.css";

const OperationDetails = ({
  goBack,
  className
}: Props) => {
<<<<<<< Updated upstream
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
=======
  const router = useRouter();
  const { triggerAlert } = useAlert();
  const { setBasicInfo } = useOperationInformation();

  const [operationName, setOperationName] = useState<null | string>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {

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
    }

    getData();
  }, [goBack, operationID, router, setBasicInfo, triggerAlert])

  return (
    <div className={classStyles(className)}>
      {loading ? <div className={styles.loadingWrapper}>
        <Loading color="var(--brand-color)" />
      </div> : <div className={styles.headerWrapper}>
        <ActionText text={"Go back"} onClick={goBack} />
        <h1>{operationName}</h1>
      </div>}
>>>>>>> Stashed changes
    </div>
  )
}

export default OperationDetails