import _ from "lodash";
import clsx from "clsx";
import { match } from "ts-pattern";
import styles from './walletsList.module.scss';
import { UiSpinner } from "@/shared/ui/ui-spinner";
import { UiBorderBox } from "@/shared/ui/ui-border-box";
import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import { ReactNode } from "react";
import { Pool } from "../model/types";
import { usePoolRepository } from "../model/pool.repository";

export function PoolsList({
  className,
  renderSort,
  renderSearch,
  renderPoolItem,
} : {
  className?: string;
  renderSort?: () => ReactNode;
  renderSearch?: () => ReactNode;
  renderPoolItem?: (pool: Pool) => ReactNode;
}) {
  const { getPoolsList, isLoading } = usePoolRepository();

  const titleLabels = ['Domain', 'Port', 'Coin'];

  const renderFeatures = renderSort === undefined && renderSearch === undefined;

  return (
    <div className={clsx(className, styles['wallets-list'])}>
      {!renderFeatures && <div className={styles['features']}>
        {renderSort?.()}
        {renderSearch?.()}
      </div>}
      <UiBorderBox
        className={styles['wallets-list-table']}
        topLeft topRight bottomLeft bottomRight
      >
        <UiBgContainer className={styles['grid']} color="transparent">
          <div className={styles['subgrid-title']}>
            {_.map(titleLabels, (label) => (
              <span key={label} className={styles['title-text']}>{label}</span>
            ))}
          </div> 
          {match(isLoading ?? false)
            .with(true, () => <span className={styles['no-data']}><UiSpinner/></span>)
            .with(false, () => {
              if (_.isEmpty(getPoolsList())) {
                return <span className={styles['no-data']}>N/A</span>;
              } else {
                return (
                  <div className={styles['subgrid-items']}>
                    {_.map(getPoolsList(), (wallet) => renderPoolItem?.(wallet))}
                  </div>
                )
              }
            })
            .exhaustive()
          }
        </UiBgContainer>
      </UiBorderBox>
    </div>
  )
}