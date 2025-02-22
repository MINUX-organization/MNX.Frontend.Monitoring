/* eslint-disable react-hooks/exhaustive-deps */
import { FlightSheetFormHeader } from "./flight-sheet-form-header";
import { useEffect, useMemo, useRef, useState } from "react";
import { FlightSheetFormTarget } from "./flight-sheet-form-target";
import { flightSheetRepository, PostFlightSheetSchema } from "@/entities/flight-sheet";
import { minerRepository } from "@/entities/miner";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { PostFlightSheetType } from "@/entities/flight-sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFlightSheetFormStore } from "../model/flight-sheet-form.store";
import { AnimatePresence, motion } from "motion/react";
import { Separator, Stack } from "@chakra-ui/react";
import { match } from "ts-pattern";
import _ from "lodash";
import { deepClean } from "@/shared/lib/utils/deep-clean";
import { isSuccessResponse } from "@/shared/api";
import { useNavigate } from "@tanstack/react-router";

const targetAnimation = {
  initial: { opacity: 0, y: -30, height: 0 },
  animate: { opacity: 1, y: 0, height: "auto" },
  exit: { opacity: 0, y: -30, height: 0 },
  transition: { duration: 0.35, ease: "easeInOut" }
};

type TargetType = 'GPU' | 'CPU';

const { useMinerQuery } = minerRepository;
const { useFlightSheetMutation } = flightSheetRepository;

// {
//   flightSheet
// } : {
//   flightSheet?: FlightSheetType
// }  

export function FlightSheetForm() {
  const [targetsState, setTargetsState] = useState<Record<TargetType, boolean>>({
    GPU: false,
    CPU: false
  });
  const { 
    setFormRef, 
    setReset,
  } = useFlightSheetFormStore();
  const { miners } = useMinerQuery();
  const { addFlightSheet } = useFlightSheetMutation();
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const methods = useForm<PostFlightSheetType>({
    defaultValues: { name: '', targets: [] },
    resolver: zodResolver(PostFlightSheetSchema),
    mode: 'onChange'
  });

  const targets = useWatch({ control: methods.control, name: 'targets' });

  const handleSubmit = async (data: PostFlightSheetType) => {
    const cleanData = deepClean(data);

    const response = await addFlightSheet(cleanData);

    if (isSuccessResponse(response))
      navigate({ to: '..' });
  };

  const handleTargetToggle = (type: TargetType, isOpen: boolean) => {
    setTargetsState(prev => ({ ...prev, [type]: isOpen }));
    updateTargets(type, isOpen);
  };

  const updateTargets = (type: TargetType, isOpen: boolean) => {
    const newTargets = targets.filter(t => t.miningConfig.$type !== type);

    if (isOpen) {
      newTargets.push(createTarget(type));
    }

    methods.setValue('targets', newTargets);
  };

  const createTarget = (type: TargetType, length: number = 1) => match(type)
    .with('CPU', () => ({
      minerId: '',
      miningConfig: {
        $type: type,
        configFileContent: '',
        additionalArguments: '',
        coinConfigs: _.times(length, () => ({
          poolId: '',
          walletId: '',
          poolPassword: '',
        })),
        threadsCount: '',
        hugePages: '',
      }
    }))
    .with('GPU', () => ({
      minerId: '',
      miningConfig: {
        $type: type,
        configFileContent: '',
        additionalArguments: '',
        coinConfigs: _.times(length, () => ({
          poolId: '',
          walletId: '',
          poolPassword: '',
        }))
      }
    }))
    .exhaustive();

  useEffect(() => {
    if (!formRef.current) return;
  
    setFormRef(formRef);
  }, [formRef])

  useEffect(() => {  
    setReset(() => {
      const coinConfigsCpuLength = targets[targetIndices.CPU]?.miningConfig?.coinConfigs?.length;
      const coinConfigsGpuLength = targets[targetIndices.GPU]?.miningConfig?.coinConfigs?.length;

      const newTargets = [];

      if (targetsState.CPU)
        newTargets.push(createTarget('CPU', coinConfigsCpuLength >= 0 ? coinConfigsCpuLength : 1))

      if (targetsState.GPU)
        newTargets.push(createTarget('GPU', coinConfigsGpuLength >= 0 ? coinConfigsGpuLength : 1))

      methods.reset({
        name: '',
        targets: newTargets,
      });
    });
  }, [methods, setReset, targetsState]);

  const targetIndices = useMemo(() => ({
    GPU: targets.findIndex(t => t?.miningConfig?.$type === 'GPU'),
    CPU: targets.findIndex(t => t?.miningConfig?.$type === 'CPU')
  }), [targets]);

  const renderAnimatedTarget = (type: TargetType) => {
    const isOpen = targetsState[type];
    const index = targetIndices[type];
    
    return (
      <AnimatePresence key={`${type}-target`} mode="wait">
        {isOpen && index > -1 && (
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={targetAnimation}
            style={{ overflow: "hidden" }}
          >
            <FlightSheetFormTarget 
              pt={2} 
              type={type} 
              targetIndex={index} 
              miners={miners}
            />
            {type === 'GPU' && targetsState.CPU && <Separator mt={4} borderColor="whiteAlpha.200" />}
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <FormProvider {...methods}>
      <Stack>
        <form onSubmit={methods.handleSubmit(handleSubmit)} ref={formRef}>
          <FlightSheetFormHeader 
            gpuSwitchValue={targetsState.GPU}
            cpuSwitchValue={targetsState.CPU}
            onCpuSwitch={(v) => handleTargetToggle('CPU', v)}
            onGpuSwith={(v) => handleTargetToggle('GPU', v)}
          />
          
          {(targetsState.GPU || targetsState.CPU) && (
            <Separator flex={1} borderColor="whiteAlpha.200" mt={4} />
          )}

          {renderAnimatedTarget('GPU')}
          {renderAnimatedTarget('CPU')}
        </form>
      </Stack>
    </FormProvider>
  );
}