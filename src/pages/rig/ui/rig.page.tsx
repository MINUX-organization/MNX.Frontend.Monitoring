import { RigTotal, RigTotalItem, RigTotalItemPanel } from "@/entities/rig";
import { Outlet, useParams } from "react-router"
import styles from './rig.page.module.scss'
import { RigMenu } from "./rig-menu";
import { BackButton } from "@/features/rig/navigation-back";
import { match } from "ts-pattern";
import clsx from "clsx";
import { useRigsQuery } from "@/entities/rig/model/rigs.query";
import _ from "lodash";
import { UiSpinner } from "@/shared/ui/ui-spinner";

export function RigPage() {
  const { rigId } = useParams();
  
  const { rigsList, isLoading } = useRigsQuery();

  const rig = _.find(rigsList, (rig) => rig?.id === rigId);

  return (
    <div className={styles['rig-page']}>
      <BackButton className={styles['back-button']} />
      <RigMenu className={clsx(
        styles['menu'],
        rig && styles['menu-with-rig']
      )}/>
      {match(isLoading)
      .with(true, () => <UiSpinner />)
      .otherwise(() => {
        if (!rig) return <div className={styles['no-data']}>N/A</div>;
        return (
          <RigTotalItem
            className={styles['rig-total-item']}
            rig={rig} 
            withFeatures={false}
            renderItemPanel={(rig) => rig && <RigTotalItemPanel rig={rig} />}
            renderItemInfo={() => <Outlet />}
          />
        )
      })}

    </div>
  )
}