import styles from './walletItem.module.scss';
import { Wallet } from "../model/types";
import clsx from "clsx";
import { ReactNode } from 'react';

export function WalletItem({
  className,
  wallet,
  renderEditButton,
  renderDeleteButton
}: {
  className?: string;
  wallet?: Wallet;
  renderEditButton?: (wallet?: Wallet) => ReactNode;
  renderDeleteButton?: (wallet?: Wallet) => ReactNode;
}) {
  return (
    <div className={clsx(className, styles['wallet-item'])}>
      <span>{wallet?.name}</span>
      <span>{wallet?.address}</span>
      <span>{wallet?.cryptocurrency}</span>
      <div className={styles['icon-container']}>
        <span className={styles['icon']}>{renderEditButton?.(wallet)}</span>
        <span className={styles['icon']}>{renderDeleteButton?.(wallet)}</span>
      </div>
    </div>
  );
}