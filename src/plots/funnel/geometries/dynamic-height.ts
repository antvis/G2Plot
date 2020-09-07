import { deepMix, map, reduce } from '@antv/util';
import { isFunction } from '@antv/util';
import { flow, findGeometry } from '../../../utils';
import { Params } from '../../../core/adaptor';
import { FunnelAdaptorOptions } from '../types';
import { FUNNEL_PERCENT, FUNNEL_TOTAL_PERCENT } from '../constant';

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
function format(params: Params<FunnelAdaptorOptions>): Params<FunnelAdaptorOptions> {
  const { options } = params;
  const { data = [], yField } = options;

  // 计算各数据项所占高度
  const sum = reduce(
    data,
    (total, item) => {
      return total + item[yField];
    },
    0
  );

  const formatData = map(data, (row, index) => {
    // 储存四个点 x，y 坐标，方向为顺时针，即 [左上, 右上，右下，左下]
    const x = [];
    const y = [];

    row[FUNNEL_TOTAL_PERCENT] = row[yField] / sum;

    // 获取左上角，右上角坐标
    if (index) {
      const { _x: preItemX, _y: preItemY } = data[index - 1];
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
    row._x = x;
    row._y = y;
    row[FUNNEL_PERCENT] = row[yField] / data[0][yField];
    return row;
  });

  return deepMix({}, params, {
    options: {
      formatData,
    },
  });
}

/**
 * geometry处理
 * @param params
 */
function geometry(params: Params<FunnelAdaptorOptions>): Params<FunnelAdaptorOptions> {
  const { chart, options } = params;
  const { formatData = [], xField, color } = options;

  // 绘制漏斗图
  chart.data(formatData);
  chart.polygon().position('_x*_y').color(xField, color);

  return params;
}

function label(params: Params<FunnelAdaptorOptions>): Params<FunnelAdaptorOptions> {
  const { chart, options } = params;
  const { label, yField, xField } = options;

  const geometry = findGeometry(chart, 'polygon');

  if (!label) {
    geometry.label(false);
  } else {
    const { callback, ...cfg } = label;
    geometry.label({
      fields: [xField, yField, FUNNEL_PERCENT],
      callback,
      cfg,
    });
  }

  return params;
}

function annotation(params: Params<FunnelAdaptorOptions>): Params<FunnelAdaptorOptions> {
  const { chart, options } = params;
  const { formatData = [], xField, yField, annotation } = options;

  if (annotation !== false) {
    formatData.forEach((obj) => {
      chart.annotation().text({
        top: true,
        position: [obj[xField], 'median'],
        content: isFunction(annotation) ? annotation(obj[xField], obj[yField], obj[FUNNEL_PERCENT], obj) : annotation,
        style: {
          stroke: null,
          fill: '#fff',
          textAlign: 'center',
        },
      });
    });
  }
  return params;
}

/**
 * 对比漏斗
 * @param chart
 * @param options
 */
export function dynamicHeightFunnel(params: Params<FunnelAdaptorOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  return flow(format, geometry, label, annotation)(params);
}
