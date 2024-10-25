import _ from 'lodash';
import { RigTotal } from '../../model/types';
import styles from './styles/rigTotalItemDevicesTable.module.scss';
import React from 'react';
import { UiTextTitleWrapper } from '@/shared/ui/ui-text-title-wrapper';

export function RigTotalItemDevicesTable({
  rig
} : {
  rig: RigTotal;
}) {
  const gpusLabelsList = [
    {text: 'GPU', value: rig.countDevices.totalGpusCount, color: 'white'},
    {text: 'NVD', value: rig.countDevices.totalGpusCountGroupedByManufacturer['nvidia'] ?? 0, color: 'green'},
    {text: 'AMD', value: rig.countDevices.totalGpusCountGroupedByManufacturer['amd'] ?? 0, color: 'red'},
    {text: 'INT', value: rig.countDevices.totalGpusCountGroupedByManufacturer['intel'] ?? 0, color: 'blue'},
  ];

  const cpusLabelsList = [
    {text: 'CPU', value: rig.countDevices.totalCpusCount, color: 'white'},
    {text: 'AMD', value: rig.countDevices.totalCpusCountGroupedByManufacturer['amd'] ?? 0, color: 'red'},
    {text: 'INT', value: rig.countDevices.totalCpusCountGroupedByManufacturer['intel'] ?? 0, color: 'blue'},
  ];

  const hddsLabelsList = [
    {text: 'HDD', value: rig.countDevices.totalDrivesCount, color: 'white'},
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
            <div className={styles['table-item']} key={label.text}>
              <UiTextTitleWrapper text={label.text}/>
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