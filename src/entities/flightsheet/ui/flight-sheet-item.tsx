import _ from "lodash";
import React from "react";
import { StateObject, useStateObject } from "@/shared/lib/utils/state-object";
import { FlightSheet } from "../modal/types";
import { FlightSheetItemPanel } from "./flight-sheet-item-panel";
import styles from './flightSheetItem.module.scss';
import clsx from "clsx";
import { FlightSheetItemDropdown } from "./flight-sheet-item-dropdown";

export type FlightSheetItemProps = {
  flightSheet?: FlightSheet;
  renderApply?: (flightSheetId?: string) => React.ReactNode;
  renderEdit?: (flightSheetId?: string) => React.ReactNode;
  renderDelete?: (flightSheetId?: string) => React.ReactNode;
  renderOnOpen?: (isOpen: StateObject<boolean>) => React.ReactNode;
}

export function FlightSheetItem({
  className,
  ...props
} : {
  className?: string;
} & FlightSheetItemProps) {
  const isOpen = useStateObject(false);

  return (
    <div className={clsx(className, styles['flight-sheet-item'])}>
      <FlightSheetItemPanel {...props} isOpen={isOpen} />
      <FlightSheetItemDropdown flightSheet={props.flightSheet} trigger={isOpen.value} />
    </div>
  )
}

