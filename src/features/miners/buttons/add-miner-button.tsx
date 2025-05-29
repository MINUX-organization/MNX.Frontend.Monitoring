import { PlusIcon } from "@/shared/assets/svg";
import { UiButton, UiDialog } from "@/shared/ui";
import { FC, ReactNode } from "react";

interface AddMinerButtonProps {
  renderMinerForm: (onClose?: () => void) => ReactNode
}

export const AddMinerButton: FC<AddMinerButtonProps> = ({ renderMinerForm }) => {

  return (
    <UiDialog 
      renderTrigger={() => (
        <UiButton colorPalette={'accept'}>
          Add
          <PlusIcon />
        </UiButton>
      )}
      renderTitle={() => "Add Custom Miner"}
      renderBody={(onClose) => renderMinerForm(onClose)}
    />
  );
};