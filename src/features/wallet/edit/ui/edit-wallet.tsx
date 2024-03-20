import { Wallet } from "@/entities/wallet";
import { useModal } from "@/shared/lib/hooks/modal";
import { UiModal } from "@/shared/ui/ui-modal";
import { Edit3 } from "lucide-react";
import React from "react";
import styles from "./editWallet.module.scss";
import { EditWalletForm } from "./edit-wallet-form";

export function EditWallet({
  className,
  wallet
} : {
  className?: string;
  wallet?: Wallet;
}) {
  const { isOpen, onClose, onOpen } = useModal();

  return (
    <React.Fragment>
      <button className={className} onClick={onOpen}>
        <Edit3 size={20} />
      </button>
      <UiModal 
        className={styles['edit-wallet-modal']}
        isOpen={isOpen.value}
        onClose={onClose}
        renderContent={() => <EditWalletForm wallet={wallet} onClose={onClose} />}
      />
    </React.Fragment>
  )
}