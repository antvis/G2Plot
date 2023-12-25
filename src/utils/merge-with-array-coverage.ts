import { isArray, mergeWith } from './index';

const arrayCoverage = (objValue: unknown, srcValue: unknown) => {
  if (isArray(srcValue)) {
    return srcValue;
  }
};

export const mergeWithArrayCoverage = (...args) => {
  return mergeWith.apply(null, [...args, arrayCoverage]);
};
