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
import { useWalletRepository } from "@/entities/wallet";
import { usePoolRepository } from "@/entities/pool";
import { useMinerRepository } from "@/entities/miner";
import { mapFlightSheet } from "../utils/map-flight-sheet";

export type FormInput = {
  name: string
  targets: Target[],
}

export function FlightSheetModal() {
  const { isOpen, onOpen } = useModal();
  const navigate = useNavigate();
  const location = useLocation();
  const { flightSheetsList, addFlightSheet, editFlightSheet } = useFlightSheetRepository();
  const queryParams  = new URLSearchParams(location.search)
  const gpuTarget = useStateObject(false);
  const cpuTarget = useStateObject(false);

  const { getWalletsList } = useWalletRepository();
  const { getPoolsList } = usePoolRepository();
  const { minersList } = useMinerRepository();
  
  const flightSheetId = queryParams.get('flightSheetId');
  
  const { control, handleSubmit, watch, setValue } = useForm<FormInput>({
    defaultValues: {
      name: '',
      targets: [],
    }
  });

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const postFlightSheet = mapFlightSheet(gpuTarget.value, cpuTarget.value, data);

    if (flightSheetId) {
      const status = await editFlightSheet(flightSheetId, postFlightSheet);
      if (!status) return;
      navigate('..')
      return;
    };

    const status = await addFlightSheet(postFlightSheet);
    if (!status) return;
    navigate('..')
  }; 

  useEffect(() => {
    if (!flightSheetId) return;

    const flightSheet = _.find(flightSheetsList, (flightSheet) => flightSheet.id === flightSheetId);

    if (!flightSheet) return;

    _.forEach(flightSheet.targets, (targets) => {
      if (targets.miningConfig.$type === 'GPU') gpuTarget.setValue(true);
      if (targets.miningConfig.$type === 'CPU') cpuTarget.setValue(true);
    })

    setValue('name', flightSheet.name);
    setValue('targets', flightSheet.targets);
  }, [flightSheetId])

  useEffect(() => {
    onOpen();
    setValue('targets.0.miningConfig.$type', "CPU");
    setValue('targets.1.miningConfig.$type', "GPU");
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
            {gpuTarget.value && <TargetPart control={control} watch={watch} miners={minersList} wallets={getWalletsList()} pools={getPoolsList()} type="GPU"/>}
            {cpuTarget.value && <TargetPart control={control} watch={watch} miners={minersList} wallets={getWalletsList()} pools={getPoolsList()} type="CPU"/>}
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