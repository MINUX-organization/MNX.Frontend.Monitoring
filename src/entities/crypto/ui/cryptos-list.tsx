import _ from "lodash";
import clsx from "clsx";
import { match } from "ts-pattern";
import styles from './cryptosList.module.scss';
import { UiSpinner } from "@/shared/ui/ui-spinner";
import { UiBorderBox } from "@/shared/ui/ui-border-box";
import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import { ReactNode } from "react";
import { Crypto } from "../model/types";
import { UiSort } from "@/shared/ui/ui-sort";
import { useStateObject } from "@/shared/lib/utils/state-object";

const labels = [
  {
    label: 'Name',
    value: 'shortName' as keyof Crypto
  },
  {
    label: 'Full Name',
    value: 'fullName' as keyof Crypto
  },
  {
    label: 'Algorithm',
    value: 'algorithm' as keyof Crypto
  }
]

export function CryptosList({
  className,
  renderCryptoItem,
  cryptosList,
  isLoading
} : {
  cryptosList?: Crypto[];
  isLoading?: boolean;
  className?: string;
  renderCryptoItem?: (crypto: Crypto) => ReactNode;
}) {
  const titleLabels = ['Name', 'Full Name', 'Algorithm'];
  return (
    <UiBorderBox
      className={clsx(className, styles['cryptos-list'])}
      topLeft topRight bottomLeft bottomRight
    >
      <UiBgContainer className={styles['grid']} color="transparent">
        {/* <UiSort Solved
          data={cryptos.value} 
          sortOptions={labels}
          onSort={(sortedData) => {
            console.log(sortedData); 
            cryptos.setValue(sortedData)
          }}/> */}
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
  )
}