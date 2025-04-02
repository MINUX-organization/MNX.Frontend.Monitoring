import { minerRepository, MinerType } from "@/entities/miner"
import { poolRepository, PoolType } from "@/entities/pool"
import { walletRepository, WalletType } from "@/entities/wallet"
import { Device, DevicesIcons, UiField, UiInput, UiSelect, UiTextarea, UiToggler } from "@/shared/ui"
import { FileInput } from "@/shared/ui/file-upload"
import { FileUploadFileAcceptDetails, FileUploadHiddenInput, FileUploadRootProvider, Stack, StackProps, useFileUpload } from "@chakra-ui/react"
import find from "lodash/find"
import map from "lodash/map"
import slice from "lodash/slice"
import range from "lodash/range"
import { useCallback, useEffect, useMemo, useState } from "react"
import { Controller, useFormContext, useWatch } from "react-hook-form"
import { match } from "ts-pattern"
import { useFlightSheetFormStore } from "../model/flight-sheet-form.store"
const { useWalletQuery } = walletRepository;
const { usePoolQuery } = poolRepository;
const { useMinerQuery } = minerRepository;

export interface FlightSheetFormTargetProps extends StackProps {
  type: 'GPU' | 'CPU'
  targetIndex: number;
}

const transformMiningMode = (item?: string) => match(item)
  .with('Single', () => 1)
  .with('Dual', () => 2)
  .with('Triple', () => 3)
  .otherwise(() => 1)

