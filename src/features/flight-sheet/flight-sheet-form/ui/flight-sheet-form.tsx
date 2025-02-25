/* eslint-disable react-hooks/exhaustive-deps */
import { FlightSheetFormHeader } from "./flight-sheet-form-header";
import { useEffect, useMemo, useRef, useState } from "react";
import { FlightSheetFormTarget } from "./flight-sheet-form-target";
import { flightSheetRepository, FlightSheetType, PostFlightSheetSchema } from "@/entities/flight-sheet";
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
import { flightSheetToPost } from "../utils/flight-sheet-to-post";

const targetAnimation = {
  initial: { opacity: 0, y: -30, height: 0 },
  animate: { opacity: 1, y: 0, height: "auto" },
  exit: { opacity: 0, y: -30, height: 0 },
  transition: { duration: 0.35, ease: "easeInOut" }
};

type TargetType = 'GPU' | 'CPU';

const { useFlightSheetMutation } = flightSheetRepository;

export function FlightSheetForm({
  flightSheet
} : {
  flightSheet?: FlightSheetType
}  ) {
  const [targetsState, setTargetsState] = useState<Record<TargetType, boolean>>({
    GPU: false,
    CPU: false
  });
  const { 
    setFormRef, 
    setReset,
    setMode,
    mode,
  } = useFlightSheetFormStore();
  const { addFlightSheet, editFlightSheet } = useFlightSheetMutation();
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

    const response = await match(mode)
      .with('add', () => addFlightSheet(cleanData))
      .with('edit', () => editFlightSheet({ id: flightSheet!.id, ...cleanData }))
      .exhaustive();

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

  const resetFormForEdit = (flightSheet: FlightSheetType) => {
    const postFlightSheet = flightSheetToPost(flightSheet);

    methods.reset(postFlightSheet);

    setTargetsState({
      GPU: postFlightSheet.targets.some(t => t.miningConfig.$type === 'GPU'),
      CPU: postFlightSheet.targets.some(t => t.miningConfig.$type === 'CPU')
    });
  }

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
    if (!flightSheet) {
      setMode('add');
      return;
    };

    setMode('edit');
    resetFormForEdit(flightSheet);
  }, [flightSheet]);

  useEffect(() => {
    if (!formRef.current) return;
  
    setFormRef(formRef);
  }, [formRef])

  useEffect(() => {  
    setReset(() => {
      if (mode === 'edit') {
        if (!flightSheet) return;

        resetFormForEdit(flightSheet);
        return;
      };

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
  }, [targetsState, flightSheet, mode]);

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