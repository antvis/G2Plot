import { deepMix } from '@antv/util';
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

  const FIELD_KEY = ['xField', 'yField'];
  if (isLine(geometryOption)) {
    // 绘制线
    line(
      deepMix({}, params, {
        options: {
          ...pick(options, FIELD_KEY),
          ...pick(geometryOption, ['seriesField', 'color']),
          line: {
            connectNulls: geometryOption.connectNulls,
            smooth: geometryOption.smooth,
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
  }

  if (isColumn(geometryOption)) {
    interval(
      deepMix({}, params, {
        options: {
          ...pick(options, FIELD_KEY),
          ...pick(geometryOption, ['color', 'seriesField', 'isGroup', 'isStack']),
          interval: {
            marginRatio: geometryOption.marginRatio,
            widthRatio: geometryOption.columnWidthRatio,
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
