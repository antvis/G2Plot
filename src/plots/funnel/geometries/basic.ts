import { Types } from '@antv/g2';
import { isArray } from '@antv/util';
import { flow, findGeometry } from '../../../utils';
import { getTooltipMapping } from '../../../utils/tooltip';
import { Params } from '../../../core/adaptor';
import { Datum, Data } from '../../../types/common';
import { geometry as baseGeometry } from '../../../adaptor/geometries/base';
import { FunnelOptions } from '../types';
import { FUNNEL_CONVERSATION, FUNNEL_PERCENT, FUNNEL_MAPPING_VALUE } from '../constant';
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
function conversionTag(params: Params<FunnelOptions>): Params<FunnelOptions> {
  const { options } = params;
  const { maxSize } = options;

  const getLineCoordinate = (
    datum: Datum,
    datumIndex: number,
    data: Data,
    initLineOption: Record<string, any>
  ): Types.LineOption => {
    const percent = maxSize - (maxSize - datum[FUNNEL_MAPPING_VALUE]) / 2;
    return {
      ...initLineOption,
      start: [datumIndex - 0.5, percent],
      end: [datumIndex - 0.5, percent + 0.05],
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
