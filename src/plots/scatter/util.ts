import { View } from '@antv/g2';
import { get, isArray, isNumber } from '@antv/util';
import {
  regressionExp,
  regressionLinear,
  regressionLoess,
  regressionLog,
  regressionPoly,
  regressionPow,
  regressionQuad,
} from 'd3-regression';
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

type D3RegressionResult = {
  a?: number;
  b?: number;
  c?: number;
  coefficients?: number[];
  rSquared?: number;
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
  const { type = 'linear', algorithm, equation: customEquation } = regressionLine;
  let pathData: Array<[number, number]>;
  let equation = null;
  if (algorithm) {
    pathData = isArray(algorithm) ? algorithm : algorithm(data);
    equation = customEquation;
  } else {
    const reg = REGRESSION_MAP[type]()
      .x((d) => d[xField])
      .y((d) => d[yField]);
    pathData = reg(data);
    equation = getRegressionEquation(type, pathData as D3RegressionResult);
  }
  return [splinePath(pathData, config), equation];
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

/**
 * 获取回归函数表达式
 * @param {string} type - 回归函数类型
 * @param {D3RegressionResult} res - 回归计算结果集
 * @return {string}
 */
export function getRegressionEquation(type: string, res: D3RegressionResult) {
  const roundByPrecision = (n, p = 4) => Math.round(n * Math.pow(10, p)) / Math.pow(10, p);
  const safeFormat = (value) => (Number.isFinite(value) ? roundByPrecision(value) : '?');

  switch (type) {
    case 'linear':
      // y = ax + b
      return `y = ${safeFormat(res.a)}x + ${safeFormat(res.b)}, R^2 = ${safeFormat(res.rSquared)}`;
    case 'exp':
      // y = ae^(bx)
      return `y = ${safeFormat(res.a)}e^(${safeFormat(res.b)}x), R^2 = ${safeFormat(res.rSquared)}`;
    case 'log':
      // y = a · ln(x) + b
      return `y = ${safeFormat(res.a)}ln(x) + ${safeFormat(res.b)}, R^2 = ${safeFormat(res.rSquared)}`;
    case 'quad':
      // y = ax^2 + bx + c
      return `y = ${safeFormat(res.a)}x^2 + ${safeFormat(res.b)}x + ${safeFormat(res.c)}, R^2 = ${safeFormat(
        res.rSquared
      )}`;
    case 'poly':
      // y = anx^n + ... + a1x + a0
      // eslint-disable-next-line no-case-declarations
      let temp = `y = ${safeFormat(res.coefficients?.[0])} + ${safeFormat(res.coefficients?.[1])}x + ${safeFormat(
        res.coefficients?.[2]
      )}x^2`;
      for (let i = 3; i < res.coefficients.length; ++i) {
        temp += ` + ${safeFormat(res.coefficients[i])}x^${i}`;
      }
      return `${temp}, R^2 = ${safeFormat(res.rSquared)}`;
    case 'pow':
      // y = ax^b
      return `y = ${safeFormat(res.a)}x^${safeFormat(res.b)}, R^2 = ${safeFormat(res.rSquared)}`;
  }
  return null;
}
