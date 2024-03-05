import _ from "lodash";
import clsx from "clsx";
import { match } from "ts-pattern";
import styles from './cryptosList.module.scss';
import { UiSpinner } from "@/shared/ui/ui-spinner";
import { UiBorderBox } from "@/shared/ui/ui-border-box";
import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import { ReactNode } from "react";
import { Crypto } from "../model/types";
import { useCryptoQuery } from "../model/crypto.query";

export function CryptosList({
  className,
  renderCryptoItem,
  renderFilter,
  renderSort
} : {
  className?: string;
  renderFilter?: () => ReactNode;
  renderSort?: () => ReactNode;
  renderCryptoItem?: (crypto: Crypto) => ReactNode;
}) {
  const { cryptosList, isLoading } = useCryptoQuery();
  const titleLabels = ['Name', 'Full Name', 'Algorithm'];
  
  return (
    <div className={clsx(className, styles['cryptos-list'])}>
      <div className={styles['features']}>
        {renderFilter?.()}
        {renderSort?.()}
      </div>
      <UiBorderBox
        className={styles['cryptos-list-table']}
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
              if (_.isEmpty(cryptosList)) {
                return <span className={styles['no-data']}>N/A</span>;
              } else {
                return (
                  <div className={styles['subgrid-items']}>
                    {_.map(cryptosList, (crypto) => renderCryptoItem?.(crypto))}
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