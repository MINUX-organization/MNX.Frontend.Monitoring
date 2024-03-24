import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import styles from './styles/rigItemPanel.module.scss';
import { Rig as Type } from "../../model/types"
import { Circle } from 'lucide-react';
import { match } from "ts-pattern";
import clsx from "clsx";
import _ from "lodash";
import wifiIcon4Lines from '@/shared/assets/images/wifi-4.png'
import wifiIcon3Lines from '@/shared/assets/images/wifi-3.png'
import wifiIcon2Lines from '@/shared/assets/images/wifi-2.png'
import wifiIcon1Lines from '@/shared/assets/images/wifi-1.png'
import wifiIcon0Lines from '@/shared/assets/images/wifi-0.png'

const green = '#43C09B';
const red = '#FC4E4E';

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

  const isActiveIcon = match(isActive)
    .with(true, () => <Circle fill={green} color={green} size={15}/>)
    .otherwise(() => <Circle fill={red} color={red} size={15}/>)

  const gpusStateIcons = _.map(gpusState, (state, index) => ( 
    match(state)
      .with('active', () => <div key={index} className={styles['active-square']}/>)
      .with('inactive', () => <div key={index} className={styles['inactive-square']}/>) 
      .with('error', () => <div key={index} className={styles['error-square']}/>)
      .with('empty', () => <div key={index} className={styles['empty-square']}/>)
      .exhaustive()
  ))

  const onlineStateIcon = match(onlineState)
    .with('1', () => <img className={styles['img']} alt="wifi" src={wifiIcon4Lines}/>)
    .with('2', () => <img className={styles['img']} alt="wifi" src={wifiIcon3Lines}/>)
    .with('3', () => <img className={styles['img']} alt="wifi" src={wifiIcon2Lines}/>)
    .with('4', () => <img className={styles['img']} alt="wifi" src={wifiIcon1Lines}/>)
    .otherwise(() => <img className={styles['img']} alt="wifi" src={wifiIcon0Lines}/>)

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
        <span className={styles['item-4']}>{isActiveIcon}</span>
        <div className={styles['item-5']}>
          <span>{onlineStateIcon}</span>
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