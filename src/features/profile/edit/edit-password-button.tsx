import { useModal } from '@/shared/lib/hooks/modal';
import { UiButton } from '@/shared/ui/ui-button';
import { UiModal } from '@/shared/ui/ui-modal';
import React from 'react';
import { EditPasswordForm } from '../form';

export function EditPasswordButton({
  className
} : {
  className?: string
}) {
  const { isOpen, onClose, onOpen } = useModal();

  const handle = () => {
    onOpen();
  }

  return (
    <React.Fragment>
      <UiButton onClick={handle} className={className} color="blue" withBorder>
        Edit password
      </UiButton>
      <UiModal 
        isOpen={isOpen.value} 
        onClose={onClose}
        renderContent={() => <EditPasswordForm onClose={onClose}/>}
      />
    </React.Fragment>
  )
}