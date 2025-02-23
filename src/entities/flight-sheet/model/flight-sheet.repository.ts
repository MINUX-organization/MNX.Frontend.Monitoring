import { createFlightSheetApi, deleteFlightSheetApi, editFlightSheetApi, getFlightSheetsApi } from "@/shared/api";
import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FlightSheetSchema, FlightSheetType, PostFlightSheetType } from "./flight-sheet.type";
import { zodSaveParse } from "@/shared/lib/utils/zod-save-parse";
import { toaster } from "@/shared/ui/toaster";
import _ from "lodash";

export const flightSheetQueryOptions = queryOptions({
  queryKey: ['flightsheet'],
  queryFn: getFlightSheetsApi<FlightSheetType[]>,
})

const useFlightSheetQuery = () => {
  const { data, ...query } = useQuery(flightSheetQueryOptions)

  const flightSheets = zodSaveParse(data?.data, FlightSheetSchema.array().optional());

  const getById = (id?: string) => {
    if (!id) return undefined;  
    return _.find(flightSheets, (flightSheet) => flightSheet.id === id);
  }

  return {
    flightSheets,
    getById,
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

  const editFlightSheetMutation = useMutation({
    mutationFn: ({ id, ...data }: { id: string } & PostFlightSheetType) => editFlightSheetApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flightsheet'] });
      toaster.success({
        description: 'You have successfully edited flight sheet',
      })
    }
  })

  const deleteFlightSheetMutation = useMutation({
    mutationFn: (id: string) => deleteFlightSheetApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flightsheet'] });
      toaster.success({
        description: 'You have successfully deleted flight sheet',
      })
    }
  })

  return {
    addFlightSheet: addFlightSheetMutation.mutateAsync,
    editFlightSheet: editFlightSheetMutation.mutateAsync,
    deleteFlightSheet: deleteFlightSheetMutation.mutateAsync
  }
}

export const flightSheetRepository = {
  useFlightSheetQuery,
  useFlightSheetMutation
}