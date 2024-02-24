import _ from "lodash";
import clsx from "clsx";
import { match } from "ts-pattern";
import styles from './cryptosList.module.scss';
import { UiSpinner } from "@/shared/ui/ui-spinner";
import { UiBorderBox } from "@/shared/ui/ui-border-box";
import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import { ReactNode } from "react";
import { Crypto } from "../model/types";

export function CryptosList({
  className,
  cryptoItemRender,
  cryptosList,
  isLoading
} : {
  cryptosList?: Crypto[];
  isLoading?: boolean;
  className?: string;
  cryptoItemRender?: (crypto: Crypto) => ReactNode;
}) {
  const titleLabels = ['Name', 'Full Name', 'Algorithm'];
  return (
    <UiBorderBox 
      className={clsx(className, styles['cryptos-list'])}
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
              return _.map(cryptosList, (crypto) => cryptoItemRender?.(crypto));
            }
          })
          .exhaustive()
        }
      </UiBgContainer>
    </UiBorderBox>
  )
}