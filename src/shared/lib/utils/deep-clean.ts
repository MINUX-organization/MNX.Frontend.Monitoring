import _ from "lodash";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deepClean = (obj: any): any => {
  if (_.isArray(obj)) {
    return _.chain(obj)
      .map(deepClean)
      .filter(v => !_.isNil(v) && v.toString().trim() !== '')
      .value();
  }

  if (_.isPlainObject(obj)) {
    return _.chain(obj)
      .mapValues(deepClean)
      .omitBy(v => 
        _.isNil(v) || 
        v.toString().trim() === '' || 
        (_.isObject(v) && _.isEmpty(v)))
      .value();
  }

  return obj;
};