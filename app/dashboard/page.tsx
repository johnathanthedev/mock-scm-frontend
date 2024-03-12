'use client'

import OperationsList from "@/components/features/OperationsList/OperationsList"
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

      </div>
    </div>
  </div>
}
