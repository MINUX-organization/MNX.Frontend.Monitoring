import { RigMotherboardInfo } from "@/entities/rig";
import { getRigMotherboardApi } from "@/shared/api/get/getRigMotherboard";
import { ZodSaveParse } from "@/shared/lib/utils/zod-save-parse";
import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import { UiBorderBox } from "@/shared/ui/ui-border-box";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { match } from "ts-pattern";
import styles from './rigMotherboardInfo.page.module.scss'

export function RigMotherboardInfoPage() {
  const { rigId } = useParams();
  const { data } = useQuery(['rigMotherboardInfo', rigId], () => getRigMotherboardApi(rigId));
  const validatedData = ZodSaveParse(data, RigMotherboardInfo.array());

  return (
    <UiBorderBox className={styles['rig-motherboard-info']}>
      <UiBgContainer color="opaque">
        {match(validatedData)
          .with(undefined, () => <div className={styles['no-data']}>N/A</div>)
          .otherwise((validatedData) => )}
      </UiBgContainer>
    </UiBorderBox>
  )
}