type TotalDataType =
  "TotalCoinsList"          |
  "TotalShares"             |
  "TotalPower"              |
  "TotalRigsCount"       |
  "TotalGpusCount"          |
  "TotalCpusCount"

export type TriggerTotalData = {
  type: TotalDataType;
  newData: unknown;
}

type ChartCoinDataType = 
  'ChartCoinsList'  | 
  'ChartCoinValue'

export type TriggerChartCoinData = {
  type: ChartCoinDataType;
  newData: unknown;
}

export type TriggerRigData = {
  rigId: string;
  newData: unknown;
}

type RigDataType = 
"Name"          |
"GpuState"      |
"ActiveState"   |
"OnlineState"   |
"LocalIp"       |
"MinuxVersion"  |
"NvidiaCount"   |
"AmdCount"      |
"IntelCount"    |
"FlightSheet"

export type TriggerRigDataStatic = {
  rigId: string;
  type: RigDataType;
  newData: unknown;
}