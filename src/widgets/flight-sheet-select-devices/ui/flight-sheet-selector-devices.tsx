import { RigDevice, RigDevices, useFlightSheetByIdQuery } from "@/entities/flightsheet";
import clsx from "clsx";
import styles from './flightSheetSelectorDevices.module.scss';
import { useStateObject } from "@/shared/lib/utils/state-object";
import _ from "lodash";
import { useParams } from "react-router";
import { useEffect, useMemo } from "react";
import { FlightSheetSelectorDropdown } from "./flight-sheet-selector-dropdown";

const rigDevicesMock: RigDevices[] = [
  {
    name: 'Rig Mock 222222',
    elements: [
      {
        name: 'GPU',
        elements: [
          {
            id: '1',
            name: 'RTX 3080',
            manufacturer: 'NVIDIA',
            type: 'GPU',
            rigName: 'Rig Mock 222222',
            flightSheetName: 'Flight Sheet 1',
            minerName: 'Miner 1',
            pciBus: '0000:00:00.0',
            flightSheetIsConfirm: true,
          },
          {
            id: '2',
            name: 'RTX 3090',
            manufacturer: 'AMD',
            type: 'GPU',
            rigName: 'Rig Mock 222222',
            flightSheetName: 'Flight Sheet 1',
            minerName: 'Miner 1',
            pciBus: '0000:00:00.0',
            flightSheetIsConfirm: true,
          }
        ]
      },
      {
        name: 'CPU',
        elements: [
          {
            id: '3',
            name: 'CPU 1',
            manufacturer: 'INTEL',
            type: 'CPU',
            rigName: 'Rig Mock 222222',
            flightSheetName: 'Flight Sheet 1',
            minerName: 'Miner 1',
            pciBus: '0000:00:00.0',
            flightSheetIsConfirm: true,
          }
        ]
      }
    ]
  }
]

export function FlightSheetSelectorDevices({
  className,
  rigDevices,
} : {
  className?: string;
  rigDevices?: RigDevices[];
}) {
  const { flightSheetId } = useParams();
  const { flightSheet } = useFlightSheetByIdQuery(flightSheetId);

  const devicesIds = useStateObject<Map<string, Set<string>>>(new Map());

  const relevantDeviceIds = useMemo(() => {
    const ids: Map<string, Set<string>> = new Map();

    _.forEach(rigDevicesMock, (rig) => {
      _.forEach(rig.elements, (type) => {
        _.forEach(type.elements, (device) => {
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
  }, [flightSheet]);

  useEffect(() => {
    devicesIds.setValue(relevantDeviceIds);
  }, [relevantDeviceIds]);

  const selectAllDevices = (rigName: string, isSelectedAll: boolean) => {
    const currentIds = _.find(rigDevicesMock, (rig, _) => rig.name === rigName)
      ?.elements
      .flatMap((type) => type.elements.map((device) => device.id)) || [];

    if (isSelectedAll) {
      devicesIds.setValue(prev => {
        const newMap = new Map(prev);
        newMap.set(rigName, new Set());
        return newMap;
      });
      
      return;
    }

    devicesIds.setValue(prev => {
      const newMap = new Map(prev);
      newMap.set(rigName, new Set(currentIds));
      return newMap;
    });
  }

  const selectDevice = (isChecked: boolean, device: RigDevice) => {
    devicesIds.setValue(prev => {
      const newMap = new Map(prev);

      if (isChecked) {
        if (newMap.get(device.rigName)?.delete(device.id)) return newMap;
        return newMap;
      }

      newMap.set(device.rigName, new Set([...newMap.get(device.rigName) || [], device.id]));
      return newMap;
    })
  }

  return (
    <div className={clsx(className, styles['flight-sheet-selector-devices'])}>
      {_.map(rigDevicesMock, (rig) => {
        const totalDevices = _.reduce(rig.elements, (acc, type) => acc + type.elements.length, 0);
        const isSelectedAll = totalDevices === devicesIds.value.get(rig.name)?.size;
        
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
    </div>
  )
}