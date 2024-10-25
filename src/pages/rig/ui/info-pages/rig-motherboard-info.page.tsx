import { RigMotherboardInfo, RigTotalItemMotherboardInfo } from "@/entities/rig";
import { getRigMotherboardApi } from "@/shared/api/get/getRigMotherboard";
import { ZodSaveParse } from "@/shared/lib/utils/zod-save-parse";
import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import { UiBorderBox } from "@/shared/ui/ui-border-box";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { match } from "ts-pattern";
import styles from './styles/rigMotherboardInfo.page.module.scss'
import { UiSpinner } from "@/shared/ui/ui-spinner";

export function RigMotherboardInfoPage() {
  const { rigId } = useParams();
  const { data, isLoading } = useQuery(['rigMotherboardInfo', rigId], () => getRigMotherboardApi(rigId));
  
  const validatedData = ZodSaveParse(data, RigMotherboardInfo.optional());

  return (
    <UiBorderBox className={styles['rig-motherboard-info']}>
      <UiBgContainer className={styles['flex']} color="opaque">
        {match(validatedData)
          .with(undefined, () => 
            <div className={styles['no-data']}>
              {isLoading ? <UiSpinner /> : 'N/A'}
            </div>)
          .otherwise((validatedData) => <RigTotalItemMotherboardInfo rigMotherboard={validatedData}/>)}
      </UiBgContainer>
    </UiBorderBox>
  )
}