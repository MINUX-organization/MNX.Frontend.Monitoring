import { useCryptoRepository } from "@/entities/crypto";
import styles from './deleteCrypto.module.scss';
import { Trash2 } from "lucide-react";

export function DeleteCrypto({
  cryptoId,
} : {
  cryptoId?: string;
}) {
  const { deleteCrypto } = useCryptoRepository();
  const handleClick = () => {
    if (!cryptoId) return;
    deleteCrypto(cryptoId);
  }
  return (
    <button className={styles['delete']}>
      <Trash2 size={20} onClick={handleClick}/>
    </button>
  )
}