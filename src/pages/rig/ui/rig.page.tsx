import { RigTotal, RigTotalItem, RigTotalItemPanel } from "@/entities/rig";
import { Outlet } from "react-router"
import styles from './rig.page.module.scss'
import { RigMenu } from "./rig-menu";
import { BackButton } from "@/features/rig/navigation-back";
import { match } from "ts-pattern";
import clsx from "clsx";

export function RigPage() {
  // const { rigId } = useParams();
  
  const rig: RigTotal | undefined = undefined

  return (
    <div className={styles['rig-page']}>
      <BackButton className={styles['back-button']} />
      <RigMenu className={clsx(
        styles['menu'],
        rig && styles['menu-with-rig']
      )}/>
      {match(rig)
      .with(undefined, () => <div className={styles['no-data']}>N/A</div>)
      .otherwise((rig) => (
        <RigTotalItem
          className={styles['rig-total-item']}
          rig={rig} 
          withFeatures={false}
          renderItemPanel={(rig) => rig && <RigTotalItemPanel rig={rig} />}
          renderItemInfo={() => <Outlet />}
        />
      ))}

    </div>
  )
}