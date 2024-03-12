import styles from './deleteWallet.module.scss';
import { Trash2 } from "lucide-react";
import { useWalletRepository } from "@/entities/wallet";

export function DeleteWallet({
  walletId,
} : {
  walletId?: string;
}) {
  const { deleteWallet } = useWalletRepository();
  const handleClick = () => {
    if (!walletId) return;
    deleteWallet.mutate(walletId);
  }
  return (
    <Trash2 className={styles['delete']} size={20} onClick={handleClick}/>
  )
}