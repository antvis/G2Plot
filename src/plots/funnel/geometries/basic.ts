import { map } from '@antv/util';
import { LineOption } from '@antv/g2/lib/interface';
import { flow, findGeometry } from '../../../utils';
import { getTooltipMapping } from '../../../utils/tooltip';
import { Params } from '../../../core/adaptor';
import { Datum, Data } from '../../../types/common';
import { geometry as baseGeometry } from '../../../adaptor/geometries/base';
import { FunnelOptions } from '../types';
import { FUNNEL_CONVERSATION, FUNNEL_PERCENT } from '../constant';
import { geometryLabel, conversionTagComponent } from './common';

/**
 * 处理字段数据
 * @param params
 */
function field(params: Params<FunnelOptions>): Params<FunnelOptions> {
  const { chart, options } = params;
  const { data = [], yField } = options;
  let formatData = [];
  // format 数据
  if (data[0][yField]) {
    formatData = map(data, (row, index) => {
      if (row[yField] !== undefined) {
        row[FUNNEL_PERCENT] = row[yField] / data[0][yField];
        row[FUNNEL_CONVERSATION] = index === 0 ? 1 : row[yField] / data[index - 1][yField];
      }
      return row;
    });
  }

  // 绘制漏斗图
  chart.data(formatData);
  return params;
}

/**
 * geometry处理
 * @param params
 */
function geometry(params: Params<FunnelOptions>): Params<FunnelOptions> {
  const { chart, options } = params;
  const { xField, yField, color, tooltip } = options;

  const { fields, formatter } = getTooltipMapping(tooltip, [xField, yField, FUNNEL_PERCENT, FUNNEL_CONVERSATION]);

  baseGeometry({
    chart,
    options: {
      type: 'interval',
      xField: xField,
      yField: yField,
      colorField: xField,
      tooltipFields: fields,
      mapping: {
        shape: 'funnel',
        tooltip: formatter,
        color,
      },
    },
  });

  const geo = findGeometry(params.chart, 'interval');
  geo.adjust('symmetric');

  return params;
}

/**
 * 转置处理
 * @param params
 */
function transpose(params: Params<FunnelOptions>): Params<FunnelOptions> {
  const { chart, options } = params;
  const { isTransposed } = options;
  chart.coordinate({
    type: 'rect',
    actions: !isTransposed ? [['transpose'], ['scale', 1, -1]] : [],
  });
  return params;
}

/**
 * label 处理
 * @param params
 */
function label(params: Params<FunnelOptions>): Params<FunnelOptions> {
  geometryLabel(findGeometry(params.chart, 'interval'))(params);

  return params;
}

/**
 * 转化率组件
 * @param params
 */
function conversionTag(params: Params<FunnelOptions>): Params<FunnelOptions> {
  const { options } = params;
  const { yField } = options;

  const getLineCoordinate = (
    datum: Datum,
    datumIndex: number,
    data: Data,
    initLineOption: Record<string, any>
  ): LineOption => {
    const percent = 1 - (1 - datum[FUNNEL_PERCENT]) / 2;
    return {
      ...initLineOption,
      start: [datumIndex - 0.5, data[0][yField] * percent],
      end: [datumIndex - 0.5, data[0][yField] * (percent + 0.05)],
    };
  };

  conversionTagComponent(getLineCoordinate)(params);

  return params;
}

/**
 * 基础漏斗
 * @param chart
 * @param options
 */
export function basicFunnel(params: Params<FunnelOptions>) {
  return flow(field, geometry, transpose, conversionTag, label)(params);
}
