import { WalletItem, useWalletRepository } from '@/entities/wallet';
import styles from './wallets.page.module.scss';
import { DeleteWallet } from '@/features/wallet/delete';
import { WalletForm } from '@/features/wallet/form';
import { WalletSort } from '@/features/wallet/sort';
import { WalletSearch } from '@/features/wallet/search';
import { UiDomainsList } from '@/shared/ui/ui-domains-list';
import { EditWallet } from '@/features/wallet/edit';

export function Wallets() {
  const { getWalletsList, isLoading } = useWalletRepository();

  const titleLabels = ['Wallet Name', 'Address', 'Coin'];
  
  return (
    <div className={styles["wallets-page"]}>
      <WalletForm className={styles["wallet-form"]}/>
      <UiDomainsList
        className={styles['wallets-list']}
        domainsList={getWalletsList()}
        titleLabels={titleLabels}
        isLoading={isLoading}
        renderDomainItem={(wallet) => 
          <WalletItem 
            key={wallet?.id} 
            wallet={wallet}
            renderEditButton={(wallet) => <EditWallet wallet={wallet}/>}
            renderDeleteButton={(wallet) => <DeleteWallet walletId={wallet?.id}/>}
          />
        }
        renderSort={() => <WalletSort />}
        renderSearch={() => <WalletSearch />}
      />
    </div>
  )
}