import { deepMix, map } from '@antv/util';
import { isFunction } from '@antv/util';
import { flow, findGeometry } from '../../../utils';
import { Params } from '../../../core/adaptor';
import { FunnelAdaptorOptions } from '../types';
import { transpose } from './util';
import { FUNNEL_PERCENT } from '../constant';

/**
 * 处理数据
 * @param params
 */
function format(params: Params<FunnelAdaptorOptions>): Params<FunnelAdaptorOptions> {
  const { options } = params;
  const { data = [], yField } = options;
  let formatData = [];
  // format 数据
  if (data[0][yField]) {
    formatData = map(data, (row) => {
      if (row[yField] !== undefined) {
        row[FUNNEL_PERCENT] = row[yField] / data[0][yField];
      }
      return row;
    });
  }

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
  const { formatData = [], xField, yField, color } = options;

  // 绘制漏斗图
  chart.data(formatData);
  chart
    .interval()
    .adjust('symmetric')
    .position(`${xField}*${yField}*${FUNNEL_PERCENT}`)
    .shape('funnel')
    .color(xField, color);

  return params;
}

/**
 * label 处理
 * @param params
 */
function label(params: Params<FunnelAdaptorOptions>): Params<FunnelAdaptorOptions> {
  const { chart, options } = params;
  const { label, yField, xField } = options;

  const geometry = findGeometry(chart, 'interval');

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

/**
 * annotation 处理
 * @param params
 */
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
 * 基础漏斗
 * @param chart
 * @param options
 */
export default function basicFunnel(params: Params<FunnelAdaptorOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  return flow(format, geometry, transpose, label, annotation)(params);
}
