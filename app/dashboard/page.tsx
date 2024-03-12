'use client'

import OperationsList from "@/components/features/OperationsList/OperationsList"
import Button from "@/components/shared/Button/Button"
import GoogleMaps from "@/components/shared/GoogleMaps/GoogleMaps"
import Navigation from "@/components/shared/Navigation/Navigation"
import { useRouter, useSearchParams } from "next/navigation"
import styles from "./index.module.css"

export default function Dashboard() {
  const router = useRouter();
  const searchParams = useSearchParams()

  const operationIdSearchParams = searchParams.get('operation-id')

  const handleOperationClick = (operationID: string) => {
    router.push(`/dashboard?operation-id=${operationID}`)
  }

  return <div className={styles.container}>
    <Navigation />
    <div className={styles.dashboardContent}>
      <div className={styles.operationsListWrapper}>
        <OperationsList onClick={handleOperationClick} operationID={operationIdSearchParams} />
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
        <div id="map" className={styles.mapWrapper}>
          <GoogleMaps />
        </div>
      </div>
    </div>
  </div>
}
