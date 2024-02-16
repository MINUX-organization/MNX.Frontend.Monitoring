import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import { FlightSheetInfo } from "../model/types";
import styles from './styles/workerItemFlightSheetTable.module.scss';
import _ from "lodash";

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
    <UiBgContainer className={styles['wrapper']} color="opaque">
      <div className={styles['grid-title']}>
        {_.map(labels, (label, index) => (
          <span key={index}>{label}</span>
        ))}
      </div>
      <div className={styles['grid-items']}>
        {_.map(flightSheets, (flightSheet) => (
          <div key={flightSheet.flightSheet} className={className}>
            <span>{flightSheet.coin}</span>
            <span>{flightSheet.flightSheet}</span>
            <span>{flightSheet.miner}</span>
            <span>
              {flightSheet.hashrate.value}
              &nbsp;
              <span>
                {flightSheet.hashrate.measureUnit}
              </span>
            </span>
            <span>{flightSheet.shares.accepted}</span>
            <span>{flightSheet.shares.rejected}</span>
          </div>
        ))} 
      </div>
    </UiBgContainer>
  )
}