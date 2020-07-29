import { deepMix } from '@antv/util';
import { Params } from '../../core/adaptor';
import { tooltip } from '../../common/adaptor';
import { flow, pick } from '../../utils';
import { drawGeometry, getOption } from './util';
import { BiaxOption, PointConfig, GeometryConfig, BiaxGeometry } from './types';

/**
 * 获取默认参数设置
 * 因 deepMix 对数组类型无效，为防止出现geometryConfigs: [{ color: 1}, {}] 类似的情况，加一个判断
 * @param params
 */
export function transformOptions(params: Params<BiaxOption>): Params<BiaxOption> {
  return {
    ...params,
    options: getOption(params.options),
  };
}

/**
 * meta 配置
 * @param params
 */
export function meta(params: Params<BiaxOption>): Params<BiaxOption> {
  const { chart, options } = params;
  const { meta, xAxis, yAxis, xField, yField } = options;

  // 组装双 Y 轴度量
  const KEYS = ['type', 'tickCount', 'tickInterval', 'nice', 'max', 'min'];

  const scales = deepMix({}, meta, {
    [xField]: pick(xAxis, KEYS),
    [yField[0]]: pick(yAxis[0], KEYS),
    [yField[1]]: pick(yAxis[1], KEYS),
  });

  chart.scale(scales);
  return params;
}

/**
 * axis 配置
 * @param params
 */
export function axis(params: Params<BiaxOption>): Params<BiaxOption> {
  const { chart, options } = params;
  const { xAxis, yAxis, xField, yField } = options;
  chart.axis(xField, xAxis);
  chart.axis(yField[0], yAxis[0]);
  chart.axis(yField[1], yAxis[1]);
  return params;
}

/**
 * legend 配置
 * @param params
 */
export function legend(params: Params<BiaxOption>): Params<BiaxOption> {
  const { chart, options } = params;
  const { legend, yField } = options;
  if (legend) {
    chart.legend(yField[0], legend);
    chart.legend(yField[1], legend);
  }
  return params;
}

/**
 * 字段
 * @param params
 */
function field(params: Params<BiaxOption>): Params<BiaxOption> {
  const { chart, options } = params;
  const { data } = options;
  chart.data(data);
  return params;
}

/**
 * 绘制图形
 * @param params
 */
function geometry(params: Params<BiaxOption>): Params<BiaxOption> {
  const { chart, options } = params;
  const { xField, yField, geometryConfigs } = options;
  const [leftGeometryConfig, rightGeometryConfig] = geometryConfigs;
  drawGeometry(chart, { x: xField, y: yField[0] }, leftGeometryConfig);
  drawGeometry(chart, { x: xField, y: yField[1] }, rightGeometryConfig);
  return params;
}

/**
 * 双折线图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<BiaxOption>) {
  // flow 的方式处理所有的配置到 G2 API
  flow(transformOptions, field, geometry, meta, axis, legend, tooltip)(params);
}
