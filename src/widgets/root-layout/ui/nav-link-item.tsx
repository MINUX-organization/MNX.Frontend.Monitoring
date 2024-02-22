import { NavLink, useLocation } from "react-router-dom"
import { UiDropdown } from '@/shared/ui/ui-dropdown';
import { NavLinkItemProps } from "../model/types";
import styles from './navLinks.module.scss';
import clsx from 'clsx';

export function NavLinkItem({
  field,
  className
} : NavLinkItemProps) {
  const currentLocation = useLocation().pathname;
  const withChildren: boolean = Boolean(field.children);

  if (!withChildren) return <NavLink to={field.path} className={className}>{field.label}</NavLink>

  const childrenLinkClassName = ({ isActive }: { isActive?: boolean }) =>
    clsx(
      !(isActive) && clsx(styles['inactive-link'], styles['alt']),
      isActive && clsx(styles['active-link'], styles['alt'])
  );
  
  return (
    <UiDropdown 
      label={field} 
      options={field.children!}
      getLabel={(field) => field.label}
      getOption={(option) => option.label}
      renderLabel={(field) => (
        <span
          className={clsx(
            //TODO: Parse string to first '/' for except wrong logic
            !(currentLocation.includes(field.path)) && styles['inactive-link'],
            currentLocation.includes(field.path) && styles['active-link']
          )}
        > 
          {field?.label}
        </span>
      )}
      renderOption={(option) => (
        <NavLink
          to={option.path} 
          className={childrenLinkClassName}
        > 
          {option.label}
        </NavLink>
    )}/>
  )
}