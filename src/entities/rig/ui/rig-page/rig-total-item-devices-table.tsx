import _ from 'lodash';
import { RigTotal } from '../../model/types';
import styles from './styles/rigTotalItemDevicesTable.module.scss';

export function RigTotalItemDevicesTable({
  rig
} : {
  rig: RigTotal
}) {
  const gpusLabelsList = [
    {label: 'GPU', value: rig.totalGpusCount.total},
    {label: 'NVD', value: rig.totalGpusCount.nvidia, color: 'green'},
    {label: 'AMD', value: rig.totalGpusCount.amd, color: 'red'},
    {label: 'INT', value: rig.totalGpusCount.intel, color: 'blue'},
  ];

  const cpusLabelsList = [
    {label: 'CPU', value: rig.totalCpusCount.total},
    {label: 'AMD', value: rig.totalCpusCount.amd, color: 'red'},
    {label: 'INT', value: rig.totalCpusCount.intel, color: 'blue'},
  ];

  const hddsLabelsList = [
    {label: 'HDD', value: rig.totalHddsCount},
  ];

  return (
  <div className={styles['total-devices']}>
    <div className={styles['table']}>
      {_.map(gpusLabelsList, (label) => (
        <div className={styles['table-item']} key={label.label}>
          <span className={styles['label']}>{label.label}</span> 
          <span className={styles[`${label.color}`]}>{label.value}</span>
        </div>
      ))}
    </div>
    <div className={styles['line']} />
    <div className={styles['table']}>
      {_.map(cpusLabelsList, (label) => (
        <div className={styles['table-item']} key={label.label}>
          <span className={styles['label']}>{label.label}</span> 
          <span className={styles[`${label.color}`]}>{label.value}</span>
        </div>
      ))}
    </div>
    <div className={styles['line']} />
    <div className={styles['table']}>
      {_.map(hddsLabelsList, (label) => (
        <div className={styles['table-item']} key={label.label}>
          <span className={styles['label']}>{label.label}</span> 
          <span >{label.value}</span>
        </div>
      ))}
    </div>
  </div>
  )
} 