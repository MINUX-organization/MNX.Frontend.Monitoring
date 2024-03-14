import clsx from "clsx";
import { ReactNode } from "react";
import { UiBorderBox } from "./ui-border-box";
import { UiBgContainer } from "./ui-bg-container";
import styles from './styles/uiDomainsList.module.scss';
import _ from "lodash";
import { match } from "ts-pattern";
import { UiSpinner } from "./ui-spinner";

export function UiDomainsList<T>({
  className,
  domainsList,
  titleLabels,
  isLoading,
  renderSort,
  renderSearch,
  renderDomainItem,
} : {
  className?: string;
  domainsList?: T[];
  titleLabels?: string[];
  isLoading?: boolean;
  renderSort?: () => ReactNode;
  renderSearch?: () => ReactNode;
  renderDomainItem?: (domain: T) => ReactNode;
}) {
  const renderFeatures = renderSort === undefined && renderSearch === undefined;

  return (
    <div className={clsx(className, styles['domains-list'])}>
      {!renderFeatures && <div className={styles['features']}>
        {renderSort?.()}
        {renderSearch?.()}
      </div>}
      <UiBorderBox
        className={styles['domains-list-table']}
        topLeft topRight bottomLeft bottomRight
      >
        <UiBgContainer className={styles['grid']} color="transparent">
          <div className={styles['subgrid-title']}>
            {_.map(titleLabels, (label) => (
              <span key={label} className={styles['title-text']}>{label}</span>
            ))}
          </div> 
          {match(isLoading ?? false)
            .with(true, () => <span className={styles['no-data']}> <UiSpinner/> </span>)
            .with(false, () => {
              if (_.isEmpty(domainsList)) {
                return <span className={styles['no-data']}>N/A</span>;
              } else {
                return (
                  <div className={styles['subgrid-items']}>
                    {_.map(domainsList, (domain) => renderDomainItem?.(domain))}
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