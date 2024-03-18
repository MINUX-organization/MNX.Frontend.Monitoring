import { Dialog } from "@headlessui/react";
import { ReactNode } from "react";
import styles from './styles/uiModal.module.scss';
import { UiBorderBox } from "./ui-border-box";
import { UiBgContainer } from "./ui-bg-container";

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
      <Dialog 
        as='div' 
        className={styles['modal']}
        open={isOpen}
        onClose={onClose}
      > 
        <div className={styles['background']}/>
        <div className={styles['content']}>
          <div className={styles['centered']}>
            <UiBorderBox className={className}>
              <UiBgContainer color="opaqueBlack" className={styles['content-box']}>
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
  )
}