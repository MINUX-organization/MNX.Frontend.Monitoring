import { addCryptocurrencyApi, deleteCryptocurrencyApi, getCryptocurrenciesApi } from "@/shared/api"
import { zodSaveParse } from "@/shared/lib/utils/zod-save-parse";
import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { CryptocurrencySchema, CryptocurrencyType, PostCryptocurrencyType } from "./cryptocurrency.type";
import { toaster } from "@/shared/ui/toaster";
import { AxiosError } from "axios";

export const cryptocurrencyQueryOptions = queryOptions({
  queryKey: ['cryptocurrency'],
  queryFn: () => getCryptocurrenciesApi<CryptocurrencyType[]>()
})

const useCryptocurrencyQuery = () => {
  const { data, ...query } = useQuery(cryptocurrencyQueryOptions);

  const cryptocurrencies = zodSaveParse(data?.data, CryptocurrencySchema.array().optional());

  return { cryptocurrencies, ...query }
} 

const useCryptocurrencyMutation = () => {
  const queryClient = useQueryClient();

  const addCryptocurrencyMutation = useMutation({
    mutationFn: (data: PostCryptocurrencyType) => addCryptocurrencyApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cryptocurrency'] });
      toaster.success({
        description: 'You have successfully added cryptocurrency',
      })
    },
    onError: (error: AxiosError<string[]>) => {
      toaster.error({
        title: error.message,
        description: error.response?.data[0],
      })
    }
  })

  const deleteCryptocurrencyMutation = useMutation({
    mutationFn: (id: string) => deleteCryptocurrencyApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cryptocurrency'] });
      toaster.success({
        description: 'You have successfully deleted cryptocurrency',
      })
    },
    onError: (error: AxiosError<string[]>) => {
      toaster.error({
        title: error.message,
        description: error.response?.data[0],
      })
    }
  })

  return {
    addCryptocurrency: addCryptocurrencyMutation.mutateAsync,
    deleteCryptocurrency: deleteCryptocurrencyMutation.mutateAsync,
  }
}

export const cryptocurrencyRepository = {
  useCryptocurrencyQuery,
  useCryptocurrencyMutation,
}