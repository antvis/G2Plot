import { deepMix, each } from '@antv/util';
import { Geometry } from '@antv/g2';
import { Params } from '../../../core/adaptor';
import { point, line, interval } from '../../../adaptor/geometries';
import { pick, findGeometry } from '../../../utils';
import { GeometryOption } from '../types';
import { isLine, isColumn } from './option';

/**
 * 绘制单个图形
 * @param params
 */
export function drawSingleGeometry<O extends { xField: string; yField: string; geometryOption: GeometryOption }>(
  params: Params<O>
): Params<O> {
  const { options, chart } = params;
  const { geometryOption, yField } = options;
  const { isStack } = geometryOption;

  const FIELD_KEY = ['xField', 'yField'];
  if (isLine(geometryOption)) {
    // 绘制线
    line(
      deepMix({}, params, {
        options: {
          ...pick(options, FIELD_KEY),
          ...geometryOption,
          line: {
            color: geometryOption.color,
            style: geometryOption.lineStyle,
          },
        },
      })
    );
    // 绘制点
    point(
      deepMix({}, params, {
        options: {
          ...pick(options, FIELD_KEY),
          point: geometryOption.point,
        },
      })
    );

    // 处理 isStack
    if (isStack) {
      each(chart.geometries, (g: Geometry) => {
        g.adjust('stack');
      });
    }
  }

  if (isColumn(geometryOption)) {
    interval(
      deepMix({}, params, {
        options: {
          ...pick(options, FIELD_KEY),
          ...geometryOption,
          widthRatio: geometryOption.columnWidthRatio,
          interval: {
            ...pick(geometryOption, ['color']),
            style: geometryOption.columnStyle,
          },
        },
      })
    );
  }

  // 绘制 label
  const mainGeometry = findGeometry(chart, 'line') || findGeometry(chart, 'interval');
  if (!geometryOption.label) {
    mainGeometry.label(false);
  } else {
    const { callback, ...cfg } = geometryOption.label;
    mainGeometry.label({
      fields: [yField],
      callback,
      cfg,
    });
  }

  return params;
}
