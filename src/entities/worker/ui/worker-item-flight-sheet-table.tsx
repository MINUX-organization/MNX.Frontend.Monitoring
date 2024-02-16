import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import { FlightSheetInfo } from "../model/types";
import styles from './styles/workerItemFlightSheetTable.module.scss';
import _ from "lodash";
import clsx from "clsx";

export function WorkerItemFlightSheetTable({
  className, 
  flightSheets,
  labels,
}: {
  className?: string;
  flightSheets?: FlightSheetInfo[];
  labels?: string[];
}) {
  return ( 
    <div className={clsx(className, styles['wrapper'])}>
      <UiBgContainer className={styles['grid-title']} color="opaque">
        {_.map(labels, (label, index) => (
          <span key={index}>{label}</span>
        ))}
      </UiBgContainer>
      <div className={styles['grid-items']}>
        {_.map(flightSheets, (flightSheet) => (
          <div key={flightSheet.flightSheet} className={styles['grid-item']}>
            <span>{flightSheet.coin}</span>
            <span>{flightSheet.flightSheet}</span>
            <span>{flightSheet.miner}</span>
            <span>
              {flightSheet.hashrate.value}
              &nbsp;
              <span className={styles['measure']}>
                {flightSheet.hashrate.measureUnit}
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