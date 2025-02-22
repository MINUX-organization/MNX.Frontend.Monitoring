import { createFlightSheetApi, getFlightSheetsApi } from "@/shared/api";
import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FlightSheetSchema, FlightSheetType, PostFlightSheetType } from "./flight-sheet.type";
import { zodSaveParse } from "@/shared/lib/utils/zod-save-parse";
import { toaster } from "@/shared/ui/toaster";

export const flightSheetQueryOptions = queryOptions({
  queryKey: ['flightsheet'],
  queryFn: getFlightSheetsApi<FlightSheetType[]>,
})

const useFlightSheetQuery = () => {
  const { data, ...query } = useQuery(flightSheetQueryOptions)

  const flightSheets = zodSaveParse(data?.data, FlightSheetSchema.array().optional());

  return {
    flightSheets,
    ...query
  }
}

const useFlightSheetMutation = () => {
  const queryClient = useQueryClient();

  const addFlightSheetMutation = useMutation({
    mutationFn: (data: PostFlightSheetType) => createFlightSheetApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flightsheet'] });
      toaster.success({
        description: 'You have successfully added flight sheet',
      })
    }
  })

  return {
    addFlightSheet: addFlightSheetMutation.mutateAsync
  }
}

export const flightSheetRepository = {
  useFlightSheetQuery,
  useFlightSheetMutation
}