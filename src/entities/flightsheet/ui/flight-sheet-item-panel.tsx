import { StateObject } from "@/shared/lib/utils/state-object";
import { FlightSheetItemProps } from "./flight-sheet-item";
import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import { UiBorderBox } from "@/shared/ui/ui-border-box";
import styles from './flightSheetItemPanel.module.scss';
import { CoinConfig, Miner } from "../modal/types";
import _ from "lodash";
import React from "react";

export function FlightSheetItemPanel({
  flightSheet,
  renderApply,
  renderEdit,
  renderDelete,
  renderOnOpen,
  isOpen,
} : {
  className?: string;
  isOpen: StateObject<boolean>;
} & FlightSheetItemProps) {
  const features = renderApply || renderEdit || renderDelete;
  const gpuMiner = _.find(flightSheet?.targets, (targets) => targets.miningConfig.$type === 'GPU')?.miner;
  const cpuMiner = _.find(flightSheet?.targets, (targets) => targets.miningConfig.$type === 'CPU')?.miner;

  return (
    <UiBorderBox onClick={() => isOpen.setValue((prev) => !prev)} className={styles['flight-sheet-item-panel']} withPadding>
      <UiBgContainer className={styles['flight-sheet-item-panel-container']} color="opaque">
        <span className={styles['name']}>
          {/* <UiActiveState className={styles['icon']}/> */}
          {flightSheet?.name}
        </span>
        <div className={styles['config-grid']}>
          {_.map(flightSheet?.targets, (targets) => {
            if (targets.miningConfig.$type === 'CPU')
              return renderConfigs(targets.miningConfig.coinConfigs, 'CPU');
            
            if (targets.miningConfig.$type === 'GPU')  
              return renderConfigs(targets.miningConfig.coinConfigs, 'GPU');
          })}
        </div>
        <div className={styles['miner-support']}>
          {renderMiners(
            [{miner: gpuMiner, label: 'GPU miner'}, 
            {miner: cpuMiner, label: 'CPU miner'}]
          )}
        </div>
        {features && <div className={styles['features']}>
          {renderApply?.(flightSheet?.id)}
          {renderEdit?.(flightSheet?.id)}
          {renderDelete?.(flightSheet?.id)}
        </div>}
        {renderOnOpen?.(isOpen)}
      </UiBgContainer>
    </UiBorderBox>
  )
}

const renderMiners = (miners: {miner: Miner | undefined, label: string}[]) => {
  return (
    <div className={styles['miner-support']}>
      {_.map(miners, ({miner, label}) => {
        return miner?.version && (
          <span key={label}>
            <span className={styles['blue']}>{label}</span>
            &nbsp;{miner?.name ?? 'N/A'}&nbsp;
            <span className={styles['gray']}>{miner?.version}</span>
          </span>
        )
      })}
    </div>
  )
}

const renderConfigs = (configs: CoinConfig[], label: string) => {
  return Object.entries(configs).map(([_keyId, config], key) => (
    <React.Fragment key={`${config.pool.id}-${config.wallet.id}-${config.pool.cryptocurrency}-${key}`}>
      <div className={styles['field']}>
        <span className={styles['label']}>{label} coin {key + 1}</span>
        <span className={styles['value']}>{config.pool.cryptocurrency}</span>
      </div>
      <div className={styles['field']}>
        <span className={styles['label']}>{label} wallet {key + 1}</span>
        <span className={styles['value']}>{config.wallet.name}</span>
      </div>
      <div className={styles['field']}>
        <span className={styles['label']}>{label} pool {key + 1}</span>
        <span className={styles['value']}>{config.pool.domain}</span>
      </div>
    </React.Fragment>
  ));
};