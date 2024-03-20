import styles from './navLinks.module.scss'
import clsx from "clsx";
import _ from 'lodash';
import { NavLinkItem } from "./nav-link-item";
import { ROUT_FIELDS } from "../model/constants";

export function NavLinksList({
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
      styles['nav-links']
    )}>
      {_.map(ROUT_FIELDS, (field) => (
        <NavLinkItem key={field.label} className={linkClassName} field={field}/>
      ))}
    </div>
  );
}