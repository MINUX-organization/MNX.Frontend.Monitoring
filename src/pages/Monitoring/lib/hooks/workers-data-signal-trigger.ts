import { Worker as Type } from "@/entities/worker";
import { WebsocketContext } from "@/shared/lib/providers/websocket-context";
import { useStateObject } from "@/shared/lib/utils/state-object";
import { TriggerWorkerData, TriggerWorkerDataStatic } from "../../model/types";
import { ZodSaveParse } from "@/shared/lib/utils/zod-save-parse";
import { match } from "ts-pattern";
import _ from "lodash";
import { 
  WorkerAmdCount,
  WorkerFlightSheetInfo,
  WorkerGpusState,
  WorkerIntelCount,
  WorkerIsActive,
  WorkerLocalIp,
  WorkerMinuxVersion,
  WorkerName, 
  WorkerNvidiaCount, 
  WorkerOnlineState
} from "@/entities/worker/model/types";
import { updateWorkerProperty } from "../utils/update-worker-property";
import { BACKEND_TRIGGERS } from "@/shared/constants/backend-triggers";

export function useWorkersDataSignalTrigger() {
  const workersList = useStateObject<Type[]>();
  WebsocketContext.useSignalREffect(
    BACKEND_TRIGGERS.RECEIVED_WORKERS_INFORMATION,
    (data: unknown) => {
      ZodSaveParse(data, Type.array(), (checkedData) => {
        workersList.setValue(checkedData) 
      })
    },
    []
  )

  WebsocketContext.useSignalREffect(
    BACKEND_TRIGGERS.RECEIVED_WORKERS_STATE,
    (data: unknown) => {
      ZodSaveParse(data, Type.array(), (checkedData) => { 
        workersList.setValue(_.merge(workersList.value, checkedData))
      })
    },
    []
  )

  WebsocketContext.useSignalREffect(
    BACKEND_TRIGGERS.RECEIVED_WORKER_STATE_CHANGE,
    (data: TriggerWorkerDataStatic) => {
      match(data)
        .with({ type: 'Name' }, ({ newData }) => {
          ZodSaveParse(newData, WorkerName, (checkedData) => {
            updateWorkerProperty(workersList, data.workerId, (worker) => {
              if (!worker) return;
              worker.name = checkedData;
            });
          })
        })
        .with({ type: 'GpuState' }, ({ newData }) => {
          ZodSaveParse(newData, WorkerGpusState, (checkedData) => {
            updateWorkerProperty(workersList, data.workerId, (worker) => {
              if (!worker) return;
              worker.gpusState = checkedData;
            });
          })
        })
        .with({ type: 'ActiveState' }, ({ newData }) => {
          ZodSaveParse(newData, WorkerIsActive, (checkedData) => {
            updateWorkerProperty(workersList, data.workerId, (worker) => {
              if (!worker) return;
              worker.isActive = checkedData;
            });
          })
        })
        .with({ type: 'OnlineState' }, ({ newData }) => {
          ZodSaveParse(newData, WorkerOnlineState, (checkedData) => {
            updateWorkerProperty(workersList, data.workerId, (worker) => {
              if (!worker) return;
              worker.onlineState = checkedData;
            });
          })
        })
        .with({ type: 'LocalIp' }, ({ newData }) => {
          ZodSaveParse(newData, WorkerLocalIp, (checkedData) => {
            updateWorkerProperty(workersList, data.workerId, (worker) => {
              if (!worker) return;
              worker.localIp = checkedData;
            });
          })
        })
        .with({ type: 'MinuxVersion' }, ({ newData }) => {
          ZodSaveParse(newData, WorkerMinuxVersion, (checkedData) => {
            updateWorkerProperty(workersList, data.workerId, (worker) => {
              if (!worker) return;
              worker.minuxVersion = checkedData;
            });
          })
        })
        .with({ type: 'NvidiaCount' }, ({ newData }) => {
          ZodSaveParse(newData, WorkerNvidiaCount, (checkedData) => {
            updateWorkerProperty(workersList, data.workerId, (worker) => {
              if (!worker) return;
              worker.nvidiaCount = checkedData;
            });
          })
        })
        .with({ type: 'AmdCount' }, ({ newData }) => {
          ZodSaveParse(newData, WorkerAmdCount, (checkedData) => {
            updateWorkerProperty(workersList, data.workerId, (worker) => {
              if (!worker) return;
              worker.amdCount = checkedData;
            });
          })
        })
        .with({ type: 'IntelCount' }, ({ newData }) => {
          ZodSaveParse(newData, WorkerIntelCount, (checkedData) => {
            updateWorkerProperty(workersList, data.workerId, (worker) => {
              if (!worker) return;
              worker.intelCount = checkedData;
            });
          })
        })
        .with({ type: 'FlightSheet' }, ({ newData }) => {
          ZodSaveParse(newData, WorkerFlightSheetInfo.array(), (checkedData) => {
            updateWorkerProperty(workersList, data.workerId, (worker) => {
              if (!worker) return;
              worker.flightSheetInfo = checkedData;
            });
          })
        })
        .otherwise(() => { return })
      },
    []
  )

  WebsocketContext.useSignalREffect(
    BACKEND_TRIGGERS.RECEIVED_WORKERS_DYNAMIC_DATA,
    (data: TriggerWorkerData) => {
      ZodSaveParse(data, Type.array(), (checkedData) => { 
        workersList.setValue(_.merge(workersList.value, checkedData))
      })
    },
    []
  )

  return workersList
}