import { deepMix } from '@antv/util';
import { Params } from '../../../core/adaptor';
import { point, line, interval } from '../../../adaptor/geometries';
import { pick } from '../../../utils';
import { GeometryConfig } from '../types';
import { isLine, isColumn } from './option';

export function singleGeometry<O extends { xField: string; yField: string; geometryConfig: GeometryConfig }>(
  params: Params<O>
): Params<O> {
  const { options } = params;
  const { geometryConfig } = options;

  const FIELD_KEY = ['xField', 'yField'];
  if (isLine(geometryConfig)) {
    line(
      deepMix({}, params, {
        options: {
          ...pick(options, FIELD_KEY),
          ...pick(geometryConfig, ['seriesField', 'color']),
          line: {
            connectNulls: geometryConfig.connectNulls,
            smooth: geometryConfig.smooth,
            style: geometryConfig.lineStyle,
          },
        },
      })
    );
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
          ...pick(geometryConfig, ['color', 'colorField', 'isGroup', 'groupField', 'isStack', 'stackField']),
          interval: {
            marginRatio: geometryConfig.marginRatio,
            widthRatio: geometryConfig.columnWidthRatio,
            style: geometryConfig.columnStyle,
          },
        },
      })
    );
  }

  return params;
}
