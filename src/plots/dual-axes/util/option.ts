import { get, isArray } from '@antv/util';
import { Axis } from '../../../types/axis';
import { deepAssign } from '../../../utils';
import { DEFAULT_LEFT_YAXIS_CONFIG, DEFAULT_RIGHT_YAXIS_CONFIG } from '../constant';
import {
  AxisType,
  DualAxesGeometry,
  DualAxesOptions,
  GeometryColumnOption,
  GeometryLineOption,
  GeometryOption,
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
export function getGeometryOption(xField: string, yField: string, geometryOption: GeometryOption): GeometryOption {
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
        ...geometryOption,
      };
}

/**
 * 兼容一些属性 为 arr 和 obj 的两种情况， 如 yAxis，annotations
 * 为了防止左右 yField 相同，导致变成 object 之后被覆盖，所以都转变成数组的形式
 * @param yField
 * @param transformAttribute
 */
export function transformObjectToArray(
  yField: DualAxesOptions['yField'],
  transformAttribute: Record<string, any> | any[]
): any[] {
  const [y1, y2] = yField;

  if (isArray(transformAttribute)) {
    // 将数组补齐为两个
    const [a1, a2] = transformAttribute;
    return [a1, a2];
  }
  const a1 = get(transformAttribute, y1);
  const a2 = get(transformAttribute, y2);
  return [a1, a2];
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
