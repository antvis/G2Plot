import { isType } from '@antv/util';
/**
 * 兼容 v1 label formatter
 * @param labelOptions
 */
export function transformLabel(labelOptions: any) {
  if (!isType(labelOptions, 'Object')) {
    return labelOptions;
  }
  const label = { ...labelOptions };
  if (label.formatter && !label.content) {
    label.content = label.formatter;
  }
  return label;
}
