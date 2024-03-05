import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries : { 
      cacheTime: Infinity,
      staleTime: Infinity,
      refetchOnWindowFocus: false
    }
  }
})

export default function QueryProvider({ children }: { children?: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}