import { Pool } from "@/entities/pool";
import { useModal } from "@/shared/lib/hooks/modal";
import { UiModal } from "@/shared/ui/ui-modal";
import { Edit3 } from "lucide-react";
import React from "react";
import styles from "./editPool.module.scss";
import { EditPoolForm } from "./edit-pool-form";

export function EditPool({
  className,
  pool
} : {
  className?: string;
  pool?: Pool;
}) {
  const { isOpen, onClose, onOpen } = useModal();

  return (
    <React.Fragment>
      <button className={className} onClick={onOpen}>
        <Edit3 size={20} />
      </button>
      <UiModal 
        className={styles['edit-pool-modal']}
        isOpen={isOpen.value}
        onClose={onClose}
        renderContent={() => <EditPoolForm pool={pool} onClose={onClose} />}
      />
    </React.Fragment>
  )
}