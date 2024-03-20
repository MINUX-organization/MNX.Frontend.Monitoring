import styles from './deletePool.module.scss';
import { Trash2 } from "lucide-react";
import { usePoolRepository } from "@/entities/pool";

export function DeletePool({
  poolId,
} : {
  poolId?: string;
}) {
  const { deletePool } = usePoolRepository();
  
  const handleClick = () => {
    if (!poolId) return;
    deletePool(poolId);
  }

  return (
    <Trash2 className={styles['delete']} size={20} onClick={handleClick}/>
  )
}