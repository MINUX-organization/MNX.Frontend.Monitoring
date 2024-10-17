import { useModal } from "@/shared/lib/hooks/modal";
import { UiModal } from "@/shared/ui/ui-modal";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import styles from './flightsheetModal.module.scss';
import { UiBorderBox } from "@/shared/ui/ui-border-box";
import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import { NamePart } from "./parts/name-part";
import { SubmitHandler, useForm } from "react-hook-form";
import { useStateObject } from "@/shared/lib/utils/state-object";
import { TargetPart } from "./parts/target-part";
import { UiResizableBox } from "@/shared/ui/ui-resizable-box";
import { Target } from "@/entities/flightsheet";

export type FormInput = {
  name: string
  target: Target[],
}

export function FlightSheetModal() {
  const { isOpen, onOpen } = useModal();
  const navigate = useNavigate();
  const gpuTarget = useStateObject(false);
  const cpuTarget = useStateObject(false);

  
  const { control, handleSubmit, reset, watch } = useForm<FormInput>({
    defaultValues: {
      name: '',
      target: [],
    }
  });

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    console.log(data);
    // reset();
  }; 

  useEffect(() => {
    onOpen();
  })

  return (
    <UiModal isOpen={isOpen.value} onClose={() => navigate('..')}>
        <UiBorderBox withPadding className={styles['flightsheet-modal']}>
          <UiBgContainer color="opaque">
            <NamePart control={control} gpuTarget={gpuTarget} cpuTarget={cpuTarget}/>
            <UiResizableBox className={styles['resizable-box']}>
              {gpuTarget.value && <TargetPart control={control} watch={watch} type="GPU"/>}
              {cpuTarget.value && <TargetPart control={control} watch={watch} type="CPU"/>}
            </UiResizableBox>
            <button onClick={handleSubmit(onSubmit)} className={styles['submit-button']}>
              Submit
            </button>
          </UiBgContainer>
        </UiBorderBox>
    </UiModal>
  )
}