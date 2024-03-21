'use client'

import OperationsPanel from "@/components/features/OperationsPanel/OperationsPanel"
import Button from "@/components/shared/Button/Button"
import GoogleMaps from "@/components/shared/GoogleMaps/GoogleMaps"
import Navigation from "@/components/shared/Navigation/Navigation"
import { mapWrapperClasses } from "@/lib/dashboard/data/classes"
import { useSearchParams } from "next/navigation"
import styles from "./index.module.css"

export default function Dashboard() {
  const searchParams = useSearchParams()
  const operationID = searchParams.get('operation-id')

  return <div className={styles.container}>
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
      </div>
    </div>
  </div>
}
