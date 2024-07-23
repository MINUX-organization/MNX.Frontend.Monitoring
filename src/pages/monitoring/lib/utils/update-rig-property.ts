import { StateObject } from "@/shared/lib/utils/state-object";
import { Rig as Type } from "@/entities/rig";
import _ from "lodash";

export function updateRigProperty(
  rigsList: StateObject<Type[]>,
  rigId: string,
  updateFunction: (rig: Type) => void
) {
  const rigIndex = _.findIndex(
    rigsList.value, (rig) => rig?.id === rigId
  );
  if (rigIndex === -1) return;
  const updatedRigsList = [...rigsList.value];
  updateFunction(updatedRigsList[rigIndex]);
  rigsList.setValue(updatedRigsList);
}