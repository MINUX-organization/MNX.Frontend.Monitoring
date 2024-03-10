import { WalletItem, WalletsList } from '@/entities/wallet';
import styles from './wallets.page.module.scss';

export function Wallets() {
  return (
    <div className={styles["wallets-page"]}>
      {/* <CryptoForm/> */}
      <WalletsList
        className={styles['wallets-list']}
        renderWalletItem={(wallet) => 
          <WalletItem 
            key={wallet?.id} 
            wallet={wallet} 
            // renderDeleteButton={(crypto) => <DeleteCrypto cryptoId={crypto?.id}/>}
          />
        }
        // renderSort={() => <CryptoSort />}
        // renderSearch={() => <CryptoSearch />}
      />
    </div>
  )
}