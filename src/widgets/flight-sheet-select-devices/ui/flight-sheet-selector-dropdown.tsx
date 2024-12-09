import { ChevronDown } from "lucide-react";
import { UiSwitch } from "@/shared/ui/ui-switch";
import { FlightSheetDeviceItem } from "./flight-sheet-device-item";
import styles from './flightSheetSelectorDevices.module.scss';
import { RigDevice, RigDevices } from "@/entities/flightsheet";
import { StateObject, useStateObject } from "@/shared/lib/utils/state-object";
import _ from "lodash";
import clsx from "clsx";

export function FlightSheetSelectorDropdown({
  rig,
  isSelectedAll,
  devicesIds,
  onSelectAllDevices,
  onSelectDevice,
} : {
  rig: RigDevices,
  isSelectedAll: boolean,
  devicesIds: StateObject<Map<string, Set<string>>>,
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
      {isOpen.value && <div className={styles['devices']}>
        {_.map(rig.elements, (type) => (
          <div key={type.name} className={styles['device-type']}>
            {_.map(type.elements, (device) => (
                <FlightSheetDeviceItem 
                  rigDevice={device} 
                  key={device.id} 
                  checked={devicesIds.value.get(device.rigName)?.has(device.id) || false}
                  onSetChecked={(isChecked) => onSelectDevice(isChecked, device)}
                />
            ))}
          </div>
        ))}
      </div>}
    </div>
  )
}