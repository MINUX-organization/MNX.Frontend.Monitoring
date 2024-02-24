import styles from './cryptoItem.module.scss';
import { Crypto } from "../model/types";
import clsx from "clsx";
import { ReactNode } from 'react';

export function CryptoItem({
  className,
  crypto,
  renderDeleteButton
}: {
  className?: string;
  crypto?: Crypto;
  renderDeleteButton?: () => ReactNode;
}) {
  return (
    <div className={clsx(className, styles['crypto-item'])}>
      <span>{crypto?.shortName}</span>
      <span>{crypto?.fullName}</span>
      <span>{crypto?.algorithm}</span>
      <span className={styles['icon']}>{renderDeleteButton?.()}</span>
    </div>
  );
}