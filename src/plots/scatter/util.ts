import {
  regressionLinear,
  regressionExp,
  regressionLoess,
  regressionLog,
  regressionPoly,
  regressionPow,
  regressionQuad,
} from 'd3-regression';
import { isArray, get, isNumber } from '@antv/util';
import { View } from '@antv/g2';
import { getSplinePath } from '../../utils';
import { ScatterOptions } from './types';

const REGRESSION_MAP = {
  exp: regressionExp,
  linear: regressionLinear,
  loess: regressionLoess,
  log: regressionLog,
  poly: regressionPoly,
  pow: regressionPow,
  quad: regressionQuad,
};

type RenderOptions = {
  view: View;
  options: ScatterOptions;
};

/**
 * 获取四象限默认配置
 * @param {number} xBaseline
 * @param {number} yBaseline
 */
export function getQuadrantDefaultConfig(xBaseline: number, yBaseline: number) {
  // 文本便宜距离
  const textOffset = 10;
  // 四象限默认样式
  const defaultConfig: { [key: string]: any } = {
    regionStyle: [
      {
        position: {
          start: [xBaseline, 'max'],
          end: ['max', yBaseline],
        },
        style: {
          fill: '#d8d0c0',
          opacity: 0.4,
        },
      },
      {
        position: {
          start: ['min', 'max'],
          end: [xBaseline, yBaseline],
        },
        style: {
          fill: '#a3dda1',
          opacity: 0.4,
        },
      },
      {
        position: {
          start: ['min', yBaseline],
          end: [xBaseline, 'min'],
        },
        style: {
          fill: '#d8d0c0',
          opacity: 0.4,
        },
      },
      {
        position: {
          start: [xBaseline, yBaseline],
          end: ['max', 'min'],
        },
        style: {
          fill: '#a3dda1',
          opacity: 0.4,
        },
      },
    ],
    lineStyle: {
      stroke: '#9ba29a',
      lineWidth: 1,
    },
    labelStyle: [
      {
        position: ['max', yBaseline],
        offsetX: -textOffset,
        offsetY: -textOffset,
        style: {
          textAlign: 'right',
          textBaseline: 'bottom',
          fontSize: 14,
          fill: '#ccc',
        },
      },
      {
        position: ['min', yBaseline],
        offsetX: textOffset,
        offsetY: -textOffset,
        style: {
          textAlign: 'left',
          textBaseline: 'bottom',
          fontSize: 14,
          fill: '#ccc',
        },
      },
      {
        position: ['min', yBaseline],
        offsetX: textOffset,
        offsetY: textOffset,
        style: {
          textAlign: 'left',
          textBaseline: 'top',
          fontSize: 14,
          fill: '#ccc',
        },
      },
      {
        position: ['max', yBaseline],
        offsetX: -textOffset,
        offsetY: textOffset,
        style: {
          textAlign: 'right',
          textBaseline: 'top',
          fontSize: 14,
          fill: '#ccc',
        },
      },
    ],
  };
  return defaultConfig;
}

const splinePath = (data: number[][], config: RenderOptions) => {
  const {
    view,
    options: { xField, yField },
  } = config;
  const xScaleView = view.getScaleByField(xField);
  const yScaleView = view.getScaleByField(yField);
  const pathData = data.map((d: [number, number]) =>
    view.getCoordinate().convert({ x: xScaleView.scale(d[0]), y: yScaleView.scale(d[1]) })
  );
  return getSplinePath(pathData, false);
};

export const getPath = (config: RenderOptions) => {
  const { options } = config;
  const { xField, yField, data, regressionLine } = options;
  const { type = 'linear', algorithm } = regressionLine;
  let pathData: Array<[number, number]>;
  if (algorithm) {
    pathData = isArray(algorithm) ? algorithm : algorithm(data);
  } else {
    const reg = REGRESSION_MAP[type]()
      .x((d) => d[xField])
      .y((d) => d[yField]);
    pathData = reg(data);
  }
  return splinePath(pathData, config);
};

/**
 * 调整散点图 meta: { min, max } ① data.length === 1 ② 所有数据 y 值相等 ③ 所有数据 x 值相等
 * @param options
 * @returns
 */
export const getMeta = (
  options: Pick<ScatterOptions, 'meta' | 'xField' | 'yField' | 'data'>
): ScatterOptions['meta'] => {
  const { meta = {}, xField, yField, data } = options;
  const xFieldValue = data[0][xField];
  const yFieldValue = data[0][yField];
  const xIsPositiveNumber = xFieldValue > 0;
  const yIsPositiveNumber = yFieldValue > 0;

  /**
   * 获得对应字段的 min max scale 配置
   */
  function getMetaMinMax(field: string, axis: 'x' | 'y') {
    const fieldMeta = get(meta, [field]);

    function getCustomValue(type: 'min' | 'max') {
      return get(fieldMeta, type);
    }

    const range = {};

    if (axis === 'x') {
      if (isNumber(xFieldValue)) {
        if (!isNumber(getCustomValue('min'))) {
          range['min'] = xIsPositiveNumber ? 0 : xFieldValue * 2;
        }

        if (!isNumber(getCustomValue('max'))) {
          range['max'] = xIsPositiveNumber ? xFieldValue * 2 : 0;
        }
      }

      return range;
    }

    if (isNumber(yFieldValue)) {
      if (!isNumber(getCustomValue('min'))) {
        range['min'] = yIsPositiveNumber ? 0 : yFieldValue * 2;
      }

      if (!isNumber(getCustomValue('max'))) {
        range['max'] = yIsPositiveNumber ? yFieldValue * 2 : 0;
      }
    }

    return range;
  }

  return {
    ...meta,
    [xField]: {
      ...meta[xField],
      ...getMetaMinMax(xField, 'x'),
    },
    [yField]: {
      ...meta[yField],
      ...getMetaMinMax(yField, 'y'),
    },
  };
};
