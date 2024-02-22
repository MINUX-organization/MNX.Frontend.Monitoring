import { UiHeader } from "@/shared/ui/ui-header";
import styles from './rootLayout.module.scss'
import { Outlet } from "react-router-dom";
import { NavLinks } from "./nav-links";
import { Profile } from "./profile";
import { UiAside } from "@/shared/ui/ui-aside";
import { UiCentered } from "@/shared/ui/ui-centered";
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
      <UiHeader 
        className={styles['header']} 
        links={<NavLinks className={styles['grow']}/>} 
        right={<Profile/>}
      />
      <UiAside className={styles['UiAside']} variant="vertical"/>
      <main className={styles['main']}>
        <UiCentered children={<Outlet/>}/>
      </main>
    </div>
  );
}