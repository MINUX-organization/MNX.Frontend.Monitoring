import { getFlightSheetsListApi } from "@/shared/api/get/getFlightSheetsList";
import { ZodSaveParse } from "@/shared/lib/utils/zod-save-parse";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { FlightSheet, FlightSheetPost } from "./types";
import { PRODUCTION_MODE } from "@/shared/constants/production-mode";
import _ from "lodash";
import { addFlightSheetApi } from "@/shared/api/post/addFlightSheet";
import { deleteFlightSheetApi } from "@/shared/api/delete/deleteFlightSheet";
import { editFlightSheetApi } from "@/shared/api/put/editFlightSheet";
import { IS_SUCCESS_STATUS } from "@/shared/api/api-instance";

export const MockFlightSheet: FlightSheet[] = [{
  id: '1',
  name: 'Mock Flight 22222222222',
  devices: [
    { name: 'Rig 1', devices: [{ id: '1', name: 'GPU 1', busId: '1' }, { id: '2', name: 'GPU 2', busId: '2' }, { id: '3', name: 'GPU 3', busId: '3' }] },
    { name: 'Rig 2', devices: [{ id: '4', name: 'GPU 4', busId: '4' }, { id: '5', name: 'GPU 5', busId: '5' }, { id: '6', name: 'GPU 6', busId: '6' }] }
  ],
  target: [{
    id: '1',
    $type: "GPU",
    configs: [
      {
        pool: {
          id: '1',
          domain: 'pool.example.com',
          port: 3333,
          cryptocurrency: 'BTC'
        },
        poolPassword: 'poolPassword',
        wallet: {
          id: '1',
          name: 'My Wallet',
          address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
          cryptocurrency: 'BTC'
        }
      },
      {
        pool: {
          id: '2',
          domain: 'pool.com',
          port: 3333,
          cryptocurrency: 'Etherium'
        },
        poolPassword: 'poolPassword',
        wallet: {
          id: '2',
          name: 'Wallet',
          address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
          cryptocurrency: 'BTC'
        }
      },
      {
        pool: {
          id: '3',
          domain: 'poooool.com',
          port: 3333,
          cryptocurrency: 'Etherium'
        },
        poolPassword: 'poolPassword',
        wallet: {
          id: '3',
          name: 'wwwwwallet',
          address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
          cryptocurrency: 'BTC'
        }
      }
    ],
    additionalArguments: 'additionalArguments',
    miner: {
      id: '1',
      name: 'minerName',
      version: '1.0.0',
      devicesType: 'AmdCpu, AmdGpu, NvidiaGpu',
      miningMode: 'Dual'
    },
    configFile: 'configFile'
  },
  {
    id: '2',
    $type: "CPU",
    configs: [
      {
        pool: {
          id: '1',
          domain: 'pool.example.com',
          port: 3333,
          cryptocurrency: 'BTC'
        },
        poolPassword: 'poolPassword',
        wallet: {
          id: '1',
          name: 'My Wallet',
          address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
          cryptocurrency: 'BTC'
        }
      }
    ],
    additionalArguments: 'additionalArguments',
    miner: {
      id: '2',
      name: 'xxxxx',
      version: '1.0.0',
      devicesType: 'AmdCpu',
      miningMode: 'Single'
    },
    hugePage: 2048,
    configFile: 'configFile'
  }]
}];

export function useFlightSheetRepository() {
  const queryClient = useQueryClient();
  const { data, isLoading, ...query } = useQuery(['flightsheetsList'], getFlightSheetsListApi)

  const flightSheetsList = PRODUCTION_MODE ? ZodSaveParse(data, FlightSheet.array()) : MockFlightSheet

  const addFlightSheetMutation = useMutation({
    mutationFn: (flightSheet: FlightSheetPost) => addFlightSheetApi(flightSheet),
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['flightsheetsList'],
        _.concat(data, flightSheetsList))
    }
  });

  const editFlightSheetMutation = useMutation({
    mutationFn: (value: {id: string, flightSheet: FlightSheetPost}) => editFlightSheetApi(value.id, value.flightSheet),
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['flightsheetsList'],
        _.map(flightSheetsList, (flightSheet) => flightSheet.id === data.id ? data : flightSheet)
      )
    }
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
    isLoading: PRODUCTION_MODE ? isLoading : false,
    ...query
  };
}