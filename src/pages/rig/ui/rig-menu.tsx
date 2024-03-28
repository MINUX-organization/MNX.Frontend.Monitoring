 import styles from './rig-menu.module.scss'
import { UiAside } from '@/shared/ui/ui-aside'
import clsx from 'clsx'
import { NavLink } from 'react-router-dom'

export function RigMenu({
  className
} : {
  className?: string
}) {
  const routesList = [
    {label: 'GPUs', path: 'gpus'},
    {label: 'CPUs', path: 'cpus'},
    {label: 'Motherboard', path: 'motherboard'},
    {label: 'HDDs', path: 'hdds'},
    {label: 'Lan / Wi-Fi', path: 'internet'},
  ]

  const linkClassName = ({isActive}: {isActive?: boolean}) => {
    return clsx(
      styles['link'],
      !(isActive) && styles['inactive-link'],
      isActive && styles['active-link']
    )
  }

  return (
    <UiAside
      className={clsx(
        styles['rig-menu'],
        className
      )}
      variant={'vertical'}
      elements={routesList}
      renderElement={(element) => (
        <NavLink className={linkClassName} to={element.path} key={element.path}>
          {element.label}
        </NavLink>
      )}
    />
  )
}