import { Types } from '@antv/g2';
import { get, isArray, map, maxBy, reduce } from '@antv/util';
import { geometry as baseGeometry } from '../../../adaptor/geometries/base';
import { Params } from '../../../core/adaptor';
import { Data, Datum } from '../../../types/common';
import { flow } from '../../../utils';
import { getTooltipMapping } from '../../../utils/tooltip';
import { FUNNEL_CONVERSATION, FUNNEL_PERCENT, FUNNEL_TOTAL_PERCENT, PLOYGON_X, PLOYGON_Y } from '../constant';
import { FunnelOptions } from '../types';
import { conversionTagComponent } from './common';

/**
 * 动态高度漏斗图
 * @param params
 * 需求: 每个漏斗项的高度根据 yfield 等比生成。漏斗上下宽度比为2，即斜率为 2。
 * 实现方式: 使用 g2 多边形，data -> 点坐标 -> 绘制
 * 以漏斗底部中心点为坐标轴原点，漏斗在 -0.5 <= x <= 0.5, 0 <= y <= 1 的正方形中绘制
 * 先计算第一象限的点, 第二象限的点即为镜像 x 轴取反。
 * 第一象限共需计算 data.length + 1 个点，在 y = 4x - 1 上。首尾分别是[0.5, 1], [0.25, 0]。根据 data 计算出 y 值，从而得到 y 值
 */

/**
 * 处理数据
 * @param params
 */
function field(params: Params<FunnelOptions>): Params<FunnelOptions> {
  const { chart, options } = params;
  const { data = [], yField } = options;

  // 计算各数据项所占高度
  const sum = reduce(
    data,
    (total, item) => {
      return total + (item[yField] || 0);
    },
    0
  );

  const max = maxBy(data, yField)[yField];

  const formatData = map(data, (row, index) => {
    // 储存四个点 x，y 坐标，方向为顺时针，即 [左上, 右上，右下，左下]
    const x = [];
    const y = [];

    row[FUNNEL_TOTAL_PERCENT] = (row[yField] || 0) / sum;

    // 获取左上角，右上角坐标
    if (index) {
      const preItemX = data[index - 1][PLOYGON_X];
      const preItemY = data[index - 1][PLOYGON_Y];
      x[0] = preItemX[3];
      y[0] = preItemY[3];
      x[1] = preItemX[2];
      y[1] = preItemY[2];
    } else {
      x[0] = -0.5;
      y[0] = 1;
      x[1] = 0.5;
      y[1] = 1;
    }

    // 获取右下角坐标
    y[2] = y[1] - row[FUNNEL_TOTAL_PERCENT];
    x[2] = (y[2] + 1) / 4;
    y[3] = y[2];
    x[3] = -x[2];

    // 赋值
    row[PLOYGON_X] = x;
    row[PLOYGON_Y] = y;
    row[FUNNEL_PERCENT] = (row[yField] || 0) / max;
    row[FUNNEL_CONVERSATION] = [get(data, [index - 1, yField]), row[yField]];
    return row;
  });

  chart.data(formatData);

  return params;
}

/**
 * geometry处理
 * @param params
 */
function geometry(params: Params<FunnelOptions>): Params<FunnelOptions> {
  const { chart, options } = params;
  const { xField, yField, color, tooltip, label, funnelStyle, state } = options;

  const { fields, formatter } = getTooltipMapping(tooltip, [xField, yField]);
  // 绘制漏斗图
  baseGeometry({
    chart,
    options: {
      type: 'polygon',
      xField: PLOYGON_X,
      yField: PLOYGON_Y,
      colorField: xField,
      tooltipFields: isArray(fields) && fields.concat([FUNNEL_PERCENT, FUNNEL_CONVERSATION]),
      label,
      state,
      mapping: {
        tooltip: formatter,
        color,
        style: funnelStyle,
      },
    },
  });
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
    actions: isTransposed ? [['transpose'], ['reflect', 'x']] : [],
  });
  return params;
}

/**
 * 转化率组件
 * @param params
 */
function conversionTag(params: Params<FunnelOptions>): Params<FunnelOptions> {
  const getLineCoordinate = (
    datum: Datum,
    datumIndex: number,
    data: Data,
    initLineOption: Record<string, any>
  ): Types.LineOption => {
    return {
      ...initLineOption,
      start: [datum[PLOYGON_X][1], datum[PLOYGON_Y][1]],
      end: [datum[PLOYGON_X][1] + 0.05, datum[PLOYGON_Y][1]],
    };
  };

  conversionTagComponent(getLineCoordinate)(params);

  return params;
}

/**
 * 动态高度漏斗
 * @param chart
 * @param options
 */
export function dynamicHeightFunnel(params: Params<FunnelOptions>) {
  return flow(field, geometry, transpose, conversionTag)(params);
}
