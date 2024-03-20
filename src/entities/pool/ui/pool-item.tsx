import styles from './poolItem.module.scss';
import { Pool } from "../model/types";
import clsx from "clsx";
import { ReactNode } from 'react';

export function PoolItem({
  className,
  pool,
  renderEditButton,
  renderDeleteButton
}: {
  className?: string;
  pool?: Pool;
  renderEditButton?: (pool?: Pool) => ReactNode;
  renderDeleteButton?: (pool?: Pool) => ReactNode;
}) {
  return (
    <div className={clsx(className, styles['pool-item'])}>
      <span>{pool?.domain}</span>
      <span>{pool?.port}</span>
      <span>{pool?.cryptocurrency}</span>
      <div className={styles['icon-container']}>
        <span className={styles['icon']}>{renderEditButton?.(pool)}</span>
        <span className={styles['icon']}>{renderDeleteButton?.(pool)}</span>
      </div>
    </div>
  );
}