import { Types } from '@antv/g2';
import { get, isArray, map } from '@antv/util';
import { geometry as baseGeometry } from '../../../adaptor/geometries/base';
import { Params } from '../../../core/adaptor';
import { Data, Datum } from '../../../types/common';
import { findGeometry, flow } from '../../../utils';
import { getTooltipMapping } from '../../../utils/tooltip';
import { FUNNEL_CONVERSATION, FUNNEL_MAPPING_VALUE, FUNNEL_PERCENT } from '../constant';
import { FunnelOptions } from '../types';
import { conversionTagComponent, transformData } from './common';

/**
 * 处理字段数据
 * @param params
 */
function field(params: Params<FunnelOptions>): Params<FunnelOptions> {
  const { chart, options } = params;
  const { data = [], yField, maxSize, minSize } = options;
  const formatData = transformData(data, data, {
    yField,
    maxSize,
    minSize,
  });

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
  const { xField, yField, color, tooltip, label, shape = 'funnel', funnelStyle, state } = options;

  const { fields, formatter } = getTooltipMapping(tooltip, [xField, yField]);

  baseGeometry({
    chart,
    options: {
      type: 'interval',
      xField: xField,
      yField: FUNNEL_MAPPING_VALUE,
      colorField: xField,
      tooltipFields: isArray(fields) && fields.concat([FUNNEL_PERCENT, FUNNEL_CONVERSATION]),
      mapping: {
        shape,
        tooltip: formatter,
        color,
        style: funnelStyle,
      },
      label,
      state,
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
 * 转化率组件
 * @param params
 */
export function conversionTag(params: Params<FunnelOptions>): Params<FunnelOptions> {
  const { options, chart } = params;
  const { maxSize } = options;

  // 获取形状位置，再转化为需要的转化率位置
  const dataArray = get(chart, ['geometries', '0', 'dataArray'], []);
  const size = get(chart, ['options', 'data', 'length']);
  const x = map(dataArray, (item) => get(item, ['0', 'nextPoints', '0', 'x']) * size - 0.5);

  const getLineCoordinate = (
    datum: Datum,
    datumIndex: number,
    data: Data,
    initLineOption: Record<string, any>
  ): Types.LineOption => {
    const percent = maxSize - (maxSize - datum[FUNNEL_MAPPING_VALUE]) / 2;
    return {
      ...initLineOption,
      start: [x[datumIndex - 1] || datumIndex - 0.5, percent],
      end: [x[datumIndex - 1] || datumIndex - 0.5, percent + 0.05],
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
  return flow(field, geometry, transpose, conversionTag)(params);
}
