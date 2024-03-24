import _ from 'lodash';
import { RigTotal } from '../../model/types';
import styles from './styles/rigTotalItemDevicesTable.module.scss';

export function RigTotalItemDevicesTable({
  rig
} : {
  rig?: RigTotal
}) {
  const gpusLabelsList = [
    {label: 'GPU', value: rig?.totalGpusCount.total ?? 'N/A'},
    {label: 'NVD', value: rig?.totalGpusCount.nvidia ?? 'N/A', color: 'green'},
    {label: 'AMD', value: rig?.totalGpusCount.amd ?? 'N/A', color: 'red'},
    {label: 'INT', value: rig?.totalGpusCount.intel ?? 'N/A', color: 'blue'},
  ];

  const cpusLabelsList = [
    {label: 'CPU', value: rig?.totalCpusCount.total ?? 'N/A'},
    {label: 'AMD', value: rig?.totalCpusCount.amd ?? 'N/A', color: 'red'},
    {label: 'NVD', value: rig?.totalCpusCount.nvidia ?? 'N/A', color: 'green'},
  ];

  const hddsLabelsList = [
    {label: 'HDD', value: rig?.totalHddsCount ?? 'N/A'},
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