import { WalletItem, WalletsList } from '@/entities/wallet';
import styles from './wallets.page.module.scss';
import { DeleteWallet } from '@/features/wallet/delete';
import { WalletForm } from '@/features/wallet/form';
import { WalletSort } from '@/features/wallet/sort';
import { WalletSearch } from '@/features/wallet/search';

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
        renderSort={() => <WalletSort />}
        renderSearch={() => <WalletSearch />}
      />
    </div>
  )
}