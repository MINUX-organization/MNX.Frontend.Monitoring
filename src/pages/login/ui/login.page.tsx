import { LoginForm } from '@/features/login/form'
import styles from './login.module.scss'

export function Login() {

  return (
    <div className={styles['login']}>
      <span className={styles['logo']}>MINUX</span>
      <LoginForm className={styles['form']}/>
    </div>
  )
}