'use client'

import OperationsPanel from "@/components/features/OperationsPanel/OperationsPanel"
import Button from "@/components/shared/Button/Button"
import GoogleMaps from "@/components/shared/GoogleMaps/GoogleMaps"
import Navigation from "@/components/shared/Navigation/Navigation"
import { OperationInformationProvider } from "@/global-state/operation-information/operation-information.provider"
import { mapWrapperClasses } from "@/lib/dashboard/data/classes"
import { Suspense } from "react"
import styles from "./index.module.css"

export default function Dashboard() {
  return <OperationInformationProvider>
    <div className={styles.container}>
      <Navigation />
      <div className={styles.dashboardContent}>
        <div className={styles.operationsPanelWrapper}>
          <Suspense>
            <OperationsPanel />
          </Suspense>
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
          <Suspense>
            <div className={mapWrapperClasses()}>
              <GoogleMaps />
            </div>
          </Suspense>
        </div>
      </div>
    </div>
  </OperationInformationProvider>
}
