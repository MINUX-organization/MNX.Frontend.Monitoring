import { LoginForm } from '@/features/login/form'
import styles from './login.module.scss'
import { useEffect } from 'react'
import { useSessionRepository } from '@/entities/session'
import { useLocation, useNavigate } from 'react-router';

export function Login() {
  const { getSession } = useSessionRepository();
  const navigate = useNavigate();
  const session = getSession();

  useEffect(() => {
    if (!session) return;

    navigate('/');
  }, [session, navigate])

  return (
    <div className={styles['login']}>
      <span className={styles['logo']}>MINUX</span>
      <LoginForm className={styles['form']}/>
    </div>
  )
}