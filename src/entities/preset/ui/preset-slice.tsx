import { UiBorderBox } from "@/shared/ui/ui-border-box";
import { Preset, PresetGroupedList } from "../model/types";
import clsx from "clsx";
import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import styles from './presetSlice.module.scss';
import { StateObject, useStateObject } from "@/shared/lib/utils/state-object";
import _ from "lodash";
import { PresetSliceItem } from "./preset-slice-item";
import React from "react";
import { UiResizableBox } from "@/shared/ui/ui-resizable-box";

export function PresetSlice({
  className,
  preset,
  renderOnOpen,
  renderApply,
  renderEdit,
  renderDelete,
} : {
  className?: string;
  preset: PresetGroupedList;
  renderOnOpen?: (isOpen: StateObject<boolean>) => React.ReactNode;
  renderApply?: (presetId: string) => React.ReactNode;
  renderEdit?: (presetId: string) => React.ReactNode;
  renderDelete?: (presetId: string, preset?: Preset) => React.ReactNode;
}) {
  const isOpen = useStateObject(false);

  return (
    <UiBorderBox withPadding className={clsx(className, styles['preset-slice'])}>
      <UiBgContainer onClick={() => isOpen.setValue((prev) => !prev)} className={styles['preset-slice-container']} color="opaque">
        <div className={clsx(
          styles['header'],
          isOpen.value ? styles['visible'] : styles['hidden'])
        }>
          <span className={styles['title']}>
            {preset.name}
          </span>
          {renderOnOpen?.(isOpen)}
        </div>
        <UiResizableBox trigger={isOpen.value}>
          <div className={styles['preset-board-container']}>
            {_.map(preset.presets, (preset) =>
              <React.Fragment key={preset.id}>
                <div className={styles['line']}>&#8203;</div>
                <PresetSliceItem 
                  preset={preset}
                  renderApply={renderApply}
                  renderEdit={renderEdit}
                  renderDelete={renderDelete}
                />
              </React.Fragment>)}
          </div>
        </UiResizableBox>
      </UiBgContainer>
    </UiBorderBox>
  );
}