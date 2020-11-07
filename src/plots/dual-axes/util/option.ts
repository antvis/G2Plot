import { get, isArray } from '@antv/util';
import { Axis } from '../../../types/axis';
import { deepAssign } from '../../../utils';
import {
  DualAxesOptions,
  GeometryOption,
  DualAxesGeometry,
  GeometryLineOption,
  GeometryColumnOption,
  AxisType,
} from '../types';
import { DEFAULT_LEFT_YAXIS_CONFIG, DEFAULT_RIGHT_YAXIS_CONFIG } from '../constant';

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
    ? deepAssign(
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

/**
 * 兼容 yAxis 为 arr 和 obj 的两种情况
 * @param yField
 * @param yAxis
 */
export function getCompatibleYAxis(
  yField: DualAxesOptions['yField'],
  yAxis: Record<string, Axis> | Axis[]
): DualAxesOptions['yAxis'] {
  const [y1, y2] = yField;
  if (isArray(yAxis)) {
    console.warn('yAxis should be object.');
    return { [y1]: yAxis[0], [y2]: yAxis[1] };
  }

  // 追加默认值
  return deepAssign({ [y1]: undefined, [y2]: undefined }, yAxis);
}

/**
 * 获取默认值
 * @param yAxis
 * @param axisType
 */
export function getYAxisWithDefault(yAxis: Axis, axisType: AxisType): Axis {
  if (axisType === AxisType.Left) {
    return yAxis === false ? false : deepAssign({}, DEFAULT_LEFT_YAXIS_CONFIG, yAxis);
  } else if (axisType === AxisType.Right) {
    return yAxis === false ? false : deepAssign({}, DEFAULT_RIGHT_YAXIS_CONFIG, yAxis);
  }
  return yAxis;
}
