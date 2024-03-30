import { RigTotalItem, RigTotalItemPanel } from "@/entities/rig";
import { Outlet, useNavigate, useParams } from "react-router"
import { mockRigTotal } from "../../rigs/mocks/mock-rig-total";
import styles from './rig.page.module.scss'
import { RigMenu } from "./rig-menu";
import { useEffect } from "react";

export function Rig() {
  const { rigId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/rigs/${rigId}/gpus`, { replace: true });
  }, [rigId, navigate])
  
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