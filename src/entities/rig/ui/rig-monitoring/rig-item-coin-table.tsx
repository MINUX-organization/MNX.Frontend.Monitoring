import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import { RigCoinInfo } from "../../model/types";
import styles from './styles/rigCoinTable.module.scss';
import _ from "lodash";
import clsx from "clsx";

export function RigCoinTable({
  className, 
  flightSheets,
  labels,
}: {
  className?: string;
  flightSheets?: RigCoinInfo[];
  labels?: string[];
}) {
  return ( 
    <div className={clsx(className, styles['rig-item-flight-sheet-table'])}>
      <UiBgContainer className={styles['grid-title']} color="opaque">
        {_.map(labels, (label, index) => (
          <span key={index}>{label}</span>
        ))}
      </UiBgContainer>
      <div className={styles['grid-items']}>
        {_.map(flightSheets, (flightSheet) => (
          <div key={flightSheet.flightSheetName} className={styles['grid-item']}>
            <span>{flightSheet.coinName}</span>
            <span>{flightSheet.flightSheetName}</span>
            <span>{flightSheet.minerName}</span>
            <span>
              {flightSheet.hashRate}
              &nbsp;
              <span className={styles['measure']}>
                {"Mh/s"}
              </span>
            </span>
            <span className={styles['positive']}>{flightSheet.shares.accepted}</span>
            <span className={styles['negative']}>{flightSheet.shares.rejected}</span>
          </div>
        ))} 
      </div>
    </div>
  )
}