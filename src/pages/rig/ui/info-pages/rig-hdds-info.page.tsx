import { RigHddInfo, RigTotalItemHddInfo } from "@/entities/rig";
import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import { UiBorderBox } from "@/shared/ui/ui-border-box"; 
import styles from './styles/rigHddsInfo.page.module.scss';
import _ from "lodash";
import { match } from "ts-pattern";
import { useParams } from "react-router";
import { useQuery } from "react-query";
import { ZodSaveParse } from "@/shared/lib/utils/zod-save-parse";
import { getRigHddsListApi } from "@/shared/api/get/getRigHddsList";
import { UiSpinner } from "@/shared/ui/ui-spinner";

export function RigHddsInfoPage() {
  const { rigId } = useParams();
  const { data, isLoading } = useQuery(['rigHddsInfo', rigId], () => getRigHddsListApi(rigId ?? ''));

  const validatedData = ZodSaveParse(data, RigHddInfo.array());

  return (
    <UiBorderBox className={styles['rig-hdds-info']}>
      <UiBgContainer color="opaque" className={styles['flex']}>
        {match(validatedData)
          .with(undefined, () => 
            <div className={styles['no-data']}>
              {isLoading ? <UiSpinner /> : 'N/A'}
            </div>)
          .otherwise((validatedData) => (
            _.map(validatedData, (rigHddInfo, index) => (
              <RigTotalItemHddInfo key={index} className={styles['item']} rigHdd={rigHddInfo} />
            ))
          ))}
      </UiBgContainer>
    </UiBorderBox>
  )
}
