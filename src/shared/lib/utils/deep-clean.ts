import isArray from "lodash/isArray";
import isNil from "lodash/isNil";
import isObject from "lodash/isObject";
import isPlainObject from "lodash/isPlainObject";
import isEmpty from "lodash/isEmpty";
import { chain } from "lodash";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deepClean = (obj: any): any => {
  if (isArray(obj)) {
    return chain(obj)
      .map(deepClean)
      .filter(v => !isNil(v) && v.toString().trim() !== '')
      .value();
  }

  if (isPlainObject(obj)) {
    return chain(obj)
      .mapValues(deepClean)
      .omitBy(v => 
        isNil(v) || 
        v.toString().trim() === '' || 
        (isObject(v) && isEmpty(v)))
      .value();
  }

  return obj;
};