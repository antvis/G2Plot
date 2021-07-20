import { isNumber, isString, isDate } from '@antv/util';

/**
 * 根据字段判断类型
 */
export function getDefaultMetaType(field: string, data: any[]) {
  const value = data[0][field];
  let type = 'linear';
  if (isNumber(value)) type = 'linear';
  if (isString(value)) type = 'cat';
  if (isDate(value) || !isNaN(Date.parse(value))) type = 'time';
  return type;
}
