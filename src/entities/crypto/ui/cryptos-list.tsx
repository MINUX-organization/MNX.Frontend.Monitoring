import _ from "lodash";
import clsx from "clsx";
import { match } from "ts-pattern";
import styles from './cryptosList.module.scss';
import { UiSpinner } from "@/shared/ui/ui-spinner";
import { UiBorderBox } from "@/shared/ui/ui-border-box";
import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import { ReactNode } from "react";
import { Crypto } from "../model/types";
import { useCryptoRepository } from "..";

export function CryptosList({
  className,
  renderSort,
  renderSearch,
  renderCryptoItem,
} : {
  className?: string;
  renderSort?: () => ReactNode;
  renderSearch?: () => ReactNode;
  renderCryptoItem?: (crypto: Crypto) => ReactNode;
}) {
  const { getCryptosList, isLoading } = useCryptoRepository();
  const titleLabels = ['Name', 'Full Name', 'Algorithm'];

  const renderFeatures = renderSort === undefined && renderSearch === undefined;

  return (
    <div className={clsx(className, styles['cryptos-list'])}>
      {!renderFeatures && <div className={styles['features']}>
        {renderSort?.()}
        {renderSearch?.()}
      </div>}
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
              if (_.isEmpty(getCryptosList())) {
                return <span className={styles['no-data']}>N/A</span>;
              } else {
                return (
                  <div className={styles['subgrid-items']}>
                    {_.map(getCryptosList(), (crypto) => renderCryptoItem?.(crypto))}
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