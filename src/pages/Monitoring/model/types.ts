type TotalDataType =
  "TotalCoinsList"          |
  "TotalShares"             |
  "TotalPower"              |
  "TotalWorkersCount"       |
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

export type TriggerWorkerData = {
  workerId: string;
  newData: unknown;
}

type WorkerDataType = 
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

export type TriggerWorkerDataStatic = {
  workerId: string;
  type: WorkerDataType;
  newData: unknown;
}