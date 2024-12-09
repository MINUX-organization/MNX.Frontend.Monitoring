import { getFlightSheetsListApi } from "@/shared/api/get/getFlightSheetsList";
import { ZodSaveParse } from "@/shared/lib/utils/zod-save-parse";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { FlightSheet, FlightSheetPost } from "./types";
import _ from "lodash";
import { addFlightSheetApi } from "@/shared/api/post/addFlightSheet";
import { deleteFlightSheetApi } from "@/shared/api/delete/deleteFlightSheet";
import { editFlightSheetApi } from "@/shared/api/put/editFlightSheet";
import { IS_SUCCESS_STATUS } from "@/shared/api/api-instance";

export function useFlightSheetRepository() {
  const queryClient = useQueryClient();
  const { data, isLoading, ...query } = useQuery(['flightsheetsList'], getFlightSheetsListApi)

  const flightSheetsList = ZodSaveParse(data, FlightSheet.array().optional());

  const addFlightSheetMutation = useMutation({
    mutationFn: (flightSheet: FlightSheetPost) => addFlightSheetApi(flightSheet),
    onSuccess: () => queryClient.invalidateQueries(['flightsheetsList']) 
  });

  const editFlightSheetMutation = useMutation({
    mutationFn: (value: {id: string, flightSheet: FlightSheetPost}) => editFlightSheetApi(value.id, value.flightSheet),
    onSuccess: () => queryClient.invalidateQueries(['flightsheetsList'])
  })

  const deleteFlightSheetMutation = useMutation({
    mutationFn: (id: string) => deleteFlightSheetApi(id),
    onSuccess: (_data, variables) => {
      queryClient.setQueryData(
        ['flightsheetsList'],
        _.filter(flightSheetsList, (flightSheet) => flightSheet.id !== variables)
      )
    }
  })
  
  const addFlightSheet = async (flightSheet: FlightSheetPost) => {
    const status = await addFlightSheetMutation.mutateAsync(flightSheet);

    return IS_SUCCESS_STATUS(status);
  };

  const editFlightSheet = async (id: string, flightSheet: FlightSheetPost) => {
    const status = await editFlightSheetMutation.mutateAsync({id, flightSheet});

    return IS_SUCCESS_STATUS(status);
  };

  const deleteFlightSheet = async (id: string) => {
    const status = await deleteFlightSheetMutation.mutateAsync(id);

    return IS_SUCCESS_STATUS(status.status);
  };

  return {
    flightSheetsList,
    addFlightSheet,
    editFlightSheet,
    deleteFlightSheet,
    isLoading,
    ...query
  };
}