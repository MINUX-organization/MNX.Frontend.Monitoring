import React from "react";
import styles from './profileInfoCardLayout.module.scss'
import clsx from "clsx";

export function ProfileInfoCardLayout({
  className,
  title,
  value,
  fetures
} : {
  className?: string;
  title?: string;
  value?:string;
  fetures?: React.ReactNode[];
}) {
  return (
    <div className={clsx(className, styles['profile-info-card-layout'])}>
      <span className={styles['title']}>{title}</span>
      <span className={styles['value']}>{value}</span>
      <div className={styles['fetures']}>{fetures}</div>
    </div>
  )
}