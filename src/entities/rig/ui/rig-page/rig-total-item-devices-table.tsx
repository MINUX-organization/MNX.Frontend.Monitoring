import _ from 'lodash';
import { RigTotal } from '../../model/types';
import styles from './styles/rigTotalItemDevicesTable.module.scss';
import React from 'react';

export function RigTotalItemDevicesTable({
  rig
} : {
  rig: RigTotal
}) {
  const gpusLabelsList = [
    {label: 'GPU', value: rig.totalGpusCount.total, color: 'white'},
    {label: 'NVD', value: rig.totalGpusCount.nvidia, color: 'green'},
    {label: 'AMD', value: rig.totalGpusCount.amd, color: 'red'},
    {label: 'INT', value: rig.totalGpusCount.intel, color: 'blue'},
  ];

  const cpusLabelsList = [
    {label: 'CPU', value: rig.totalCpusCount.total, color: 'white'},
    {label: 'AMD', value: rig.totalCpusCount.amd, color: 'red'},
    {label: 'INT', value: rig.totalCpusCount.intel, color: 'blue'},
  ];

  const hddsLabelsList = [
    {label: 'HDD', value: rig.totalHddsCount, color: 'white'},
  ];

  const fieldsList = [
    gpusLabelsList,
    cpusLabelsList,
    hddsLabelsList
  ]

  return (
  <div className={styles['total-devices']}>
    {_.map(fieldsList, (labelsList, index) => (
      <React.Fragment key={index}>
        <div className={styles['table']}>
          {_.map(labelsList, (label) => (
            <div className={styles['table-item']} key={label.label}>
              <span className={styles['label']}>{label.label}</span> 
              <span className={styles[`${label.color}`]}>{label.value}</span>
            </div>
          ))}
        </div>
        {labelsList.length != index - 1 && <div className={styles['line']} />}
      </React.Fragment>
    ))}
  </div>
  )
} 