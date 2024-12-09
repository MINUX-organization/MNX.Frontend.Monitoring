import { Switch } from "@headlessui/react";
import clsx from "clsx";
import styles from './styles/uiSwitch.module.scss';
import { UiBorderBox } from "./ui-border-box";
import { Check } from "lucide-react";

export function UiSwitch({
  className,
  checked,
  setChecked,
  size = 22,
} : {
  className?: string;
  checked?: boolean;
  setChecked?: (enabled: boolean) => void;
  size?: number
}) {
  return (
    <Switch checked={checked} onChange={setChecked} className={clsx(className, styles['switch'])}>
      <UiBorderBox className={clsx(styles['switch-container'])}>
        {checked && <Check size={size} className={styles['check']}/>}
      </UiBorderBox>
    </Switch>
  )
}