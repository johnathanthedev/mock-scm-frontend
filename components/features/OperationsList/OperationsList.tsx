'use client'

import Badge from "@/components/shared/Badge/Badge"
import Loading from "@/components/shared/Loading/Loading"
import { getOperationsList } from "@/services/operations-service"
import { BadgeTypes } from "@/types/components/badge.types"
import { Props } from "@/types/components/operations-list.types"
import { OperationDto } from "@/types/dtos/operations/index.types"
import Image from "next/image"
import { useEffect, useState } from "react"
import { currentOperationClasses, operationActiveClasses, operationJoinStatusClasses } from "./data/classes.data"
import styles from "./index.module.css"
import globeVector from "/public/images/globe-icon.svg"

export default function OperationsList({
  onClick,
  operationID
}: Props) {
  const [loading, setLoading] = useState(true);
  const [operations, setOperations] = useState<null | Array<OperationDto>>(null);
  const [currentOperation, setCurrentOperation] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getOperationsList();

        setLoading(false);

        const operationsData = res.data;

        if (res.status === 200) setOperations(operationsData)

        if (operationsData.length > 0 && operationID) {
          const operationIDInResults = operationsData.some((o: OperationDto) => o.ID === operationID);

          if (operationIDInResults) {
            setCurrentOperation(operationID);
          }
        }
      } catch (error) {
        setLoading(false);
        console.error(error)
      }
    }

    getData();
  }, [operationID])

  const handleOnClick = (operationID: string): void => {
    setCurrentOperation(operationID);
    onClick(operationID);
  }

  const renderContent = () => {
    if (loading) {
      return <div className={styles.loadingWrapper}>
        <Loading color="var(--brand-color)" />
      </div>
    };

    if (!!operations && operations.length > 0) {
      return operations.map((operation: OperationDto) => {
        return <div
          key={operation.ID}
          onClick={() => handleOnClick(operation.ID)}
          className={currentOperationClasses(operation.ID, currentOperation)}
        >
          <div className={styles.globeIconWrapper}>
            <Image src={globeVector} alt="Globe icon" />
          </div>
          <div className={styles.operationDetails}>
            <div className={styles.left}>
              <p className={styles.operationName}>{operation.Name}</p>
              <p className={styles.scheduledDeliveries}>0 scheduled deliveries</p>
            </div>
            <div className={styles.right}>
              <p className={operationActiveClasses(operation.Status)}>{operation.Status}</p>
              <p className={operationJoinStatusClasses(operation.Joined)}>{operation.Joined ? <Badge text={"Joined"} type={BadgeTypes.Default} /> : <span>Join</span>}</p>
            </div>
          </div>
        </div>
      })
    }

    if (!!operations && operations.length === 0) {
      return <p className={styles.noOpsText}>No operations to show</p>
    }
  }

  return (
    <div
      className={styles.container}
    >
      <h1>Operations</h1>
      <div className={styles.operationsWrapper}>
        {renderContent()}
      </div>
    </div>
  )
}