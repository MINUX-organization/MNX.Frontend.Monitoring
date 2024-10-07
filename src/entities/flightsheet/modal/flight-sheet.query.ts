import { getFlightSheetsListApi } from "@/shared/api/get/getFlightSheetsList";
import { ZodSaveParse } from "@/shared/lib/utils/zod-save-parse";
import { useQuery } from "react-query";
import { Flightsheet } from "./types";
import { PRODUCTION_MODE } from "@/shared/constants/production-mode";

export const MockFlightsheet: Flightsheet[] = [{
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
    minerId: 'minerId',
    minerName: 'minerName',
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
    minerId: 'minerId',
    minerName: 'mi111nerName',
    hugePage: 2048,
    configFile: 'configFile'
  }]
}];

export function useFlightSheetQuery() {
  const { data, isLoading, ...query } = useQuery(['flightsheet'], getFlightSheetsListApi)

  const flightSheetsList = PRODUCTION_MODE ? ZodSaveParse(data, Flightsheet.array()) : MockFlightsheet

  return {
    flightSheetsList,
    isLoading: PRODUCTION_MODE ? isLoading : false,
    ...query
  };
}