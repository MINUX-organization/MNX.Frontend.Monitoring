import clsx from "clsx"
import styles from './styles/uiTab.module.scss';
import { HTMLProps, ReactNode } from "react";
import { useStateObject } from "../lib/utils/state-object";
import _ from "lodash";
import { match } from "ts-pattern";
import { UiBorderBox } from "./ui-border-box";
import { UiBgContainer } from "./ui-bg-container";

export type Tab = {
  title: string;
  render: () => ReactNode;
}

export type UiTabProps = {
  tabs: Tab[]
  renderTab?: (tab: Tab, isActive: boolean) => ReactNode;
} & HTMLProps<HTMLDivElement>

export function UiTab({
  className,
  tabs,
  renderTab,
  ...props
} : {
  className?: string
} & UiTabProps) {
  const selectedTab = useStateObject<Tab>();

  return (
    <div {...props} className={clsx(className, styles['tab'])}>
      <UiBorderBox withPadding>
        <UiBgContainer color="opaqueBlack" className={styles['tab-container']}>
          {_.map(tabs, (tab) => {
            return match(renderTab)
              .with(undefined, () => 
                <div className={clsx(
                  styles['tab-item'], 
                  selectedTab.value.title === tab.title && styles['active'])}
                >
                  {tab.title}
                </div>)
              .otherwise(() => 
                renderTab?.(tab, selectedTab.value.title === tab.title));
          })}
        </UiBgContainer>
      </UiBorderBox>
      {_.map(tabs, (tab) => {
        return (
          <div key={tab.title} className={clsx(
            styles['tab-content'], 
            selectedTab.value.title === tab.title && styles['visible'])}
          >
            {tab.render()}
          </div>
        )
      })}
    </div>
  )
}