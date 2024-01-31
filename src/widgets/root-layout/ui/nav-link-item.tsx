import _ from 'lodash';
import { MouseEvent } from "react";
import { NavItem } from "./nav-links"; 
import { NavLink } from "react-router-dom"
import styles from './navLinks.module.scss';
import clsx from 'clsx';

type NavLinkItemProps = {
  className: ({ isActive }: {
    isActive?: boolean | undefined;
  }) => string;
  field: NavItem
}

export function NavLinkItem({
  field,
  className
} : NavLinkItemProps) {
  const withChildren: boolean = Boolean(field.children);
  const childrenLinkClassName = ({ isActive }: { isActive?: boolean }) =>
  clsx(
    !(isActive) && clsx(styles['inactive-link'], styles['alt']),
    isActive && clsx(styles['active-link'], styles['alt'])
  );
  const handleClick = (event: MouseEvent) => event.preventDefault();
  if (withChildren) {
    return (
      <div className={styles['wrapper-item']}>
        <NavLink
          onClick={handleClick}
          to={field?.path ?? ''} 
          className={className}
        > 
          {field?.label}
        </NavLink>
        {_.map(field.children, (child) => (
          <NavLink
            to={child.path} 
            className={childrenLinkClassName}
          > 
            {child.label}
          </NavLink>
        ))}
      </div>
    )
  }

  return ( 
      <NavLink
        to={field.path ?? ''} 
        className={className}
      > 
        {field.label}
      </NavLink>
  )
}