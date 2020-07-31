import { deepMix } from '@antv/util';
import { Params } from '../../core/adaptor';
import { flow, pick } from '../../utils';
import { getOption, isLine } from './util';
import { point, line } from '../../adaptor/geometries';
import { BiaxOption, GeometryConfig } from './types';

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
 * 字段
 * @param params
 */
function field(params: Params<BiaxOption>): Params<BiaxOption> {
  const { chart, options } = params;
  const { data } = options;
  // 绘制左轴对应数据
  chart.data(data[0]);
  // 绘制右轴对应数据
  chart.createView().source(data[1]);
  return params;
}

/**
 * 绘制图形
 * @param params
 */
function geometry(params: Params<BiaxOption>): Params<BiaxOption> {
  const { chart, options } = params;
  const { xField, yField, geometryConfigs } = options;

  // 左轴图形
  singleGeometry({
    chart,
    options: {
      xField,
      yField: yField[0],
      geometryConfig: geometryConfigs[0],
    },
  });

  // 右轴图形
  singleGeometry({
    chart: chart.views[0],
    options: {
      xField,
      yField: yField[1],
      geometryConfig: geometryConfigs[1],
    },
  });
  return params;
}

function singleGeometry<O extends { xField: string; yField: string; geometryConfig: GeometryConfig }>(
  params: Params<O>
): Params<O> {
  const { chart, options } = params;
  const { geometryConfig } = options;
  const FIELD_KEY = ['xField', 'yField'];

  if (isLine(geometryConfig)) {
    const LINE_KEY = ['color', 'smooth', 'connectNulls', 'style', 'size'];
    line(
      deepMix({}, params, {
        options: {
          ...pick(options, FIELD_KEY),
          line: pick(geometryConfig, LINE_KEY),
        },
      })
    );
    point(
      deepMix({}, params, {
        options: {
          ...pick(options, FIELD_KEY),
          point: geometryConfig.point,
        },
      })
    );
  }
  return params;
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
  const view = chart.views[0];
  const { xAxis, yAxis, xField, yField } = options;

  // x 轴
  chart.axis(xField, xAxis);
  view.axis(xField, false);
  // 左轴
  chart.axis(yField[0], yAxis[0]);
  // 右轴
  if (yAxis[1]) {
    view.axis(
      yField[1],
      deepMix({}, yAxis[1], {
        position: 'right',
      })
    );
  } else {
    view.axis(yField[1], false);
  }

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
 * 双折线图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<BiaxOption>) {
  // flow 的方式处理所有的配置到 G2 API
  flow(transformOptions, field, geometry, meta, axis, legend)(params);
}
