import { RigTotalItem, RigTotalItemPanel } from "@/entities/rig";
import { Outlet } from "react-router"
import { mockRigTotal } from "../../rigs/mocks/mock-rig-total";
import styles from './rig.page.module.scss'
import { RigMenu } from "./rig-menu";

export function RigPage() {
  return (
    <div className={styles['rig-page']}>
      <RigMenu className={styles['menu']}/>
      <RigTotalItem 
        rig={mockRigTotal} 
        withFeatures={false}
        renderItemPanel={(rig) => rig && <RigTotalItemPanel rig={rig} />}
        renderItemInfo={() => <Outlet />}
      />
    </div>
  )
}