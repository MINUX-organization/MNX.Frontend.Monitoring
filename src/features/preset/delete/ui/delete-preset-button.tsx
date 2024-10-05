import clsx from "clsx";
import { Trash2 } from "lucide-react";
import styles from './delete-preset-button.module.scss';
import { Preset, usePresetByGpuNameRepository, usePresetRepository } from "@/entities/preset";
import { useNavigate } from "react-router";
import { usePresetStateStore } from "@/widgets/preset-modal/model";
import _ from "lodash";

export function DeletePresetButton({
  className,
  presetId,
  isIcon,
  preset
} : {
  className?: string;
  presetId: string;
  preset?: Preset;
  isIcon?: boolean;
}) {
  const { deletePreset, getPresetsList } = usePresetRepository()
  const { deletePresetFromList } = usePresetByGpuNameRepository();
  const { setPreset, setGpuName, selectedPreset } = usePresetStateStore()
  const navigation = useNavigate()
  
  const handler = async (e: React.MouseEvent) => {
    e.stopPropagation();

    const isSuccess = await deletePreset(presetId);

    if (!isSuccess) return;

    navigation('')

    if (!preset) return;
    deletePresetFromList(preset)

    if (selectedPreset?.id === presetId) {
      setPreset(undefined)
      setGpuName(undefined)
    }
  }

  return (
    <button 
      className={clsx(!isIcon && styles['delete-preset-button'], className)}
      onClick={handler}  
    >
      <Trash2 width={30} />
    </button>
  )
}