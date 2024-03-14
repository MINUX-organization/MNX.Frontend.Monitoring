import { PoolItem, usePoolRepository } from '@/entities/pool';
import styles from './pools.page.module.scss';
import { DeletePool } from '@/features/pool/delete';
import { PoolForm } from '@/features/pool/form';
import { PoolSort } from '@/features/pool/sort';
import { PoolSearch } from '@/features/pool/search';
import { UiDomainsList } from '@/shared/ui/ui-domains-list';

export function Pools() {
  const { getPoolsList, isLoading } = usePoolRepository();

  const titleLabels = ['Domain', 'Port', 'Coin'];
  
  return (
    <div className={styles["pools-page"]}>
      <PoolForm className={styles["pool-form"]}/>
      <UiDomainsList
        className={styles['pools-list']}
        domainsList={getPoolsList()}
        titleLabels={titleLabels}
        isLoading={isLoading}
        renderDomainItem={(pool) => 
          <PoolItem 
            key={pool?.id} 
            pool={pool} 
            renderDeleteButton={(pool) => <DeletePool poolId={pool?.id}/>}
          />
        }
        renderSort={() => <PoolSort />}
        renderSearch={() => <PoolSearch />}
      />
    </div>
  )
}