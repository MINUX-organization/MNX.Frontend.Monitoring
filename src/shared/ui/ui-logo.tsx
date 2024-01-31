import clsx from "clsx";
import styles from './uiLogo.module.scss'

export function UiLogo({ className }: { className?: string }) {
  return (
    <div className={clsx(className, styles['wrapper'])}>
      <svg width="46" height="49" viewBox="0 0 46 49" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 14.864L17.5238 38.1768L11.2839 14.864H0Z" fill="#3C9EA5"/>
      <path d="M46 14.864L28.4762 38.3333L34.7161 14.864H46Z" fill="#3C9EA5"/>
      <path d="M0 12.8299H11.1431L16.585 4.53741L0 12.8299Z" fill="#3C9EA5"/>
      <path d="M46 12.8299H34.7518L29.2585 4.53741L46 12.8299Z" fill="#3C9EA5"/>
      <path d="M14.3945 14.864C15.1825 16.9853 20.5962 39.301 22.687 48.6598L31.6054 14.864H14.3945Z" fill="#3C9EA5"/>
      <path d="M14.8643 12.8299L23.0003 0L31.1363 12.8299H14.8643Z" fill="#3C9EA5"/>
      </svg>
    </div>
  );
}