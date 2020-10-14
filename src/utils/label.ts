import { isType } from '@antv/util';
/**
 * 兼容 v1 label formatter
 * @param labelConfig
 */
export function transformLabel(labelConfig: any) {
  if (!isType(labelConfig, 'Object')) {
    return labelConfig;
  }
  const label = { ...labelConfig };
  if (label.formatter && !label.content) {
    label.content = label.formatter;
  }
  return label;
}
