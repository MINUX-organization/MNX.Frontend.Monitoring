import { useModal } from "@/shared/lib/hooks/modal";
import { UiModal } from "@/shared/ui/ui-modal";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { PresetsList } from "./presets-list";

import styles from './presetModal.module.scss';
import PresetParameters from "./preset-parameters";

export function PresetModal() {
  const { isOpen, onOpen } = useModal();
  const { gpuId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    onOpen();
  }, []);

  return (
    <UiModal isOpen={isOpen.value} onClose={() => navigate('..')}>
      <div className={styles['preset-modal']}>
        <PresetParameters gpuId={gpuId}/>
        <PresetsList gpuId={gpuId}/>
      </div>
    </UiModal>
  )
}