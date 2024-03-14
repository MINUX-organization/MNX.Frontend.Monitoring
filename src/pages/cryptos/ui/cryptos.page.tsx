import { CryptoItem, useCryptoRepository } from "@/entities/crypto";
import styles from "./cryptos.page.module.scss";
import { CryptoForm } from "@/features/crypto/form";
import { DeleteCrypto } from "@/features/crypto/delete";
import { CryptoSort } from "@/features/crypto/sort";
import { CryptoSearch } from "@/features/crypto/search";
import { UiDomainsList } from "@/shared/ui/ui-domains-list";

export function Cryptos() {
  const { getCryptosList, isLoading } = useCryptoRepository();

  const titleLabels = ['Name', 'Full Name', 'Algorithm'];

  return (
    <div className={styles["cryptos-page"]}>
      <CryptoForm className={styles['crypto-form']}/>
      <UiDomainsList
        className={styles['cryptos-list']}
        domainsList={getCryptosList()}
        titleLabels={titleLabels}
        isLoading={isLoading}
        renderDomainItem={(crypto) => 
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