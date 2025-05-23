import { createFileRoute, redirect } from '@tanstack/react-router'
import { z } from 'zod'

export const Route = createFileRoute('/_auth')({
  validateSearch: z.object({
    redirect: z.string().optional().catch(''),
  }),
  beforeLoad: ({ context, search }) => {
    if (context.session.get()) {
      throw redirect({ to: search.redirect || '/' })
    }
    
    context.queryClient.clear();
  }
})
