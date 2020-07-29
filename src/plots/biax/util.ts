import { Chart } from '@antv/g2';
import { deepMix } from '@antv/util';
import { BiaxOption, PointConfig, GeometryConfig, BiaxGeometry, LineConfig, AxisType } from './types';
import { DEFAULT_LINE_CONFIG, DEFAULT_YAXIS_CONFIG, DEFAULT_OPTION, DEFAULT_LINE_COLOR } from './constant';

/**
 * 获取 GeometryConfig
 * @param geometryConfig
 * @param axis
 */
export function getGeometryConfig(geometryConfig: GeometryConfig, axis: AxisType): GeometryConfig {
  if (isLine(geometryConfig)) {
    return deepMix(
      {
        color: DEFAULT_LINE_COLOR[axis],
      },
      DEFAULT_LINE_CONFIG,
      geometryConfig || {}
    );
  }
  return Object.assign({ color: DEFAULT_LINE_COLOR[axis] }, DEFAULT_LINE_CONFIG);
}

/**
 * 获取 Option
 * @param options
 */
export function getOption(options: BiaxOption): BiaxOption {
  const { yAxis = [], geometryConfigs = [] } = options;
  const mixYAxis = [
    deepMix({}, DEFAULT_YAXIS_CONFIG, yAxis[0] || {}),
    deepMix({}, DEFAULT_YAXIS_CONFIG, yAxis[1] || {}),
  ];
  return deepMix({}, DEFAULT_OPTION, options, {
    yAxis: mixYAxis,
    geometryConfigs: [
      getGeometryConfig(geometryConfigs[0], AxisType.Left),
      getGeometryConfig(geometryConfigs[1], AxisType.Right),
    ],
  });
}

/**
 * 根据 GeometryConfig 判断 geometry 是否为 line
 */
export function isLine(geometryConfig: GeometryConfig): geometryConfig is LineConfig {
  return geometryConfig && geometryConfig.geometry && geometryConfig.geometry === BiaxGeometry.Line;
}

/**
 * 根据 GeometryConfig 判断 geometry 是否为 Column
 */
export function isColumn(geometryConfig: GeometryConfig): geometryConfig is LineConfig {
  return geometryConfig && geometryConfig.geometry && geometryConfig.geometry === BiaxGeometry.Column;
}

/**
 * 根据 GeometryConfig 绘制图形
 * @param chart
 * @param geometryConfig
 */
export function drawGeometry(chart: Chart, field: { x: string; y: string }, geometryConfig: GeometryConfig) {
  if (isLine(geometryConfig)) {
    drawLine(chart, field, geometryConfig);
    if (geometryConfig.point) {
      drawPoint(chart, field, geometryConfig.point);
    }
  }

  if (isColumn(geometryConfig)) {
    drawColumn(chart, field, geometryConfig);
  }
}

/**
 * drawLine
 * 绘制折线
 * @param chart 图表
 * @param field 折线位置，eg {x: 'date', y: 'pv' }
 * @param lineConfig 折线视觉通道配置
 * @return chart
 */
export function drawLine(chart: Chart, field: { x: string; y: string }, lineConfig: LineConfig) {
  const { x: xField, y: yField } = field;
  chart
    .line({ connectNulls: lineConfig.connectNulls })
    .position(`${xField}*${yField}`)
    .color(lineConfig.color)
    .size(Number(lineConfig.lineSize))
    .shape(lineConfig.smooth ? 'smooth' : 'line');
  return chart;
}

export function drawPoint(chart: Chart, field: { x: string; y: string }, pointConfig: PointConfig) {
  const { x: xField, y: yField } = field;
  chart
    .point()
    .position(`${xField}*${yField}`)
    .size(pointConfig.size)
    // TODO 待处理
    // @ts-ignore
    .shape(pointConfig.shape);
  return chart;
}

/**
 * drawColumn
 * 绘制柱状图
 * @param chart 图表
 * @param field 折线位置，eg {x: 'date', y: 'pv' }
 * @param lineConfig 折线视觉通道配置
 * @return chart
 */
export function drawColumn(chart: Chart, field: { x: string; y: string }, lineConfig: LineConfig) {
  const { x: xField, y: yField } = field;
  chart
    .interval()
    .position(`${xField}*${yField}`)
    .color(lineConfig.color)
    .size(Number(lineConfig.lineSize))
    .shape(lineConfig.smooth ? 'smooth' : 'line');
  return chart;
}
