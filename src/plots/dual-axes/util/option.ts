import { deepMix, get, isArray } from '@antv/util';
import {
  DualAxesOptions,
  GeometryOption,
  DualAxesGeometry,
  GeometryLineOption,
  GeometryColumnOption,
  AxisType,
} from '../types';

/**
 * 根据 GeometryOption 判断 geometry 是否为 line
 */
export function isLine(geometryOption: GeometryOption): geometryOption is GeometryLineOption {
  return get(geometryOption, 'geometry') === DualAxesGeometry.Line;
}

/**
 * 根据 GeometryOption 判断 geometry 是否为 Column
 */
export function isColumn(geometryOption: GeometryOption): geometryOption is GeometryColumnOption {
  return get(geometryOption, 'geometry') === DualAxesGeometry.Column;
}

/**
 * 获取 GeometryOption
 * @param geometryOption
 * @param axis
 */
export function getGeometryOption(
  xField: string,
  yField: string,
  geometryOption: GeometryOption,
  axis: AxisType
): GeometryOption {
  // 空默认为线
  return isColumn(geometryOption)
    ? deepMix(
        {},
        {
          geometry: DualAxesGeometry.Column,
          label:
            geometryOption.label && geometryOption.isRange
              ? {
                  content: (item: object) => {
                    return item[yField]?.join('-');
                  },
                }
              : undefined,
        },
        geometryOption
      )
    : {
        geometry: DualAxesGeometry.Line,
        color: axis === AxisType.Left ? '#5B8FF9' : '#E76C5E',
        ...geometryOption,
      };
}

export function getDefaultYAxis(options: DualAxesOptions): Pick<DualAxesOptions, 'yAxis'> {
  const { yAxis, yField } = options;

  const DEFAULT_YAXIS_CONFIG = {
    nice: true,
    label: {
      autoHide: true,
      autoRotate: false,
    },
  };

  const DEFAULT_LEFT_YAXIS_CONFIG = {
    ...DEFAULT_YAXIS_CONFIG,
    position: 'left',
  };

  const DEFAULT_RIGHT_YAXIS_CONFIG = {
    ...DEFAULT_YAXIS_CONFIG,
    position: 'right',
    grid: null,
  };

  if (isArray(yAxis)) {
    console.warn('yAxis should be object');
    return {
      [yField[0]]: yAxis[0] !== false ? deepMix({}, DEFAULT_LEFT_YAXIS_CONFIG, yAxis[0]) : false,
      [yField[1]]: yAxis[1] !== false ? deepMix({}, DEFAULT_RIGHT_YAXIS_CONFIG, yAxis[1]) : false,
    };
  }

  return deepMix(
    {},
    {
      [yField[0]]: DEFAULT_LEFT_YAXIS_CONFIG,
      [yField[1]]: DEFAULT_RIGHT_YAXIS_CONFIG,
    },
    yAxis
  );
}

/**
 * 主要因为双轴图的 yAxis 和 geometryOptions 是数组，所以需要额外分别进行设置默认值
 * 1. yAxis
 * 2. geometryOptions
 * @param options
 */
export function getOption(options: DualAxesOptions): DualAxesOptions {
  // TODO antvis util 中 map 没有办法处理 undefined！！！
  const { geometryOptions = [], xField, yField } = options;

  const formatOptions = deepMix({}, options, {
    // yAxis
    yAxis: getDefaultYAxis(options),
    // geometryOptions
    geometryOptions: [
      getGeometryOption(xField, yField[0], geometryOptions[0], AxisType.Left),
      getGeometryOption(xField, yField[1], geometryOptions[1], AxisType.Right),
    ],
  });

  return formatOptions;
}
