import { useParams } from "react-router-dom";
import styles from './rigGpusInfo.page.module.scss';
import { UiBorderBox } from "@/shared/ui/ui-border-box";
import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import { RigGpuInfo, RigTotalItemGpusInfo } from "@/entities/rig";
import _ from "lodash";
import React from "react";

const mockRigGpusInfo: RigGpuInfo[] = [
  {
    index: 0,
    bus: "PCI 000:04:00.0",
    name: "NVIDIA GeForce RTX 3080",
    information: {
      pciBusId: 5,
      serialNumber: "1234567890",
      memory: "10 GB GDDR6X",
      driverVersion: "515.48.07",
      parallelComputingTechnology: {
        name: "CUDA",
        version: "2.2.1"
      }
    },
    parameters: {
      coreClock: "1710 MHz",
      coreClockOffset: "+0 MHz",
      memoryClock: "19000 MHz",
      memoryClockOffset: "+0 MHz",
      voltage: "0.950 V",
      voltageOffset: "+0 mV"
    },
    overclocking: {
      coreClock: "1800 MHz",
      coreClockOffset: "+90 MHz",
      memoryClock: "20000 MHz",
      memoryClockOffset: "+1000 MHz",
      voltage: "1.000 V",
      voltageOffset: "+50 mV"
    }
  },
  {
    index: 1,
    bus: "PCI 000:05:00.0",
    name: "AMD Radeon RX 6800 XT",
    information: {
      pciBusId: 9,
      serialNumber: "ABCDEFGHIJ",
      memory: "16 GB GDDR6",
      driverVersion: "22.5.2",
      parallelComputingTechnology: {
        name: "OpenCL",
        version: "2.0.1"
      }
    },
    parameters: {
      coreClock: "2250 MHz",
      coreClockOffset: "0 MHz",
      memoryClock: "2000 MHz",
      memoryClockOffset: "0 MHz",
      voltage: "1.15 V",
      voltageOffset: "0 mV"
    },
    overclocking: {
      coreClock: "2400 MHz",
      coreClockOffset: "+150 MHz",
      memoryClock: "2150 MHz",
      memoryClockOffset: "+150 MHz",
      voltage: "1.20 V",
      voltageOffset: "+50 mV"
    }
  }
];

export function RigGpusInfo() {
  const { rigId } = useParams();

  return (
    <UiBorderBox className={styles['rig-gpus-info']}>
      <UiBgContainer color="opaque" className={styles['flex']}>
        {_.map(mockRigGpusInfo, (rigGpuInfo, index) => (
          <React.Fragment key={rigGpuInfo.index}>
            <RigTotalItemGpusInfo rigGpuInfo={rigGpuInfo} />
            {index !== mockRigGpusInfo.length - 1 && <div className={styles['divider']}/>}
          </React.Fragment>
        ))}
      </UiBgContainer>
    </UiBorderBox>
  )
}