import { CryptosList, CryptoItem } from "@/entities/crypto";
import styles from "./cryptos.page.module.scss";
import { CryptoForm } from "@/features/crypto/form";
import { DeleteCrypto } from "@/features/crypto/delete";
import { CryptoSort } from "@/features/crypto/sort";
import { CryptoSearch } from "@/features/crypto/search";

export function Cryptos() {
  return (
    <div className={styles["cryptos-page"]}>
      <CryptoForm/>
      <CryptosList
        className={styles['cryptos-list']}
        renderCryptoItem={(crypto) => 
          <CryptoItem 
            key={crypto?.id} 
            crypto={crypto} 
            renderDeleteButton={(crypto) => <DeleteCrypto cryptoId={crypto?.id}/>}
          />
        }
        renderSort={() => <CryptoSort />}
        renderSearch={() => <CryptoSearch />}
      />
    </div>
  )
}