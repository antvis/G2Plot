import { get } from '@antv/util';
import { Tooltip, TooltipMapping } from '../types/tooltip';

/**
 * 获得 tooltip 的映射信息
 * @param tooltip
 * @param defaultFields
 */
export function getTooltipMapping(tooltip: Tooltip, defaultFields: string[]): TooltipMapping {
  if (tooltip === false) {
    return {
      fields: false, // 关闭 tooltip
    };
  }

  let fields = get(tooltip, 'fields');
  const formatter = get(tooltip, 'formatter');

  if (formatter && !fields) {
    fields = defaultFields;
  }

  return {
    fields,
    formatter,
  };
}
