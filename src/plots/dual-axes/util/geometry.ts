import { each } from '@antv/util';
import { Geometry } from '@antv/g2';
import { Params } from '../../../core/adaptor';
import { point, line } from '../../../adaptor/geometries';
import { pick, deepAssign } from '../../../utils';
import { adaptor as columnAdaptor } from '../../column/adaptor';
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
  const { geometryOption } = options;
  const { isStack, color, seriesField, groupField, isGroup } = geometryOption;

  const FIELD_KEY = ['xField', 'yField'];
  if (isLine(geometryOption)) {
    // 绘制线
    line(
      deepAssign({}, params, {
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
      deepAssign({}, params, {
        options: {
          ...pick(options, FIELD_KEY),
          ...geometryOption,
          point: geometryOption.point && {
            color,
            shape: 'circle',
            ...geometryOption.point,
          },
        },
      })
    );
    // adjust
    const adjust = [];
    if (isGroup) {
      adjust.push({
        type: 'dodge',
        dodgeBy: groupField || seriesField,
        customOffset: 0,
      });
    }
    if (isStack) {
      adjust.push({
        type: 'stack',
      });
    }
    if (adjust.length) {
      each(chart.geometries, (g: Geometry) => {
        g.adjust(adjust);
      });
    }
  }

  if (isColumn(geometryOption)) {
    columnAdaptor(
      deepAssign({}, params, {
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

  return params;
}
