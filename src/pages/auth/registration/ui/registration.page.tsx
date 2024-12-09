
import { RegistrationForm } from '@/features/auth/registration/form'
import styles from './registration.module.scss'

export function RegistrationPage() {

  return (
    <div className={styles['login']}>
      <span className={styles['logo']}>MINUX</span>
      <RegistrationForm className={styles['form']}/>
    </div>
  )
}