import clsx from 'clsx';
import styles from './editButton.module.scss';
import { useModal } from '@/shared/lib/hooks/modal';
import React from 'react';
import { UiModal } from '@/shared/ui/ui-modal';

export function EditButton({
  className,
  text,
  renderModalContent,
} : {
  className?: string;
  text: string;
  renderModalContent?: (onClose?: () => void) => React.ReactNode;
}) {
  const { isOpen, onClose, onOpen } = useModal();

  const handle = () => {
    onOpen();
  }

  return (
    <React.Fragment>
      <button 
        className={clsx(className, styles['edit-button'])}
        onClick={handle}
      >
        {text}
      </button>
      <UiModal 
        className={styles['edit-button-modal']}
        isOpen={isOpen.value}
        onClose={onClose}
        renderContent={() => renderModalContent?.(onClose)}
      />
    </React.Fragment>
  )
}