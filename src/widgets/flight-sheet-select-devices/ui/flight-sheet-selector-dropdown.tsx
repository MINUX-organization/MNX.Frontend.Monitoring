import { ChevronDown } from "lucide-react";
import { UiSwitch } from "@/shared/ui/ui-switch";
import { FlightSheetDeviceItem } from "./flight-sheet-device-item";
import styles from './flightSheetSelectorDevices.module.scss';
import { RigDevice, RigDevices } from "@/entities/flightsheet";
import { useStateObject } from "@/shared/lib/utils/state-object";
import _ from "lodash";
import clsx from "clsx";
import { UiResizableBox } from "@/shared/ui/ui-resizable-box";
import { GpuSvg } from "@/shared/assets/images/gpu";
import { CpuSvg } from "@/shared/assets/images/cpu";
import React from "react";

export function FlightSheetSelectorDropdown({
  rig,
  isSelectedAll,
  devicesIds,
  onSelectAllDevices,
  onSelectDevice,
} : {
  rig: RigDevices,
  isSelectedAll: boolean,
  devicesIds: Map<string, Set<string>>,
  onSelectAllDevices: (rigName: string, isSelectedAll: boolean) => void
  onSelectDevice: (isChecked: boolean, device: RigDevice) => void
}) {
  const isOpen = useStateObject(false);

  return (
    <div key={rig.name} className={styles['rig']}>
      <div className={styles['header']}>
        <UiSwitch
          className={styles['switch']}
          checked={isSelectedAll} 
          setChecked={() => onSelectAllDevices(rig.name, isSelectedAll)}
        />
        <span className={styles['rig-name']}>{rig.name}</span>
        <div className={styles['line']} />
        <ChevronDown 
          className={clsx(
            styles['arrow-down'],
            isOpen.value && styles['open']
          )}
          size={30}
          onClick={() => isOpen.setValue((prev) => !prev)} 
        />
      </div>
      <UiResizableBox contentClassName={styles['devices']} trigger={isOpen.value}>
        {_.map(rig.elements, (type, index) => (
          <React.Fragment key={type.name}>
            <div className={styles['device-type']}>
              <div className={styles['type-header']}>
                <span className={styles['type-name']}>{type.name}</span>
                {type.name === 'GPU' && <GpuSvg className={styles['icon']}/>}
                {type.name === 'CPU' && <CpuSvg className={styles['icon']}/>}
                <div className={styles['line']} />
              </div>
              {_.map(type.elements, (device) => (
                  <FlightSheetDeviceItem 
                    rigDevice={device} 
                    key={device.id}
                    checked={devicesIds.get(device.rigName)?.has(device.id) || false}
                    onSetChecked={(isChecked) => onSelectDevice(isChecked, device)}
                  />
              ))}
            </div>
            {!index && <div className={styles['separator']} />}
          </React.Fragment>
        ))}
      </UiResizableBox>
    </div>
  )
}