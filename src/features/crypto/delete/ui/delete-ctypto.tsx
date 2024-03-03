import { useCryptoQuery } from "@/entities/crypto";
import styles from './deleteCrypto.module.scss';
import { Trash2 } from "lucide-react";

export function DeleteCrypto({
  cryptoFullName,
} : {
  cryptoFullName?: string;
}) {
  const { deleteCrypto } = useCryptoQuery();
  const handleClick = () => {
    if (!cryptoFullName) return;
    deleteCrypto.mutate(cryptoFullName);
  }
  return (
    <Trash2 className={styles['delete']} size={20} onClick={() => handleClick}/>
  )
}