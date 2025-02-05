import { RegistrationPage } from '@/pages/auth'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/registration')({
  component: RegistrationPage,
})