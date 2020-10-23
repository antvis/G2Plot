import { get } from '@antv/util';
import { Tooltip, TooltipMapping } from '../types/tooltip';

/**
 * 获得 tooltip 的映射信息
 * @param tooltip
 * @param defaultFields
 */
export function getTooltipMapping(tooltip: Tooltip, defaultFields: string[]): TooltipMapping {
  if (tooltip === false) {
    return {};
  }

  let fields = get(tooltip, 'fields');
  const formatter = get(tooltip, 'formatter');

  fields = formatter ? fields || defaultFields : undefined;

  return {
    fields,
    formatter,
  };
}
