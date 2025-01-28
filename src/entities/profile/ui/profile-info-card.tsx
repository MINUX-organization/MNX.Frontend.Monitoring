import clsx from "clsx";
import { ProfileInfo } from "../model/types"
import { ProfileInfoCardLayout } from "./profile-info-card-layoute";
import styles from './profileInfoCard.module.scss'
import { UiBorderBox } from "@/shared/ui/ui-border-box";
import { UiBgContainer } from "@/shared/ui/ui-bg-container";
import _ from "lodash";
import React from "react";

export function ProfileInfoCard({
  className,
  profileInfo
} : {
  className?: string;
  profileInfo?: ProfileInfo;
  
}) {
  const fileds = [
    <ProfileInfoCardLayout 
      className={styles['layout']} 
      title={'Email'} 
      value={profileInfo?.email ?? 'Not linked'}/>,
    <ProfileInfoCardLayout 
      className={styles['layout']} 
      title={'Date of registration'} 
      value={new Date(profileInfo?.registrationDate ?? '').toLocaleDateString()}/>,
    <ProfileInfoCardLayout 
      className={styles['layout']}
      title={'Telegram'}
      value={profileInfo?.telegram ?? 'Not linked'}/>,
    <ProfileInfoCardLayout 
      className={styles['layout']} 
      title={'Rig key'} 
      value={profileInfo?.key ?? 'Not linked'}/>,
  ]

  return (
    <UiBorderBox className={clsx(className, styles['profile-info-card'])}>
      <UiBgContainer className={styles['profile-info-card-container']} color='opaque'>
        {_.map(fileds, (field, index) => (
          <React.Fragment key={index}>
            {field}
            { index !== fileds.length - 1 && <div className={styles['divider']}/>}
          </React.Fragment>
        ))}
      </UiBgContainer>
    </UiBorderBox>
  )
}