import { DataItem } from '../../interface/config';
import { map } from '@antv/util';

export function getOriginKey(key: string) {
  return `_ORIGIN_${key}_`;
}

export function processEmpty(data: DataItem[], key: string, transformData?: (v: any) => any) {
  const originalData = [...data];
  return map(originalData, (d) => {
    const originalKey = getOriginKey(key);
    const originalValue = d[key];
    return { ...d, [key]: transformData ? transformData(originalValue) : 1, [originalKey]: originalValue };
  });
}
