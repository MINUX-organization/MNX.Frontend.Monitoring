import { ROUTER_PATHS } from "@/shared/constants/routes";
import styles from './navLinks.module.scss'
import clsx from "clsx";
import _ from 'lodash';
import { NavLinkItem } from "./nav-link-item";

export type NavItem = {
  label: string;
  path: string;
  children?: Omit<NavItem[], "children">;
}

const fields: NavItem[] = [
  {label: 'Monitoring', path: ROUTER_PATHS.MONITORING},
  {label: 'Devices', 
   path: ROUTER_PATHS.DEVICES,
   children: [
    {label: 'GPUs', path: ROUTER_PATHS.GPUS},
    {label: 'CPUs', path: ROUTER_PATHS.CPUS}
  ]},
  {label: 'Workerks', path: ROUTER_PATHS.WORKERS},
  {label: 'Statistic', path: ROUTER_PATHS.STATISTIC},
  {label: 'FlightSheets', path: ROUTER_PATHS.FLIGHT_SHEETS},
  {label: 'Presets', path: ROUTER_PATHS.PRESETS},
  {label: 'Cryptos', path: ROUTER_PATHS.CRYPTOS},
  {label: 'Wallets', path: ROUTER_PATHS.WALLETS},
  {label: 'Pools', path: ROUTER_PATHS.POOLS},
];

export function NavLinks({
  className
} : {
  className?: string;
}) { 
  const linkClassName = ({ isActive }: { isActive?: boolean }) =>
    clsx(
      !(isActive) && styles['inactive-link'],
      isActive && styles['active-link']
  );
  return (
    <div className={clsx(
      className,
      styles['wrapper']
    )}>
      {_.map(fields, (field) => (
        <NavLinkItem key={field.label} className={linkClassName} field={field}/>
      ))}
    </div>
  );
}