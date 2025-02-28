import _ from 'lodash';
import styles from './presetParametersGpu.module.scss';
import { useGpusListQuery } from '@/entities/devices/gpu';

export function PresetCard({
  gpuId
} : {
  gpuId?: string;
}) {
  const { data } = useGpusListQuery();
  const gpuName = _.find(data, ['id', gpuId]);

  return (
    <div className={styles['preset-header']}>
      <div className={styles['preset-header-item']}>
        <span className={styles['blue']}>Index:&nbsp;</span>
        <span>{gpuName?.id}</span>
        <br/>
        {/* {presetName && (<span className={styles['blue']}>{}</span>)} */}
      </div>
      <div className={styles['preset-header-item']}>
        <span>{gpuName?.information.model}</span>
        <br/>
        {/* <span className={styles['gray']}>{gpuName?.information.vendor}</span> */}
      </div>
      <div className={styles['preset-header-item']}/>
  </div>
  )
}