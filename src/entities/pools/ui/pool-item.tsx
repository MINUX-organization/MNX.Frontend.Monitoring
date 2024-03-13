import styles from './poolItem.module.scss';
import { Pool } from "../model/types";
import clsx from "clsx";
import { ReactNode } from 'react';

export function PoolItem({
  className,
  pool,
  renderDeleteButton
}: {
  className?: string;
  pool?: Pool;
  renderDeleteButton?: (pool?: Pool) => ReactNode;
}) {
  return (
    <div className={clsx(className, styles['wallet-item'])}>
      <span>{pool?.domain}</span>
      <span>{pool?.cryptocurrency}</span>
      <span>{pool?.address}</span>
      <span className={styles['icon']}>{renderDeleteButton?.(pool)}</span>
    </div>
  );
}