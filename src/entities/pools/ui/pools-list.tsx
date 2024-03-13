import _ from "lodash";
import clsx from "clsx";
import { match } from "ts-pattern";
import styles from './walletsList.module.scss';
import { UiSpinner } from "@/shared/ui/ui-spinner";
import { UiBorderBox } from "@/shared/ui/ui-border-box";
import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import { ReactNode } from "react";
import { Wallet } from "../model/types";
import { useWalletRepository } from "../model/pool.repository";

export function WalletsList({
  className,
  renderSort,
  renderSearch,
  renderWalletItem,
} : {
  className?: string;
  renderSort?: () => ReactNode;
  renderSearch?: () => ReactNode;
  renderWalletItem?: (wallet: Wallet) => ReactNode;
}) {
  const { getWalletsList, isLoading } = useWalletRepository();

  const titleLabels = ['Wallet Name', 'Coin', 'Address'];

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
              if (_.isEmpty(getWalletsList())) {
                return <span className={styles['no-data']}>N/A</span>;
              } else {
                return (
                  <div className={styles['subgrid-items']}>
                    {_.map(getWalletsList(), (wallet) => renderWalletItem?.(wallet))}
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