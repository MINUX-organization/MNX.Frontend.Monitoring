import { RigTotalItem, RigTotalItemPanel } from "@/entities/rig";
import { Outlet } from "react-router"
import { mockRigTotal } from "../../rigs/mocks/mock-rig-total";
import styles from './rig.page.module.scss'
import { RigMenu } from "./rig-menu";
import { BackButton } from "@/features/rig/navigation-back";

export function RigPage() {
  return (
    <div className={styles['rig-page']}>
      <RigMenu className={styles['menu']}/>
      <RigTotalItem
        className={styles['rig-total-item']}
        rig={mockRigTotal} 
        withFeatures={false}
        renderItemPanel={(rig) => rig && <RigTotalItemPanel rig={rig} />}
        renderItemInfo={() => <Outlet />}
        renderBackButton={() => <BackButton className={styles['back-button']} />}
      />
    </div>
  )
}