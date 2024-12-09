import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import { UiBorderBox } from "@/shared/ui/ui-border-box";
import { UiResizableBox } from "@/shared/ui/ui-resizable-box";
import styles from './flightSheetItemDropdown.module.scss';
import { FlightSheet, Target } from "../modal/types";
import _ from "lodash";
import React from "react";

export function FlightSheetItemDropdown({
  trigger,
  flightSheet
} : {
  trigger: boolean;
  flightSheet?: FlightSheet
}) {
  return (
    <UiResizableBox trigger={trigger}>
      <UiBorderBox className={styles['dropdown']} withPadding>
        <UiBgContainer color='opaque' className={styles['dropdown-container']}>
          {renderInfo(flightSheet?.targets)}
        </UiBgContainer>
      </UiBorderBox>
    </UiResizableBox>
  )
}

function renderInfo(targets?: Target[]) {
  return (
    <div className={styles['info']}>
      {_.map(targets, (target, index) => (
        <React.Fragment key={index}>
          {index > 0 && <div className={styles['line']}/>}
          <div key={target.miningConfig.$type} className={styles['fields']}>
            <span className={styles['title']}>{target.miningConfig.$type}</span>
            {target.miningConfig.$type === 'CPU' &&               
              <div className={styles['field']}>
                <span className={styles['label']}>Hugepages</span>
                <span className={styles['value']}>{target.miningConfig.hugePages ?? 'Default'}</span>
              </div>}
            {target.miningConfig.$type === 'CPU' &&               
              <div className={styles['field']}>
                <span className={styles['label']}>Threads</span>
                <span className={styles['value']}>{target.miningConfig.threadsCount ?? 'Default'}</span>
              </div>}
            {_.map(target.miningConfig.coinConfigs, (config, index) => ( 
              <div key={index + config.pool.id} className={styles['field']}>
                <span className={styles['label']}>Pool password {index + 1}</span>
                <span className={styles['value']}>{config.poolPassword ?? "Not set"}</span>
              </div>
            ))}
            <div className={styles['field']}>
              <span className={styles['label']}>Miner Additional parametrs</span>
              <span className={styles['value']}>{target.miningConfig.additionalArguments ?? "Not set"}</span>
            </div>
            <div className={styles['field']}>
              <span className={styles['label']}>Miner Config File</span>
              <span className={styles['value']}>{target.miningConfig.configFileContent ?? "Not set"}</span>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  )
}