import { toaster } from '@/shared/ui/toaster';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AxiosError } from 'axios';

// eslint-disable-next-line react-refresh/only-export-components
export const queryClient = new QueryClient({
  defaultOptions: {
    queries : { 
      staleTime: Infinity,
      refetchOnWindowFocus: false,      
    },
    mutations: {
      onError: (error) => {
        if (error instanceof AxiosError) {
          if (error.response?.status === 401) {
            return;
          }
          
          toaster.error({
            title: error.message,
            description: error.response?.data[0],
          })
        }
      }
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