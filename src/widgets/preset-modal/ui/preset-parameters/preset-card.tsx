import styles from './presetParametersGpu.module.scss';

export function PresetCard({
  gpuId
} : {
  gpuId?: string;
}) {
  const presetName = 'preset-123';
  const gpuName = 'Nvidia RTX 3080 Ti';
  const ven = 'Samsung GDDR6';

  return (
    <div className={styles['preset-header']}>
      <div className={styles['preset-header-item']}>
        <span className={styles['blue']}>Index:&nbsp;</span>
        <span>{gpuId}</span>
        <br/>
        {presetName && (<span className={styles['blue']}>{presetName}</span>)}
      </div>
      <div className={styles['preset-header-item']}>
        <span>{gpuName}</span>
        <br/>
        <span className={styles['gray']}>{ven}</span>
      </div>
      <div className={styles['preset-header-item']}/>
  </div>
  )
}