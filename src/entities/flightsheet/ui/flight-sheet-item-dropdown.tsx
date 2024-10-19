import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import { UiBorderBox } from "@/shared/ui/ui-border-box";
import { UiResizableBox } from "@/shared/ui/ui-resizable-box";
import styles from './flightSheetItemDropdown.module.scss';
import { UiTab } from "@/shared/ui/ui-tab";
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
          <UiTab tabs={[
            { title: 'Info', render: () => renderInfo(flightSheet?.target)},
            { title: 'Devices', render: () => <div>Flights</div>},
          ]}/>
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
          <div key={target.$type} className={styles['fields']}>
            <span className={styles['title']}>{target.$type}</span>
            {target.$type === 'CPU' &&               
              <div key={index} className={styles['field']}>
                <span className={styles['label']}>Hugepages</span>
                <span className={styles['value']}>{target.hugePage}</span>
              </div>}
              {/* threads */}
            {_.map(target.configs, (config, index) => ( 
              <div key={index} className={styles['field']}>
                <span className={styles['label']}>Pool password {index + 1}</span>
                <span className={styles['value']}>{config.poolPassword}</span>
              </div>
            ))}
            <div className={styles['field']}>
              <span className={styles['label']}>Miner Additional parametrs</span>
              <span className={styles['value']}>{target.additionalArguments}</span>
            </div>
            <div className={styles['field']}>
              <span className={styles['label']}>Miner Config File</span>
              <span className={styles['value']}>{target.configFile}</span>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  )
}