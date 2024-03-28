import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactNode } from "react";
import styles from './styles/uiModal.module.scss';
import { UiBorderBox } from "./ui-border-box";
import { UiBgContainer } from "./ui-bg-container";
import clsx from "clsx";

export function UiModal({
  className,
  isOpen,
  onClose,
  renderTitle,
  renderDescription,
  renderContent,
} : {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  renderTitle?: () => ReactNode;
  renderDescription?: () => ReactNode;
  renderContent?: () => ReactNode;
}) {
  return (
    <Transition 
      appear 
      show={isOpen} 
      as={Fragment}
      leave={styles['animation-leave']}
      leaveFrom={styles['animation-leave-from']}
      leaveTo={styles['animation-leave-to']}
    >
      <Dialog 
        as='div' 
        className={clsx(
          styles['modal'],
          isOpen && styles['open']
        )}
        onClose={onClose}
      > 
        <div className={styles['background']}/>
        <div className={styles['content']}>
          <div className={styles['centered']}>
            <UiBorderBox className={className}>
              <UiBgContainer color="opaque" className={styles['content-box']}>
                <Dialog.Panel>
                  <Dialog.Title>
                    {renderTitle?.()}
                  </Dialog.Title>
                  <Dialog.Description>
                    {renderDescription?.()}
                  </Dialog.Description>
                  {renderContent?.()}
                </Dialog.Panel>
              </UiBgContainer>
            </UiBorderBox>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}