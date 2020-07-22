import { isString, isObject } from '@antv/util';

/**
 * obj 中是否存在 keys
 * @param obj
 * @param keys
 */
export function includeKeys(obj: any, keys: string | string[]): boolean {
  if (!keys) {
    return true;
  }
  if (!isObject(obj)) {
    return false;
  }

  if (isString(keys)) {
    return !!obj[keys];
  }

  let include = true;
  keys.forEach((key: string) => {
    if (!obj[key]) {
      include = false;
    }
  });

  return include;
}
