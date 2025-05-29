import { CustomMinerPost, CustomMinerPostSchema, minerRepository, MinerType } from "@/entities/miner";
import { DevicesIcons, FormConfig, GenericForm, UiInput, UiMultipleSelect, UiText } from "@/shared/ui";
import { createListCollection, Group } from "@chakra-ui/react";
import { FC } from "react";
import { match } from "ts-pattern";

const { useMinerMutation } = minerRepository;

interface MinerFormProps {
  mode?: 'add' | 'edit',
  miner?: MinerType,
  onClose?: () => void
}

export const MinerForm: FC<MinerFormProps> = ({
  mode = 'add',
  miner,
  onClose,
}) => {
  const { addCustomMiner, editCustomMiner } = useMinerMutation();

  const supportedDevices = createListCollection({
    items: [
      { render: (
        <Group>
          <UiText>Nvidia Gpu</UiText>
          <DevicesIcons devices={['NvidiaGpu']} />
        </Group>
      ), value: 'NvidiaGpu', label: 'Nvidia Gpu' },
      { render: (
        <Group>
          <UiText>Intel Gpu</UiText>
          <DevicesIcons devices={['IntelGpu']} />
        </Group>
      ), value: 'IntelGpu', label: 'Intel Gpu' },
      { render: (
        <Group>
          <UiText>Intel Cpu</UiText>
          <DevicesIcons devices={['IntelCpu']} />
        </Group>
      ), value: 'IntelCpu', label: 'Intel Cpu' },
      { render: (
        <Group>
          <UiText>Amd Gpu</UiText> 
          <DevicesIcons devices={['AmdGpu']} />
        </Group>
      ), value: 'AmdGpu', label: 'Amd Gpu' },
      { render: (
        <Group>
          <UiText>Amd Cpu</UiText> 
          <DevicesIcons devices={['AmdCpu']} />
        </Group>
      ), value: 'AmdCpu', label: 'Amd Cpu' },
    ]
  });
  
  const config: FormConfig<CustomMinerPost> = {
    validationSchema: CustomMinerPostSchema,
    defaultValues: match(miner)
      .with(undefined, () => ({
        name: '',
        version: '',
        installationUrl: '',
        poolTemplate: '',
        walletWorkerTemplate: '',
        supportedDevices: [],
        miningMode: "Single" as "Single" | "Dual" | "Triple",
      }))
      .otherwise((miner) => ({
        name: miner.name,
        version: miner.version,
        installationUrl: miner.installationUrl,
        poolTemplate: miner.poolTemplate,
        walletWorkerTemplate: miner.walletWorkerTemplate,
        supportedDevices: miner.supportedDevices,
        miningMode: miner.miningMode,
      })),
    fields: [
      { name: 'name', label: 'Name', component: ({field}) => <UiInput {...field} /> },
      { name: 'version', label: 'Version', component: ({field}) => <UiInput {...field} /> },
      { name: 'installationUrl', label: 'Installation URL', component: ({field}) => <UiInput {...field} /> },
      { name: 'supportedDevices', label: 'Supported devices', component: ({field}) => (
        <UiMultipleSelect 
          collection={supportedDevices}
          value={field.value}
          onValueChange={({ value }) => field.onChange(value)}
          onBlur={field.onBlur}
        />
      )},
      { name: 'poolTemplate', label: 'Pool template', component: ({field}) => <UiInput {...field} /> },
      { name: 'walletWorkerTemplate', label: 'Wallet and worker template', component: ({field}) => <UiInput {...field} /> },
    ],
    onSubmit: async (values) => {
      if (mode === 'add') {
        await addCustomMiner(values);
        return;
      }

      await editCustomMiner({ id: miner!.id, ...values });
      return 
    },
    onReset: () => {
      onClose?.();
    }
  }

  return (
    <GenericForm
      config={config}
    />
  )
}