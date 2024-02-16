import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import styles from './styles/workerItemPanel.module.scss';
import { Worker as Type } from "../model/types"
import { Circle, Square } from 'lucide-react';
import clsx from "clsx";
import { match } from "ts-pattern";
import _ from "lodash";

const green = '#43C09B';
const red = '#FC4E4E';

export function WorkerItemPanel({
  className,
  worker,
  onClick
} : {
  className?: string;
  worker?: Type;
  onClick?: () => void;
}) {
  const {
    id, name, gpusState,
    isActive, onlineState, onlineSpeed,
    averageTemperature, fanSpeed, power
  } = {...worker}
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
  return (
    <UiBgContainer 
        className={clsx(
          className,
          styles['wrapper']
        )} 
        color="opaque"
        onClick={onClick}
      >
        <span className={styles['item-1']}>{id ?? 'N/A'}</span>
        <span className={styles['item-2']}>{name ?? 'N/A'}</span>
        <div className={styles['item-3']}>{gpusStateIcons}</div>
        <span className={styles['item-4']}>{isActiveIcon}</span>
        <div className={styles['item-5']}>
          <span>{onlineState ?? 'N/A'}</span>
          {onlineState && <span>&nbsp;{onlineSpeed?.value}</span>}
          {onlineState && <span className={styles['measure']}>&nbsp;{onlineSpeed?.measureUnit}</span>}
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