import { isType } from '@antv/util';
/**
 * 兼容 v1 tooltip formatter
 * @param tooltipConfig
 */
export function transformTooltip(tooltipConfig: any) {
  if (!isType(tooltipConfig, 'Object')) {
    return tooltipConfig;
  }
  const tooltip = { ...tooltipConfig };
  if (tooltip.formatter && !tooltip.customContent) {
    tooltip.customContent = tooltip.formatter;
  }
  return tooltip;
}
