import { WalletItem, WalletsList } from '@/entities/wallet';
import styles from './wallets.page.module.scss';
import { DeleteWallet } from '@/features/wallet/delete';
import { WalletForm } from '@/features/wallet/form';

export function Wallets() {
  return (
    <div className={styles["wallets-page"]}>
      <WalletForm className={styles["wallet-form"]}/>
      <WalletsList
        className={styles['wallets-list']}
        renderWalletItem={(wallet) => 
          <WalletItem 
            key={wallet?.id} 
            wallet={wallet} 
            renderDeleteButton={(wallet) => <DeleteWallet walletId={wallet?.id}/>}
          />
        }
        // renderSort={() => <CryptoSort />}
        // renderSearch={() => <CryptoSearch />}
      />
    </div>
  )
}