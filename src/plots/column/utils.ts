import DataSet from '@antv/data-set';
import { ColumnOptions } from './types';

/**
 * percent 处理数据
 * @param options
 */
export function transformData(options: ColumnOptions) {
  const { data, xField, seriesField, yField } = options;
  const { DataView } = DataSet;
  const dv = new DataView();
  dv.source(data).transform({
    type: 'percent',
    field: yField,
    dimension: seriesField,
    groupBy: [xField],
    as: yField,
  });
  return dv.rows;
}
