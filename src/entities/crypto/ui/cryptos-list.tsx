import _ from "lodash";
import clsx from "clsx";
import { match } from "ts-pattern";
import { CryptoItem } from "./crypto-item";
import styles from './cryptosList.module.scss';
import { UiSpinner } from "@/shared/ui/ui-spinner";
import { useCryptoStore } from "../model/crypto.store";
import { UiBorderBox } from "@/shared/ui/ui-border-box";
import { UiBgContainer } from "@/shared/ui/ui-bg-container";

export function CryptosList({
  className,
} : {
  className?: string;
}) {
  const { cryptosList, isCryptosListLoading } = useCryptoStore();
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
        {match(isCryptosListLoading)
          .with(true, () => <span className={styles['no-data']}><UiSpinner/></span>)
          .with(false, () => {
            if (_.isEmpty(cryptosList)) {
              return <span className={styles['no-data']}>No data</span>;
            } else {
              return _.map(cryptosList, (crypto) => (
                <CryptoItem key={crypto.shortName} crypto={crypto} />
              ));
            }
          })
          .exhaustive()
        }
      </UiBgContainer>
    </UiBorderBox>
  )
}