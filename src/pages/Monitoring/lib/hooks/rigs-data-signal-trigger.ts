import { Rig as Type } from "@/entities/rig";
import { WebsocketContext } from "@/shared/lib/providers/websocket-provider";
import { useStateObject } from "@/shared/lib/utils/state-object";
import { TriggerRigData, TriggerRigDataStatic } from "../../model/types";
import { ZodSaveParse } from "@/shared/lib/utils/zod-save-parse";
import { match } from "ts-pattern";
import _ from "lodash";
import { 
  RigAmdCount,
  RigCoinInfo,
  RigGpusState,
  RigIntelCount,
  RigIsActive,
  RigLocalIp,
  RigMinuxVersion,
  RigName, 
  RigNvidiaCount, 
  RigOnlineState
} from "@/entities/rig/model/types";
import { updateRigProperty } from '../utils/update-rig-property'
import { BACKEND_TRIGGERS } from "@/shared/constants/backend-triggers";

export function useRigsDataSignalTrigger() {
  const rigsList = useStateObject<Type[]>();
  
  WebsocketContext.useSignalREffect(
    BACKEND_TRIGGERS.RECEIVED_RIGS_INFORMATION,
    (data: unknown) => {
      ZodSaveParse(data, Type.array(), (checkedData) => {
        rigsList.setValue(checkedData) 
      })
    },
    []
  )

  WebsocketContext.useSignalREffect(
    BACKEND_TRIGGERS.RECEIVED_RIGS_STATE,
    (data: unknown) => {
      ZodSaveParse(data, Type.array(), (checkedData) => { 
        rigsList.setValue(_.merge(rigsList.value, checkedData))
      })
    },
    []
  )

  WebsocketContext.useSignalREffect(
    BACKEND_TRIGGERS.RECEIVED_RIG_STATE_CHANGE,
    (data: TriggerRigDataStatic) => {
      match(data)
        .with({ type: 'Name' }, ({ newData }) => {
          ZodSaveParse(newData, RigName, (checkedData) => {
            updateRigProperty(rigsList, data.rigId, (rig) => {
              if (!rig) return;
              rig.name = checkedData;
            });
          })
        })
        .with({ type: 'GpuState' }, ({ newData }) => {
          ZodSaveParse(newData, RigGpusState, (checkedData) => {
            updateRigProperty(rigsList, data.rigId, (rig) => {
              if (!rig) return;
              rig.gpusState = checkedData;
            });
          })
        })
        .with({ type: 'ActiveState' }, ({ newData }) => {
          ZodSaveParse(newData, RigIsActive, (checkedData) => {
            updateRigProperty(rigsList, data.rigId, (rig) => {
              if (!rig) return;
              rig.isActive = checkedData;
            });
          })
        })
        .with({ type: 'OnlineState' }, ({ newData }) => {
          ZodSaveParse(newData, RigOnlineState, (checkedData) => {
            updateRigProperty(rigsList, data.rigId, (rig) => {
              if (!rig) return;
              rig.onlineState = checkedData;
            });
          })
        })
        .with({ type: 'LocalIp' }, ({ newData }) => {
          ZodSaveParse(newData, RigLocalIp, (checkedData) => {
            updateRigProperty(rigsList, data.rigId, (rig) => {
              if (!rig) return;
              rig.localIp = checkedData;
            });
          })
        })
        .with({ type: 'MinuxVersion' }, ({ newData }) => {
          ZodSaveParse(newData, RigMinuxVersion, (checkedData) => {
            updateRigProperty(rigsList, data.rigId, (rig) => {
              if (!rig) return;
              rig.minuxVersion = checkedData;
            });
          })
        })
        .with({ type: 'NvidiaCount' }, ({ newData }) => {
          ZodSaveParse(newData, RigNvidiaCount, (checkedData) => {
            updateRigProperty(rigsList, data.rigId, (rig) => {
              if (!rig) return;
              rig.nvidiaCount = checkedData;
            });
          })
        })
        .with({ type: 'AmdCount' }, ({ newData }) => {
          ZodSaveParse(newData, RigAmdCount, (checkedData) => {
            updateRigProperty(rigsList, data.rigId, (rig) => {
              if (!rig) return;
              rig.amdCount = checkedData;
            });
          })
        })
        .with({ type: 'IntelCount' }, ({ newData }) => {
          ZodSaveParse(newData, RigIntelCount, (checkedData) => {
            updateRigProperty(rigsList, data.rigId, (rig) => {
              if (!rig) return;
              rig.intelCount = checkedData;
            });
          })
        })
        .with({ type: 'FlightSheet' }, ({ newData }) => {
          ZodSaveParse(newData, RigCoinInfo.array(), (checkedData) => {
            updateRigProperty(rigsList, data.rigId, (rig) => {
              if (!rig) return;
              rig.coinInfo = checkedData;
            });
          })
        })
        .otherwise(() => { return })
      },
    []
  )

  WebsocketContext.useSignalREffect(
    BACKEND_TRIGGERS.RECEIVED_RIGS_DYNAMIC_DATA,
    (data: TriggerRigData) => {
      ZodSaveParse(data, Type.array(), (checkedData) => { 
        rigsList.setValue(_.merge(rigsList.value, checkedData))
      })
    },
    []
  )

  return rigsList
}