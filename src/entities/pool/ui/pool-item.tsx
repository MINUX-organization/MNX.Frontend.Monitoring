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
    <div className={clsx(className, styles['pool-item'])}>
      <span>{pool?.domain}</span>
      <span>{pool?.port}</span>
      <span>{pool?.cryptocurrency}</span>
      <span className={styles['icon']}>{renderDeleteButton?.(pool)}</span>
    </div>
  );
}