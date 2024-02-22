import styles from './cryptoItem.module.scss';
import { Crypto } from "../model/types";
import { Trash2 } from "lucide-react";
import clsx from "clsx";

export function CryptoItem({
  className,
  crypto
}: {
  className?: string;
  crypto?: Crypto;
}) {
  return (
    <div className={clsx(className, styles['crypto-item'])}>
      <span>{crypto?.shortName}</span>
      <span>{crypto?.fullName}</span>
      <span>{crypto?.algorithm}</span>
      <Trash2 className={styles['icon']} size={20}/>
    </div>
  );
}