export function FlightSheetFormTarget({
  type,
  targetIndex,
  ...props
}: FlightSheetFormTargetProps) {
  const isCpu = type === 'CPU'

  const fileUpload = useFileUpload({
    maxFiles: 1,
    accept: 'text/plain',
    onFileAccept: (details) => handleFileChange(details),
  })
  const { control, formState: { errors }, setValue, clearErrors } = useFormContext()
  const targets = useWatch({
    control,
    name: `targets`,
  });
  const [maxMiningMode, setMaxMiningMode] = useState(1)
  const [savedCurrentMiningMode, setSavedCurrentMiningMode] = useState(1)
  const [currentMiningMode, setCurrentMiningMode] = useState(() => {    
    const initialConfigs = targets[targetIndex]?.miningConfig?.coinConfigs;
    setSavedCurrentMiningMode(initialConfigs?.length || 1);
    return initialConfigs?.length || 1;
  });
  const { pools } = usePoolQuery()
  const { wallets } = useWalletQuery()
  const { miners } = useMinerQuery();
  const { addClearUploadFiles, mode } = useFlightSheetFormStore();

  const miner = useMemo(() => {
    if (!targets[targetIndex]?.minerId) return;
    const miner = find(miners, { id: targets?.[targetIndex]?.minerId })
    return miner
  }, [targets, targetIndex, miners])

  const handleFileChange = useCallback(
    (uloadedFile: FileUploadFileAcceptDetails) => {
      const file = uloadedFile.files?.[0];
      if (!file) return;
  
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target?.result as string;
        setValue(`targets.${targetIndex}.miningConfig.configFileContent`, fileContent);
      };
      reader.readAsText(file);
    },
    [setValue, targetIndex]
  );

  useEffect(() => {
    if (miner) {
      const maxMode = transformMiningMode(miner.miningMode);
      setMaxMiningMode(maxMode);
      
      if (currentMiningMode > maxMode) {
        setCurrentMiningMode(maxMode);
      }
    }
  }, [miner, currentMiningMode]);

  useEffect(() => {
    if (!targets[targetIndex]?.miningConfig || type === "CPU") return;

    const currentConfigs = targets[targetIndex].miningConfig.coinConfigs;
    
    const safeMiningMode = Math.max(currentMiningMode, 1);
  
    const newCoinConfigs = Array.from({ length: safeMiningMode }, (_, index) => {
      return index < currentConfigs.length 
        ? currentConfigs[index] 
        : { 
            poolId: '', 
            walletId: '', 
            poolPassword: '' 
          };
    });
  
    setValue(
      `targets.${targetIndex}.miningConfig.coinConfigs`,
      newCoinConfigs
    );  
  
    if (currentConfigs.length > safeMiningMode) {
      range(safeMiningMode, currentConfigs.length).forEach((index) => {
        clearErrors(`targets.${targetIndex}.miningConfig.coinConfigs.${index}`);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMiningMode]);

  useEffect(() => {
    addClearUploadFiles(() => {
      if (mode === 'edit') {
        fileUpload?.clearFiles()
        setCurrentMiningMode(savedCurrentMiningMode);
        return;
      }

      fileUpload?.clearFiles()
      setMaxMiningMode(1);
      setCurrentMiningMode(1);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const slisedModes = useMemo(
    () => slice(['Single', 'Dual', 'Triple'], 0, maxMiningMode), 
    [maxMiningMode]
  )

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const targetsErrors = errors?.targets as unknown as any[]

  const renderCommonFields = (index: number) => (
    <>
      <UiField 
        label={`${type} Pool ${index + 1}`} 
        invalid={!!targetsErrors?.[targetIndex]?.miningConfig?.coinConfigs?.[index]?.poolId}
        errorText={targetsErrors?.[targetIndex]?.miningConfig?.coinConfigs?.[index]?.poolId?.message?.toString()}
      >
        <Controller
          control={control}
          name={`targets.${targetIndex}.miningConfig.coinConfigs.${index}.poolId`}
          render={({ field }) => {
            const poolId = targets[targetIndex]?.miningConfig?.coinConfigs?.[index]?.poolId
            return <UiSelect<PoolType>
              invalid={!!targetsErrors?.[targetIndex]?.miningConfig?.coinConfigs?.[index]?.poolId}
              placeholder="Select pool"
              items={pools ?? []}
              getLabel={(item) => `${item.domain} - ${item.cryptocurrency}`}
              onChange={(item) => field.onChange(item?.id)}
              selectedItem={find(pools, { id: poolId })}
            />
          }}
        />
      </UiField>

      <UiField 
        label={`${type} Wallet ${index + 1}`}
        invalid={!!targetsErrors?.[targetIndex]?.miningConfig?.coinConfigs?.[index]?.walletId}
        errorText={targetsErrors?.[targetIndex]?.miningConfig?.coinConfigs?.[index]?.walletId?.message?.toString()}
      >
        <Controller
          control={control}
          name={`targets.${targetIndex}.miningConfig.coinConfigs.${index}.walletId`}
          render={({ field }) => {
            const walletId = targets[targetIndex]?.miningConfig?.coinConfigs?.[index]?.walletId

            return <UiSelect<WalletType>
              invalid={!!targetsErrors?.[targetIndex]?.miningConfig?.coinConfigs?.[index]?.walletId}
              placeholder="Select wallet"
              items={wallets ?? []}
              getLabel={(item) => `${item.name} - ${item.cryptocurrency}`}
              onChange={(item) => field.onChange(item?.id)}
              selectedItem={find(wallets, { id: walletId })}
            />
          }}
        />
      </UiField>
      <UiField 
        optionalText={'Optional'}
        label={`${type} Pool Password ${index + 1}`}
        invalid={!!targetsErrors?.[targetIndex]?.miningConfig?.coinConfigs?.[index]?.poolPassword}
        errorText={targetsErrors?.[targetIndex]?.miningConfig?.coinConfigs?.[index]?.poolPassword?.message?.toString()}
      >
        <Controller
          control={control}
          name={`targets.${targetIndex}.miningConfig.coinConfigs.${index}.poolPassword`}
          render={({ field }) => <UiInput placeholder="Write pool password" {...field} value={field.value || ''}/>}
        />
      </UiField>
    </>
  )

  return (
    <Stack gap={4} {...props}>
      <Stack direction={{ base: 'column', md: 'row'}}>
        <UiField 
          label={`${type} Miner`} 
          maxW="20rem" w="full" mr={4}
          invalid={!!targetsErrors?.[targetIndex]?.minerId}
          errorText={targetsErrors?.[targetIndex]?.minerId?.message?.toString()} 
        >
          <Controller
            control={control}
            name={`targets.${targetIndex}.minerId`}
            render={({ field }) => (
              <UiSelect<MinerType>
                invalid={!!targetsErrors?.[targetIndex]?.minerId}
                placeholder="Select miner"
                items={miners ?? []}
                getLabel={(item) => item.name}
                onChange={(item) => {
                  field.onChange(item?.id)
                  setMaxMiningMode(transformMiningMode(item?.miningMode))
                }}
                selectedItem={miner}
                renderEndElement={(item) => 
                  <DevicesIcons devices={item?.supportedDevices as Device[]} />}
              />
            )}
          />
        </UiField>

        {!isCpu && (
          <UiField label="Mining mode">
            <UiToggler 
              w="5.5rem"
              values={slisedModes}
              value={slisedModes[currentMiningMode - 1]}
              onChange={(state) => {
                const newMode = transformMiningMode(state);
                setCurrentMiningMode(newMode);
              }}
              reverse 
            />
          </UiField>
        )}
      </Stack>

      {isCpu && (
        <Stack direction={{ base: 'column', md: 'row' }} gap={4}>
          <UiField
            optionalText={'Optional'}
            label="Huge Pages"
            invalid={!!targetsErrors?.[targetIndex]?.miningConfig?.hugePages}
            errorText={targetsErrors?.[targetIndex]?.miningConfig?.hugePages?.message?.toString()}
          >
            <Controller
              control={control}
              name={`targets.${targetIndex}.miningConfig.hugePages`}
              render={({ field }) => (
                <UiInput 
                  placeholder="Enter huge pages" 
                  type="number"
                  {...field}
                  value={field.value || ''}
                />
              )}
            />
          </UiField>
          <UiField 
            optionalText={'Optional'}
            label="Threads Count"
            invalid={!!targetsErrors?.[targetIndex]?.miningConfig?.threadsCount}
            errorText={targetsErrors?.[targetIndex]?.miningConfig?.threadsCount?.message?.toString()}
          >
            <Controller
              control={control}
              name={`targets.${targetIndex}.miningConfig.threadsCount`}
              render={({ field }) => (
                <UiInput 
                  placeholder="Enter threads count" 
                  type="number"
                  {...field}
                />
              )}
            />
          </UiField>
        </Stack>
      )}

      {map(range(currentMiningMode), (index) => (
        <Stack key={index} direction={{ base: 'column', md: 'row'}} gap={4}>
          {renderCommonFields(index)}
        </Stack>
      ))}

      <Stack>
        <UiField 
          label={`${type} Miner Additional Arguments`} 
          optionalText="Optional"
          invalid={!!targetsErrors?.[targetIndex]?.miningConfig?.additionalArguments}
          errorText={targetsErrors?.[targetIndex]?.miningConfig?.additionalArguments?.message?.toString()}
        >
          <Controller
            name={`targets.${targetIndex}.miningConfig.additionalArguments`}
            control={control}
            render={({ field }) => (
              <UiTextarea 
                placeholder="Write miner additional arguments" 
                {...field}
                value={field.value || ''}
              />
            )}
          />
        </UiField>
        <UiField label={`${type} Miner Config File`} optionalText="Optional">
          <FileUploadRootProvider 
            alignItems="stretch" 
            value={fileUpload}
          >
            <FileUploadHiddenInput/>
            <FileInput placeholder="Upload miner config file" />
          </FileUploadRootProvider>        
        </UiField>
      </Stack>
    </Stack>
  )
}