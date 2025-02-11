import { FlightSheetPost } from "@/entities/flightsheet";
import _ from "lodash";
import { FormInput } from "../ui/flightsheet-modal";

export function mapFlightSheet(gpuTarget: boolean, cpuTarget: boolean, flightSheet?: FormInput): FlightSheetPost {
  const targets = _.map(flightSheet?.targets, (target, index) => {
    if (!cpuTarget && index === 1) return undefined;

    if (!gpuTarget && index === 0) return undefined;

    return {
      miningConfig: {
        $type: index === 0 ? 'GPU' : 'CPU' as 'GPU' | 'CPU',
        coinConfigs: _.compact(_.map(target.miningConfig.coinConfigs, (config) => {
          if (_.isEmpty(config.pool?.id) && _.isEmpty(config.wallet?.id)) 
            return undefined;

          return {
            poolId: config.pool?.id,
            walletId: config.wallet?.id,
            poolPassword: _.isEmpty(config?.poolPassword) ? undefined : config.poolPassword,
          }
        })),
        additionalArguments: _.isEmpty(target?.miningConfig.additionalArguments) ? undefined : target.miningConfig.additionalArguments,
        hugePages: target?.miningConfig.hugePages === 0 || _.isEmpty(target?.miningConfig.hugePages) ? undefined : target?.miningConfig.hugePages,
        configFileContent: _.isEmpty(target?.miningConfig.configFileContent) ? undefined : target.miningConfig.configFileContent,
        threadsCount: target?.miningConfig.threadsCount === 0 || _.isEmpty(target?.miningConfig.threadsCount) ? undefined : target?.miningConfig.threadsCount,
      },
      minerId: target.miner?.id
    }
  })

  const targetsFiltered = _.compact(targets)
  
  return {
    name: flightSheet?.name ?? '',
    targets: targetsFiltered,
  }
}