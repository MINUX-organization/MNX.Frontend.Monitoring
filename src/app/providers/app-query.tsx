import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// eslint-disable-next-line react-refresh/only-export-components
export const queryClient = new QueryClient({
  defaultOptions: {
    queries : { 
      staleTime: Infinity,
      refetchOnWindowFocus: false
    }
  }
})

export function AppQueryProvider({ children }: { children?: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}