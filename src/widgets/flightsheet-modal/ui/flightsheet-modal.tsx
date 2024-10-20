import { useModal } from "@/shared/lib/hooks/modal";
import { UiModal } from "@/shared/ui/ui-modal";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import styles from './flightsheetModal.module.scss';
import { UiBorderBox } from "@/shared/ui/ui-border-box";
import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import { NamePart } from "./parts/name-part";
import { SubmitHandler, useForm } from "react-hook-form";
import { useStateObject } from "@/shared/lib/utils/state-object";
import { TargetPart } from "./parts/target-part";
import { UiResizableBox } from "@/shared/ui/ui-resizable-box";
import { Target, useFlightSheetRepository } from "@/entities/flightsheet";
import clsx from "clsx";
import { UiButton } from "@/shared/ui/ui-button";
import _ from "lodash";

export type FormInput = {
  name: string
  target: Target[],
}

export function FlightSheetModal() {
  const { isOpen, onOpen } = useModal();
  const navigate = useNavigate();
  const location = useLocation();
  const { flightSheetsList, addFlightSheet, editFlightSheet } = useFlightSheetRepository();
  const queryParams  = new URLSearchParams(location.search)
  const gpuTarget = useStateObject(false);
  const cpuTarget = useStateObject(false);

  const flightSheetId = queryParams.get('flightSheetId');
  
  const { control, handleSubmit, reset, watch, setValue } = useForm<FormInput>({
    defaultValues: {
      name: '',
      target: [],
    }
  });

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    if (flightSheetId) {
      const status = await editFlightSheet(flightSheetId, data);

      if (!status) return;

      navigate('..')
      return;
    };
    
    const status = await addFlightSheet(data);

    if (!status) return;

    reset();
  }; 

  useEffect(() => {
    if (!flightSheetId) return;
    
    const flightSheet = _.find(flightSheetsList, (flightSheet) => flightSheet.id === flightSheetId);

    if (!flightSheet) return;

    _.forEach(flightSheet.target, (target) => {
      if (target.$type === 'GPU') gpuTarget.setValue(true);
      if (target.$type === 'CPU') cpuTarget.setValue(true);
    })

    setValue('name', flightSheet.name);
    setValue('target', flightSheet.target);
  }, [flightSheetId])

  useEffect(() => {
    onOpen();
  })

  return (
    <UiModal isOpen={isOpen.value} onClose={() => navigate('..')}>
      <UiBorderBox withPadding className={styles['flightsheet-modal']}>
        <UiBgContainer color="opaque" className={styles['flightsheet-modal-container']}>
          <NamePart control={control} gpuTarget={gpuTarget} cpuTarget={cpuTarget}/>
          <UiResizableBox 
            className={clsx(
              styles['target-part-container'],
              (gpuTarget.value || cpuTarget.value) && styles['active']
            )} 
            contentClassName={styles['target-part']}
          >
            {gpuTarget.value && <TargetPart control={control} watch={watch} type="GPU"/>}
            {cpuTarget.value && <TargetPart control={control} watch={watch} type="CPU"/>}
          </UiResizableBox>
          <div className={styles['buttons']}>
            {
              flightSheetId
              ? 
                <>
                  <UiButton className={styles['button']} color="red" withBorder onClick={() => navigate('..')}>Cancel</UiButton>
                  <UiButton className={styles['button']} color="blue" withBorder onClick={handleSubmit(onSubmit)}>Edit</UiButton>
                </>
              : <UiButton className={styles['button']} color="blue" withBorder onClick={handleSubmit(onSubmit)}>Create flight sheet</UiButton>
            }
          </div>
        </UiBgContainer>
      </UiBorderBox>
    </UiModal>
  )
}