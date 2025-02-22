import { MinerType } from "@/entities/miner"
import { poolRepository, PoolType } from "@/entities/pool"
import { walletRepository, WalletType } from "@/entities/wallet"
import { Device, GpuDevicesIcons, UiField, UiInput, UiSelect, UiTextarea, UiToggler } from "@/shared/ui"
import { FileInput } from "@/shared/ui/file-upload"
import { FileUploadFileAcceptDetails, FileUploadHiddenInput, FileUploadRootProvider, Stack, StackProps, useFileUpload } from "@chakra-ui/react"
import _ from "lodash"
import { useCallback, useEffect, useMemo, useState } from "react"
import { Controller, useFormContext, useWatch } from "react-hook-form"
import { match } from "ts-pattern"
import { useFlightSheetFormStore } from "../model/flight-sheet-form.store"
import { FlightSheetType } from "@/entities/flight-sheet"

const { useWalletQuery } = walletRepository;
const { usePoolQuery } = poolRepository;

export interface FlightSheetFormTargetProps extends StackProps {
  type: 'GPU' | 'CPU'
  targetIndex: number;
  miners?: MinerType[],
  flightSheet?: FlightSheetType,
}

const transformMiningMode = (item?: string) => match(item)
  .with('Single', () => 1)
  .with('Dual', () => 2)
  .with('Triple', () => 3)
  .otherwise(() => 1)

export function FlightSheetFormTarget({
  type,
  miners,
  targetIndex,
  // flightSheet,
  ...props
}: FlightSheetFormTargetProps) {
  const isCpu = type === 'CPU'

  const fileUpload = useFileUpload({
    maxFiles: 1,
    accept: 'text/plain',
    onFileAccept: (details) => handleFileChange(details),
  })
  const [maxMiningMode, setMaxMiningMode] = useState(1)
  const [currentMiningMode, setCurrentMiningMode] = useState(1)
  const { control, formState: { errors }, setValue, clearErrors } = useFormContext()
  const { pools } = usePoolQuery()
  const { wallets } = useWalletQuery()
  const { addClearUploadFiles } = useFlightSheetFormStore();

  const targets = useWatch({
    control,
    name: `targets`,
  });

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
    if (!targets[targetIndex]?.miningConfig) return

    match(type)
      .with("CPU", () => { return; })
      .otherwise(() => {
        const newCoinConfigs = targets[targetIndex].miningConfig.coinConfigs.slice(0, currentMiningMode);
        setValue(`targets.${targetIndex}.miningConfig.coinConfigs`, newCoinConfigs);

        _.range(currentMiningMode, targets[targetIndex].miningConfig.coinConfigs.length).forEach((index) => {
          clearErrors(`targets.${targetIndex}.miningConfig.coinConfigs.${index}`);
        });
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMiningMode]);

  useEffect(() => {
    addClearUploadFiles(() => {
      fileUpload?.clearFiles()
      setMaxMiningMode(1);
      setCurrentMiningMode(1);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const slisedModes = useMemo(
    () => _.slice(['Single', 'Dual', 'Triple'], 0, maxMiningMode), 
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
          render={({ field }) => (
            <UiSelect<PoolType>
              invalid={!!targetsErrors?.[targetIndex]?.miningConfig?.coinConfigs?.[index]?.poolId}
              placeholder="Select pool"
              items={pools ?? []}
              getLabel={(item) => `${item.domain} - ${item.cryptocurrency}`}
              onChange={(item) => field.onChange(item?.id)}
              selectedItem={field.value}
            />
          )}
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
          render={({ field }) => (
            <UiSelect<WalletType>
              invalid={!!targetsErrors?.[targetIndex]?.miningConfig?.coinConfigs?.[index]?.walletId}
              placeholder="Select wallet"
              items={wallets ?? []}
              getLabel={(item) => `${item.name} - ${item.cryptocurrency}`}
              onChange={(item) => field.onChange(item?.id)}
              selectedItem={field.value}
            />
          )}
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
          render={({ field }) => <UiInput placeholder="Write pool password" {...field} />}
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
                selectedItem={field.value}
                renderEndElement={(item) => 
                  <GpuDevicesIcons devices={_.split(item?.supportedDevices, ', ') as Device[]} />}
              />
            )}
          />
        </UiField>
        {!isCpu && (
          <UiField label="Mining mode">
            <UiToggler 
              w="5.5rem"
              values={slisedModes} 
              onChange={(state) => setCurrentMiningMode(transformMiningMode(state))} 
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

      {_.map(_.range(currentMiningMode), (index) => (
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