'use client'

import OperationsPanel from "@/components/features/OperationsPanel/OperationsPanel"
import Button from "@/components/shared/Button/Button"
import GoogleMaps from "@/components/shared/GoogleMaps/GoogleMaps"
import Navigation from "@/components/shared/Navigation/Navigation"
<<<<<<< Updated upstream
import { PanelTypeName } from "@/types/components/operations-panel/index.types"
import classNames from "classnames"
=======
import { OperationInformationProvider } from "@/global-state/operation-information/operation-information.provider"
import { mapWrapperClasses } from "@/lib/dashboard/data/classes"
>>>>>>> Stashed changes
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import styles from "./index.module.css"

export default function Dashboard() {
  const searchParams = useSearchParams()

  const operationID = searchParams.get('operation-id')

<<<<<<< Updated upstream
  const [operationsPanelType, setOperationsPanelType] = useState<PanelTypeName>(PanelTypeName.List)

  const mapWrapperClasses = classNames({
    [styles.mapWrapper]: true,
    [styles.selectionRequiredWrapper]: !operationID
  })

  return <div className={styles.container}>
    <Navigation />
    <div className={styles.dashboardContent}>
      <div className={styles.operationsPanelWrapper}>
        <OperationsPanel type={operationsPanelType} operationID={operationID} />
      </div>
      <div className={styles.operationOverviewWrapper}>
        <div className={styles.overviewHeader}>
          <div className={styles.overviewTitleWrapper}>
            <h1>Map Overview</h1>
          </div>
          <div className={styles.overviewActions}>
            <span>Edit Operation Details</span>
            <Button text={"Run Simulation"} onClick={() => null} size={"Small"} variant={"Primary"} />
          </div>
        </div>
        <div className={mapWrapperClasses}>
          {!operationID ? <div className={styles.selectionRequiredContainer}>
            <span>Select or Join an operation to view map</span>
          </div> : <GoogleMaps />}
=======
  return <OperationInformationProvider>
    <div className={styles.container}>
      <Navigation />
      <div className={styles.dashboardContent}>
        <div className={styles.operationsPanelWrapper}>
          <OperationsPanel operationID={operationID} />
        </div>
        <div className={styles.operationOverviewWrapper}>
          <div className={styles.overviewHeader}>
            <div className={styles.overviewTitleWrapper}>
              <h1>Map Overview</h1>
            </div>
            <div className={styles.overviewActions}>
              <span>Edit Operation Details</span>
              <Button text={"Run Simulation"} onClick={() => null} size={"Small"} variant={"Primary"} />
            </div>
          </div>
          <div className={mapWrapperClasses(operationID)}>
            {!operationID ? <div className={styles.selectionRequiredContainer}>
              <span>Select or Join an operation to view map</span>
            </div> : <GoogleMaps operationID={operationID} />}
          </div>
>>>>>>> Stashed changes
        </div>
      </div>
    </div>
  </OperationInformationProvider>
}
