import { percent } from '../../utils/transform/percent';
import { AreaOptions } from './types';

/**
 * 获取面积图数据，如果是百分比，进行数据转换
 * @param options 面积图配置项
 */
export function getAreaData(
  data: Record<string, any>[],
  yField: string,
  groupField: string,
  asField: string,
  isPercent?: boolean
) {
  // const { data, isPercent, xField, yField } = options;
  return !isPercent ? data : percent(data, yField, groupField, asField);
}
