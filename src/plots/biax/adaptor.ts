import { deepMix } from '@antv/util';
import { Params } from '../../core/adaptor';
// import { interaction, animation, theme } from '../../adaptor/common';
import { flow, pick } from '../../utils';
import { getOption, isLine, isColumn } from './util';
import { point, line, interval } from '../../adaptor/geometries';
import { BiaxOption, GeometryConfig } from './types';
import { AXIS_META_CONFIG_KEYS } from '../../constant';

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

  // TOFIX: 动态适配坐标轴宽度
  const PADDING = [20, 40];

  // 绘制左轴对应数据
  chart
    .createView({
      padding: PADDING,
    })
    .source(data[0]);

  // 绘制右轴对应数据
  chart
    .createView({
      padding: PADDING,
    })
    .source(data[1]);
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
    chart: chart.views[0],
    options: {
      xField,
      yField: yField[0],
      geometryConfig: geometryConfigs[0],
    },
  });

  // 右轴图形
  singleGeometry({
    chart: chart.views[1],
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
  const { options } = params;
  const { geometryConfig } = options;
  const FIELD_KEY = ['xField', 'yField'];
  if (isLine(geometryConfig)) {
    const LINE_KEY = ['color', 'smooth', 'connectNulls', 'style', 'size'];
    const lineOption = deepMix({}, params, {
      options: {
        ...pick(options, FIELD_KEY),
        seriesField: geometryConfig.seriesField,
        line: pick(geometryConfig, LINE_KEY),
      },
    });
    line(lineOption);
    point(
      deepMix({}, params, {
        options: {
          ...pick(options, FIELD_KEY),
          point: geometryConfig.point,
        },
      })
    );
  }

  if (isColumn(geometryConfig)) {
    const COLUMN_KEY = ['colorField', 'seriesField', 'isGroup', 'groupField', 'isStack', 'stackField', 'interval'];
    const columnOption = deepMix({}, params, {
      options: {
        ...pick(options, FIELD_KEY),
        ...pick(geometryConfig, COLUMN_KEY),
      },
    });
    interval(columnOption);
  }

  return params;
}

/**
 * meta 配置
 * @param params
 */
export function meta(params: Params<BiaxOption>): Params<BiaxOption> {
  const { chart, options } = params;
  const { meta = {}, xAxis, yAxis, xField, yField } = options;

  // 组装双 Y 轴度量
  const KEYS = ['type', 'tickCount', 'tickInterval', 'nice', 'max', 'min'];

  const scales = deepMix({}, meta, {
    [xField]: pick(xAxis, KEYS),
    [yField[0]]: pick(yAxis[0], KEYS),
    [yField[1]]: pick(yAxis[1], KEYS),
  });

  const xFieldScales = deepMix({}, meta[xField] || {}, pick(xAxis, AXIS_META_CONFIG_KEYS));
  const leftYFieldScales = deepMix({}, meta[yField[0]] || {}, pick(yAxis[0], AXIS_META_CONFIG_KEYS));
  const rightYFieldScales = deepMix({}, meta[yField[1]] || {}, pick(yAxis[1], AXIS_META_CONFIG_KEYS));

  chart.views[0].scale({
    [xField]: xFieldScales,
    [yField[0]]: leftYFieldScales,
  });

  chart.views[1].scale({
    [xField]: xFieldScales,
    [yField[1]]: rightYFieldScales,
  });
  return params;
}

/**
 * axis 配置
 * @param params
 */
export function axis(params: Params<BiaxOption>): Params<BiaxOption> {
  const { chart, options } = params;
  const [leftView, rightView] = chart.views;
  const { xField, yField, yAxis } = options;

  let { xAxis } = options;

  // 固定位置
  if (xAxis) {
    xAxis = deepMix({}, xAxis, { position: 'bottom' });
  }
  if (yAxis[0]) {
    yAxis[0] = deepMix({}, yAxis[0], { position: 'left' });
  }

  // 隐藏右轴 grid，留到 g2 解决
  if (yAxis[1]) {
    yAxis[1] = deepMix({}, yAxis[1], { position: 'right', grid: null });
  }

  // x 轴
  chart.axis(xField, xAxis);
  leftView.axis(xField, xAxis);
  rightView.axis(xField, false);

  // 左 Y 轴
  chart.axis(yField[0], false);
  leftView.axis(yField[0], yAxis[0]);
  rightView.axis(yField[0], false);

  // 右 Y 轴
  chart.axis(yField[1], false);
  leftView.axis(yField[1], false);
  rightView.axis(yField[1], yAxis[1]);

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
 * tooltip 配置
 * @param params
 */
export function tooltip(params: Params<BiaxOption>): Params<BiaxOption> {
  const { chart, options } = params;
  const { tooltip } = options;

  if (tooltip !== undefined) {
    chart.tooltip(
      deepMix({}, tooltip, {
        showCrosshairs: true, // 展示 Tooltip 辅助线
        shared: true,
      })
    );
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
  flow(transformOptions, field, geometry, meta, axis, legend, tooltip)(params);
}
