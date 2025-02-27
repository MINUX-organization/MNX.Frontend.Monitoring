import { applyFlightSheetApi, createFlightSheetApi, deleteFlightSheetApi, editFlightSheetApi, getFlightSheetDevicesApi, getFlightSheetDevicesSupportedApi, getFlightSheetsApi } from "@/shared/api";
import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FlightSheetSchema, FlightSheetType, PostFlightSheetType } from "./flight-sheet.type";
import { FlightSheetDevicesType } from "./flight-sheet-devices.type";
import { zodSaveParse } from "@/shared/lib/utils/zod-save-parse";
import { toaster } from "@/shared/ui/toaster";
import _ from "lodash";

export const flightSheetQueryOptions = queryOptions({
  queryKey: ['flightsheets'],
  queryFn: () => getFlightSheetsApi<FlightSheetType[]>(),
})

export const flightSheetByIdQueryOptions = (id?: string) => queryOptions({
  queryKey: ['flightsheets', id],
  queryFn: () => getFlightSheetsApi<FlightSheetType>(id),
  enabled: !!id,
})

export const flightSheetRigDevicesQueryOptions = (id?: string) => queryOptions({
  queryKey: ['flightsheets', id, 'devices'],
  queryFn: () => getFlightSheetDevicesApi<FlightSheetDevicesType[]>(id),
  enabled: !!id,
  staleTime: 5000
})

export const flightSheetRigDevicesSupportQueryOptions = (id?: string) => queryOptions({
  queryKey: ['flightsheets', id, 'devices-support'],
  queryFn: () => getFlightSheetDevicesSupportedApi<FlightSheetDevicesType[]>(id!),
  enabled: !!id,
  staleTime: 5000
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
      queryClient.invalidateQueries({ queryKey: ['flightsheets'] });
      toaster.success({
        description: 'You have successfully added flight sheet',
      })
    }
  })

  const editFlightSheetMutation = useMutation({
    mutationFn: ({ id, ...data }: { id: string } & PostFlightSheetType) => editFlightSheetApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flightsheets'] });
      toaster.success({
        description: 'You have successfully edited flight sheet',
      })
    }
  })

  const deleteFlightSheetMutation = useMutation({
    mutationFn: (id: string) => deleteFlightSheetApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flightsheets'] });
      toaster.success({
        description: 'You have successfully deleted flight sheet',
      })
    }
  })

  const applyFlightSheetDevicesMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: string[] }) => applyFlightSheetApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flightsheets'] });
      toaster.success({
        description: 'You have successfully applied flight sheet on devices',
      })
    }
  })

  return {
    addFlightSheet: addFlightSheetMutation.mutateAsync,
    editFlightSheet: editFlightSheetMutation.mutateAsync,
    deleteFlightSheet: deleteFlightSheetMutation.mutateAsync,
    applyFlightSheetDevices: applyFlightSheetDevicesMutation.mutateAsync
  }
}

export const flightSheetRepository = {
  useFlightSheetQuery,
  useFlightSheetMutation
}