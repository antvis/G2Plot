import {
  regressionLinear,
  regressionExp,
  regressionLoess,
  regressionLog,
  regressionPoly,
  regressionPow,
  regressionQuad,
} from 'd3-regression';
import { isArray } from '@antv/util';
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
