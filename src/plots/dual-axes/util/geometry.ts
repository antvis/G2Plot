import { deepMix } from '@antv/util';
import { Params } from '../../../core/adaptor';
import { point, line, interval } from '../../../adaptor/geometries';
import { pick, findGeometry } from '../../../utils';
import { GeometryConfig } from '../types';
import { isLine, isColumn } from './option';

/**
 * 绘制单个图形
 * @param params
 */
export function drawSingleGeometry<O extends { xField: string; yField: string; geometryConfig: GeometryConfig }>(
  params: Params<O>
): Params<O> {
  const { options, chart } = params;
  const { geometryConfig, yField } = options;

  const FIELD_KEY = ['xField', 'yField'];
  if (isLine(geometryConfig)) {
    // 绘制线
    line(
      deepMix({}, params, {
        options: {
          ...pick(options, FIELD_KEY),
          ...pick(geometryConfig, ['seriesField']),
          connectNulls: geometryConfig.connectNulls,
          smooth: geometryConfig.smooth,
          line: {
            ...pick(geometryConfig, ['color']),
            style: geometryConfig.lineStyle,
          },
        },
      })
    );
    // 绘制点
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
    interval(
      deepMix({}, params, {
        options: {
          ...pick(options, FIELD_KEY),
          ...pick(geometryConfig, ['seriesField', 'isGroup', 'isStack']),
          marginRatio: geometryConfig.marginRatio,
          widthRatio: geometryConfig.columnWidthRatio,
          interval: {
            ...pick(geometryConfig, ['color']),
            style: geometryConfig.columnStyle,
          },
        },
      })
    );
  }

  // 绘制 label
  const mainGeometry = findGeometry(chart, 'line') || findGeometry(chart, 'interval');
  if (!geometryConfig.label) {
    mainGeometry.label(false);
  } else {
    const { callback, ...cfg } = geometryConfig.label;
    mainGeometry.label({
      fields: [yField],
      callback,
      cfg,
    });
  }

  return params;
}
