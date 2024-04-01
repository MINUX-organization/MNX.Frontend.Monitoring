import { RigCpuInfo, RigTotalItemCpusInfo } from "@/entities/rig/";
import { getRigCpusListApi } from "@/shared/api/get/getRigCpusList";
import { ZodSaveParse } from "@/shared/lib/utils/zod-save-parse";
import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import { UiBorderBox } from "@/shared/ui/ui-border-box";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styles from './styles/rigCpusInfo.page.module.scss'
import { match } from "ts-pattern";
import _ from "lodash";
import React from "react";
import { UiSpinner } from "@/shared/ui/ui-spinner";

export function RigCpusInfoPage() {
  const { rigId } = useParams();
  const { data, isLoading } = useQuery(['rigCpusInfo', rigId], () => getRigCpusListApi(rigId));
  
  const validatedData = ZodSaveParse(data, RigCpuInfo.array());

  return (
    <UiBorderBox className={styles['rig-cpus-info']}>
      <UiBgContainer color="opaque" className={styles['flex']}>
        {match(validatedData)
          .with(undefined, () => 
            <div className={styles['no-data']}>
              {isLoading ? <UiSpinner /> : 'N/A'}
            </div>)
          .otherwise((validatedData) => (
            _.map(validatedData, (rigCpuInfo, index) => (
              <React.Fragment key={rigCpuInfo.serialNumber}>
                <RigTotalItemCpusInfo rigCpuInfo={rigCpuInfo} />
                {index !== validatedData.length - 1 && <div className={styles['divider']} />}
              </React.Fragment>
            ))
          ))}
      </UiBgContainer>
    </UiBorderBox>
  )
}