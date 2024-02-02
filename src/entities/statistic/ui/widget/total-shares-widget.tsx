import { UiBgContainer } from "@/shared/ui/ui-bg-container"
import styles from './statiscticWidgets.module.scss'
import { FieldWidget, Shares } from "../../model/types"
import clsx from "clsx"
import { UiLabelBoard } from "@/shared/ui/ui-label-board"

type TotalSharesProps = {
  className?: string,
  shares?: Shares
}

export function TotalShares({
  className,
  shares
} : TotalSharesProps) {
  const label = 'Total Shares';
  const fields: FieldWidget[] = [
    {label: 'Accepted', value: shares?.accepted, style: 'green'},
    {label: 'Rejected', value: shares?.rejected, style: 'red'},
  ]
  return (
    <UiLabelBoard
      className={clsx(
        className,
        styles['wrapper']
      )}
      label={label} 
      options={fields}
      renderLabel={(label) => (
        <UiBgContainer className={styles['label']} color="opaque">
          <span>{label}</span>
        </UiBgContainer>)}
      renderOption={(option) => (
        <UiBgContainer key={option.label} color="opaque" className={clsx(
          styles['text-gray']
        )}>
          <span>{option.label}</span>
          <br/>
          <span className={styles[`${option.style}`]}>{option.value ?? 'N/A'}</span>
        </UiBgContainer>
      )}
    />
  )
}