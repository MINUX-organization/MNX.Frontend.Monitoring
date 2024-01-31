import { UiHeader } from "@/shared/ui/ui-header";
import styles from './rootLayout.module.scss'
import { Outlet } from "react-router-dom";
import { NavLinks } from "./nav-links";
import { Profile } from "./profile";
import clsx from "clsx";

export function RootLayout({
  className
} : {
  className?: string;
}) {
  return (
    <div className={clsx(
      className,
      styles['wrapper']
    )}>
      <UiHeader links={<NavLinks className={styles['grow']}/>} right={<Profile/>}/>
      <main className={styles['container']}>
        <Outlet/>
      </main>
    </div>
  );
}