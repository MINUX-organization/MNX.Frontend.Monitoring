import { FlightSheetType, PostFlightSheetType } from "@/entities/flight-sheet";

export function flightSheetToPost(flightSheet: FlightSheetType): PostFlightSheetType {
  return {
    name: flightSheet.name,
    targets: flightSheet.targets.map(target => ({
      minerId: target.miner.id,
      miningConfig: {
        $type: target.miningConfig.$type,
        configFileContent: target?.miningConfig?.configFileContent,
        additionalArguments: target?.miningConfig?.additionalArguments,
        coinConfigs: target.miningConfig.coinConfigs.map(coinConfig => ({
          poolId: coinConfig.pool.id,
          walletId: coinConfig.wallet.id,
          poolPassword: coinConfig.poolPassword
        })),
        threadsCount: target?.miningConfig?.threadsCount?.toString(),
        hugePages: target?.miningConfig?.hugePages?.toString()
      }
    }))
  }
}