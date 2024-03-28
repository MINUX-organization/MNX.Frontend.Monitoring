import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import styles from './styles/rigItemPanel.module.scss';
import { Rig as Type } from "../../model/types"
import { match } from "ts-pattern";
import clsx from "clsx";
import _ from "lodash";

import { UiActiveState } from "@/shared/ui/ui-active-state";
import { UiWiFiState } from "@/shared/ui/ui-wifi-state";

export function RigItemPanel({
  className,
  rig,
  onClick
} : {
  className?: string;
  rig?: Type;
  onClick?: () => void;
}) {
  const {
    name, 
    gpusState,
    isActive, 
    onlineState, 
    internetSpeed,
    averageTemperature, 
    fanSpeed, 
    power
  } = {...rig}

  /// TODO move to UI
  const gpusStateIcons = _.map(gpusState, (state, index) => ( 
    match(state)
      .with('active', () => <div key={index} className={styles['active-square']}/>)
      .with('inactive', () => <div key={index} className={styles['inactive-square']}/>) 
      .with('error', () => <div key={index} className={styles['error-square']}/>)
      .with('empty', () => <div key={index} className={styles['empty-square']}/>)
      .exhaustive()
  ))

  return (
    <UiBgContainer 
        className={clsx(
          className,
          styles['rig-item-panel']
        )} 
        color="opaque"
        onClick={onClick}
      >
        <span className={styles['item-1']}>{rig?.index ?? 'N/A'}</span>
        <span className={styles['item-2']}>{name ?? 'N/A'}</span>
        <div className={styles['item-3']}>{gpusStateIcons}</div>
        <div className={styles['item-4']}>
          <UiActiveState isActive={isActive} />
        </div>
        <div className={styles['item-5']}>
          <div>
            <UiWiFiState onlineState={onlineState} />
          </div>
          <span>{internetSpeed?.value}</span>
          <span className={styles['measure']}>{internetSpeed?.measureUnit}</span>
        </div>
        <span className={styles['item-6']}>
          {averageTemperature ?? 'N/A'}
          {averageTemperature && '°C'}
        </span>
        <span className={styles['item-7']}>
          {fanSpeed ?? 'N/A'}
          {fanSpeed && '%'}
        </span>
        <div className={styles['item-8']}>
          <span>{power?.value ?? 'N/A'}</span>
          <span className={styles['measure']}>{power?.measureUnit}</span>
        </div>
    </UiBgContainer>
  )
}