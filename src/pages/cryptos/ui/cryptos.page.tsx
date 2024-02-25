import { CryptosList } from "@/entities/crypto";
import styles from "./cryptos.page.module.scss";
import { useCryptoQuery } from "@/entities/crypto/model/crypto.query";
import { CryptoItem } from "@/entities/crypto/ui/crypto-item";
import { CryptoForm } from "@/features/crypto/crypto-form";

export function Cryptos() {
  const { cryptosList, isLoading } = useCryptoQuery();
  return (
    <div className={styles["cryptos-page"]}>
      <CryptoForm/>
      <CryptosList 
        cryptosList={cryptosList}  
        isLoading={isLoading}
        renderCryptoItem={(crypto) => <CryptoItem crypto={crypto} />}
      /> 
    </div>
  )
}