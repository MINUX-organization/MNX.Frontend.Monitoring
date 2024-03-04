import { useCryptoQuery } from "@/entities/crypto";
import styles from './deleteCrypto.module.scss';
import { Trash2 } from "lucide-react";

export function DeleteCrypto({
  cryptoId,
} : {
  cryptoId?: string;
}) {
  const { deleteCrypto } = useCryptoQuery();
  const handleClick = () => {
    if (!cryptoId) return;
    deleteCrypto.mutate(cryptoId);
  }
  return (
    <Trash2 className={styles['delete']} size={20} onClick={handleClick}/>
  )
}