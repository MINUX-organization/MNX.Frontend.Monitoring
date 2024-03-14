import styles from './walletItem.module.scss';
import { Wallet } from "../model/types";
import clsx from "clsx";
import { ReactNode } from 'react';

export function WalletItem({
  className,
  wallet,
  renderDeleteButton
}: {
  className?: string;
  wallet?: Wallet;
  renderDeleteButton?: (wallet?: Wallet) => ReactNode;
}) {
  return (
    <div className={clsx(className, styles['wallet-item'])}>
      <span>{wallet?.name}</span>
      <span>{wallet?.address}</span>
      <span>{wallet?.cryptocurrency}</span>
      <span className={styles['icon']}>{renderDeleteButton?.(wallet)}</span>
    </div>
  );
}