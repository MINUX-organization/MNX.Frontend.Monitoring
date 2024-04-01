import _ from "lodash";

export function fromKeyToWord(key: string) {
  return _.startCase(key).replace(/([A-Z])/g, ' $1').trim();
}