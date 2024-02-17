import { StateObject } from "@/shared/lib/utils/state-object";
import { Worker as Type } from "@/entities/worker";
import _ from "lodash";

export function updateWorkerProperty(
  workersList: StateObject<Type[]>,
  workerId: string,
  updateFunction: (worker: Type) => void
) {
  const workerIndex = _.findIndex(
    workersList.value, (worker) => worker?.id === workerId
  );
  if (workerIndex === -1) return;
  const updatedWorkersList = [...workersList.value];
  updateFunction(updatedWorkersList[workerIndex]);
  workersList.setValue(updatedWorkersList);
}