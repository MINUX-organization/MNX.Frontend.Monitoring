import { CryptosList } from "@/entities/crypto";
import styles from "./cryptos.page.module.scss";
import { useCryptoQuery } from "@/entities/crypto/model/crypto.query";
import { CryptoItem } from "@/entities/crypto/ui/crypto-item";
import { CryptoForm } from "@/features/crypto/crypto-form";
import { DeleteCrypto } from "@/features/crypto/delete";

export function Cryptos() {
  const { cryptosList, isLoading } = useCryptoQuery();
  return (
    <div className={styles["cryptos-page"]}>
      <CryptoForm/>
      <CryptosList 
        cryptosList={cryptosList}  
        isLoading={isLoading}
        renderCryptoItem={(crypto) => 
        <CryptoItem 
          key={crypto.fullName} 
          crypto={crypto} 
          renderDeleteButton={(crypto) => <DeleteCrypto cryptoFullName={crypto?.fullName}/>}
        />}
      /> 
    </div>
  )
}