import { deepMix } from '@antv/util';
import { BiaxOption, GeometryConfig, BiaxGeometry, LineConfig, AxisType } from './types';
import { DEFAULT_LINE_CONFIG, DEFAULT_YAXIS_CONFIG, DEFAULT_OPTION, DEFAULT_LINE_COLOR } from './constant';

/**
 * 获取 GeometryConfig
 * @param geometryConfig
 * @param axis
 */
export function getGeometryConfig(geometryConfig: GeometryConfig, axis: AxisType): GeometryConfig {
  const defaultStyle = {
    style: {
      stroke: DEFAULT_LINE_COLOR[axis],
    },
  };
  if (isLine(geometryConfig)) {
    return deepMix(defaultStyle, DEFAULT_LINE_CONFIG, geometryConfig || {});
  }
  return Object.assign({}, defaultStyle, DEFAULT_LINE_CONFIG);
}

/**
 * 获取 Option
 * @param options
 */
export function getOption(options: BiaxOption): BiaxOption {
  const { yAxis = [], geometryConfigs = [] } = options;
  // TODO 做些优化
  const mixYAxis = [
    yAxis[0] !== false ? deepMix({}, DEFAULT_YAXIS_CONFIG, yAxis[0]) : false,
    yAxis[1] !== false ? deepMix({}, DEFAULT_YAXIS_CONFIG, yAxis[1]) : false,
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
