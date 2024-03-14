import { PoolItem, PoolsList } from '@/entities/pool';
import styles from './pools.page.module.scss';
import { DeletePool } from '@/features/pool/delete';
import { PoolForm } from '@/features/pool/form';
import { PoolSort } from '@/features/pool/sort';
import { PoolSearch } from '@/features/pool/search';

export function Pools() {
  return (
    <div className={styles["pools-page"]}>
      <PoolForm className={styles["pool-form"]}/>
      <PoolsList
        className={styles['pools-list']}
        renderPoolItem={(pool) => 
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