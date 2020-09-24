import { deepMix } from '@antv/util';
import {
  DualAxesOption,
  GeometryOption,
  DualAxesGeometry,
  GeometryLineOption,
  AxisType,
  GeometryColumnOption,
} from '../types';

/**
 * 根据 GeometryOption 判断 geometry 是否为 line
 */
export function isLine(geometryOption: GeometryOption): geometryOption is GeometryLineOption {
  return geometryOption && geometryOption.geometry && geometryOption.geometry === DualAxesGeometry.Line;
}

/**
 * 根据 GeometryOption 判断 geometry 是否为 Column
 */
export function isColumn(geometryOption: GeometryOption): geometryOption is GeometryColumnOption {
  return geometryOption && geometryOption.geometry && geometryOption.geometry === DualAxesGeometry.Column;
}

/**
 * 获取 GeometryOption
 * @param geometryOption
 * @param axis
 */
export function getGeometryOption(geometryOption: GeometryOption, axis: AxisType): GeometryOption {
  // 柱子默认设置，柱子颜色使用 g2 设置
  if (isColumn(geometryOption)) {
    return deepMix(
      {},
      {
        geometry: DualAxesGeometry.Column,
        columnWidthRatio: 0.5,
      },
      geometryOption
    );
  }

  // 线默认设置，默认为线，线颜色默认左蓝右红
  return deepMix(
    {
      color: axis === AxisType.Left ? '#5B8FF9' : '#E76C5E',
    },
    {
      geometry: DualAxesGeometry.Line,
      connectNulls: true,
      smooth: false,
    },
    geometryOption || {}
  );
}

/**
 * 获取 Option
 * @param options
 */
export function getOption(options: DualAxesOption): DualAxesOption {
  const { yAxis = [], geometryOptions = [] } = options;

  const DEFAULT_YAXIS_CONFIG = {
    nice: true,
    label: {
      autoHide: true,
      autoRotate: false,
    },
  };

  const formatOptions = deepMix({}, options, {
    yAxis: [
      yAxis[0] !== false ? deepMix({}, DEFAULT_YAXIS_CONFIG, yAxis[0]) : false,
      yAxis[1] !== false ? deepMix({}, DEFAULT_YAXIS_CONFIG, yAxis[1]) : false,
    ],
    geometryOptions: [
      getGeometryOption(geometryOptions[0], AxisType.Left),
      getGeometryOption(geometryOptions[1], AxisType.Right),
    ],
  });

  return formatOptions;
}
