import { useParams } from "react-router-dom";
import styles from './rigGpusInfo.page.module.scss';
import { UiBorderBox } from "@/shared/ui/ui-border-box";
import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import { RigGpuInfo, RigTotalItemGpusInfo } from "@/entities/rig";
import _ from "lodash";
import React from "react";
import { useQuery } from "react-query";
import { getRigGpusListApi } from "@/shared/api/get/getRigGpusList";
import { ZodSaveParse } from "@/shared/lib/utils/zod-save-parse";
import { match } from "ts-pattern";

export function RigGpusInfo() {
  const { rigId } = useParams();
  const { data } = useQuery(['rigGpusInfo', rigId], () => getRigGpusListApi(rigId))
  
  const validatedData = ZodSaveParse(data, RigGpuInfo.array())

  return (
    <UiBorderBox className={styles['rig-gpus-info']}>
      <UiBgContainer color="opaque" className={styles['flex']}>
        {match(validatedData)
          .with(undefined, () => <div className={styles['no-data']}>N/A</div>)
          .otherwise((validatedData) => (
            _.map(validatedData, (rigGpuInfo, index) => (
              <React.Fragment key={rigGpuInfo.index}>
                <RigTotalItemGpusInfo rigGpuInfo={rigGpuInfo} />
                {index !== validatedData.length - 1 && <div className={styles['divider']}/>}
              </React.Fragment>
            ))
          ))}
      </UiBgContainer>
    </UiBorderBox>
  )
}