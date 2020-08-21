import { deepMix } from '@antv/util';
import { BiaxOption, GeometryConfig, BiaxGeometry, LineConfig, AxisType, ColumnConfig } from '../types';

/**
 * 根据 GeometryConfig 判断 geometry 是否为 line
 */
export function isLine(geometryConfig: GeometryConfig): geometryConfig is LineConfig {
  return geometryConfig && geometryConfig.geometry && geometryConfig.geometry === BiaxGeometry.Line;
}

/**
 * 根据 GeometryConfig 判断 geometry 是否为 Column
 */
export function isColumn(geometryConfig: GeometryConfig): geometryConfig is ColumnConfig {
  return geometryConfig && geometryConfig.geometry && geometryConfig.geometry === BiaxGeometry.Column;
}

/**
 * 获取 GeometryConfig
 * @param geometryConfig
 * @param axis
 */
export function getGeometryConfig(geometryConfig: GeometryConfig, axis: AxisType): GeometryConfig {
  // 柱子默认设置，柱子颜色使用 g2 设置
  if (isColumn(geometryConfig)) {
    return deepMix(
      {},
      {
        geometry: BiaxGeometry.Column,
        columnWidthRatio: 0.5,
      },
      geometryConfig
    );
  }

  // 线默认设置，默认为线，线颜色默认左蓝右红
  return deepMix(
    {
      color: axis === AxisType.Left ? '#5B8FF9' : '#E76C5E',
    },
    {
      geometry: BiaxGeometry.Line,
      connectNulls: true,
      smooth: false,
    },
    geometryConfig || {}
  );
}

/**
 * 获取 Option
 * @param options
 */
export function getOption(options: BiaxOption): BiaxOption {
  const { yAxis = [], geometryOptions = [] } = options;
  const DEFAULT_YAXIS_CONFIG = {
    nice: true,
    label: {
      autoHide: true,
      autoRotate: false,
    },
  };

  const mixYAxis = [
    yAxis[0] !== false ? deepMix({}, DEFAULT_YAXIS_CONFIG, yAxis[0]) : false,
    yAxis[1] !== false ? deepMix({}, DEFAULT_YAXIS_CONFIG, yAxis[1]) : false,
  ];
  return deepMix({}, options, {
    yAxis: mixYAxis,
    geometryOptions: [
      getGeometryConfig(geometryOptions[0], AxisType.Left),
      getGeometryConfig(geometryOptions[1], AxisType.Right),
    ],
  });
}
