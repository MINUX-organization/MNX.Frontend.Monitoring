import { FlightSheet, RigDevice, RigDevices } from "@/entities/flightsheet";
import clsx from "clsx";
import styles from './flightSheetSelectorDevices.module.scss';
import _ from "lodash";
import { useEffect, useMemo } from "react";
import { FlightSheetSelectorDropdown } from "./flight-sheet-selector-dropdown";
import { useFlightSheetSelectDevicesStore } from "../model/flight-sheet-select-devices.store";
import { applyFlightSheetApi } from "@/shared/api/post/applyFlightSheet";
import { UiButton } from "@/shared/ui/ui-button";

export function FlightSheetSelectorDevices({
  className,
  rigDevices,
  flightSheet
} : {
  className?: string;
  rigDevices?: RigDevices[];
  flightSheet?: FlightSheet;
}) {
  const { 
    devicesIds,
    setDevicesIds, 
    setDevicesIdsCopy,
    devicesIdsCopy } = useFlightSheetSelectDevicesStore();

  const relevantDeviceIds = useMemo(() => {
    if (rigDevices === undefined || flightSheet === undefined) {
      return undefined;
    }

    const ids: Map<string, Set<string>> = new Map();

    console.log(rigDevices)
    _.forEach(rigDevices, (rig) => {
      _.forEach(rig.elements, (type) => {
        _.forEach(type.elements, (device) => {
          console.log("11"); 
          if (device.flightSheetName === flightSheet?.name) {
            if (!ids.has(device.rigName)) {
              ids.set(device.rigName, new Set());
            }
            ids.get(device.rigName)?.add(device.id);
          }
        });
      });
    });

    return ids;
  }, [flightSheet, rigDevices]);

  useEffect(() => {
    if (!relevantDeviceIds) {
      return;
    } 

    setDevicesIds(relevantDeviceIds);
    setDevicesIdsCopy(relevantDeviceIds);
  }, [relevantDeviceIds]);

  const selectAllDevices = (rigName: string, isSelectedAll: boolean) => {
    const currentIds = _.find(rigDevices, (rig, _) => rig.name === rigName)
      ?.elements
      .flatMap((type) => type.elements.map((device) => device.id)) || [];

    const newMap = new Map(devicesIds);

    if (isSelectedAll) {
      newMap.set(rigName, new Set());
      setDevicesIds(newMap);
      
      return;
    }

    newMap.set(rigName, new Set(currentIds));
    setDevicesIds(newMap);
  }

  const selectDevice = (isChecked: boolean, device: RigDevice) => {
    const newMap = new Map(devicesIds);

    if (!newMap.has(device.rigName)) {
      newMap.set(device.rigName, new Set());
    }

    if (isChecked) {
      newMap.get(device.rigName)?.delete(device.id);
    } else {
      newMap.get(device.rigName)?.add(device.id);
    }

    setDevicesIds(newMap);
  }

  const onSubmit = async () => {
    const devicesIdsArray: string[] = [];

    for (const [_, value] of devicesIds.entries()) {
      for (const id of value) {
        devicesIdsArray.push(id);
      }
    }

    await applyFlightSheetApi(devicesIdsArray, flightSheet?.id ?? '');
  }

  return (
    <div className={clsx(className, styles['flight-sheet-selector-devices'])}>
      {_.map(rigDevices, (rig) => {
        const totalDevices = _.reduce(rig.elements, (acc, type) => acc + type.elements.length, 0);
        const isSelectedAll = totalDevices === devicesIds.get(rig.name)?.size;
        
        return (
          <FlightSheetSelectorDropdown
            key={rig.name}
            rig={rig}
            isSelectedAll={isSelectedAll}
            devicesIds={devicesIds}
            onSelectAllDevices={selectAllDevices}
            onSelectDevice={selectDevice}
          />
        )
      })}
      
      <div className={styles['footer']}>
        <UiButton
          onClick={() => setDevicesIds(devicesIdsCopy)} 
          className={styles['button']} 
          color="red" 
          withBorder>
            Cancel
        </UiButton>
        <UiButton 
          onClick={onSubmit} 
          className={styles['button']} 
          color="blue" 
          withBorder>
            Submit
        </UiButton>
      </div>
    </div>
  )
}