import { CryptosList } from "@/entities/crypto";
import styles from "./cryptos.page.module.scss";
import { useCryptoQuery } from "@/entities/crypto/model/crypto.query";
import { CryptoItem } from "@/entities/crypto/ui/crypto-item";

export function Cryptos() {
  const { cryptosList, isLoading } = useCryptoQuery();

  return (
    <div className={styles["cryptos-page"]}>
      <CryptosList 
        cryptosList={cryptosList}  
        isLoading={isLoading}
        cryptoItemRender={(crypto) => <CryptoItem crypto={crypto} />}
      />

    </div>
  )
}