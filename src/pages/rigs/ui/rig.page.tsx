import { RigTotalItem, RigTotalItemPanel } from "@/entities/rig";
import { Outlet, useParams } from "react-router"
import { mockRigTotal } from "../mocks/mock-rig-total";
import styles from './rig.page.module.scss'
import { RigMenu } from "./rig-menu";

export function Rig() {
  const { id } = useParams();
  
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