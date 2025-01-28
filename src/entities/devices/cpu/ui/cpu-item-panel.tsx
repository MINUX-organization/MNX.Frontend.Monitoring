import { UiBorderBox } from "@/shared/ui/ui-border-box";
import styles from './cpuItemPanel.module.scss';
import clsx from "clsx";
import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import { DeviceCpu } from "../model/types";
// import { UiActiveState } from "@/shared/ui/ui-active-state";
// import { СpuItemPanelTable } from "./cpu-item-panel-table";
// import { CpuItemPanelGrid } from "./сpu-item-panel-grid";
import { ReactNode } from "react";

export function CpuItemPanel({
  className,
  // deviceCpu,
  // renderSetting
} : {
  className?: string;
  deviceCpu: DeviceCpu
  renderSetting: (id: string) => ReactNode;
}) {
  return (
    <UiBorderBox className={clsx(className, styles['cpu-item-panel'])}>
      <UiBgContainer className={styles['cpu-item-container']} color="opaque">
        {/* <UiActiveState  isActive={deviceCpu.isActive}/> 
        <div className={styles['cpu-info']}>
          <span>{deviceCpu.name}</span>
          <span>{deviceCpu.rigName}</span>
        </div>
        <СpuItemPanelTable deviceCpu={deviceCpu} /> 
        <CpuItemPanelGrid coinsList={deviceCpu.coins} />
        {renderSetting(deviceCpu.id)} */}
      </UiBgContainer>
    </UiBorderBox>
  )
}