import {
  regressionLinear,
  regressionExp,
  regressionLoess,
  regressionLog,
  regressionPoly,
  regressionPow,
  regressionQuad,
} from 'd3-regression';
import { IGroup, Scale } from '@antv/g2/lib/dependents';
import { minBy, maxBy, isArray } from '@antv/util';
import { getScale } from '@antv/scale';
import { View } from '@antv/g2';
import { getSplinePath } from '../../../utils';
import { Params } from '../../../core/adaptor';
import { ScatterOptions } from '../types';

const REGRESSION_MAP = {
  exp: regressionExp,
  linear: regressionLinear,
  loess: regressionLoess,
  log: regressionLog,
  poly: regressionPoly,
  pow: regressionPow,
  quad: regressionQuad,
};

type renderOptions = {
  view: View;
  group: IGroup;
  options: ScatterOptions;
};

type path = {
  x: number;
  y: number;
};

// 处理用户自行配置 min max的情况
function adjustScale(viewScale: Scale, pathData: path[], dim: string, config: renderOptions) {
  const { min, max } = viewScale;
  const {
    options: { data, xField, yField },
  } = config;
  const field = dim === 'x' ? xField : yField;
  const dataMin = minBy(data, field)[field];
  const dataMax = maxBy(data, field)[field];
  const minRatio = (min - dataMin) / (dataMax - dataMin);
  const maxRatio = (max - dataMax) / (dataMax - dataMin);
  const trendMin = minBy(pathData, dim)[dim];
  const trendMax = maxBy(pathData, dim)[dim];
  return {
    min: trendMin + minRatio * (trendMax - trendMin),
    max: trendMax + maxRatio * (trendMax - trendMin),
  };
}

function getPath(data: number[][], config: renderOptions) {
  const {
    view,
    options: { xField, yField },
  } = config;
  const pathData = data.map((d: [number, number]) => ({ x: d[0], y: d[1] }));
  const xScaleView = view.getScaleByField(xField);
  const yScaleView = view.getScaleByField(yField);
  const coordinate = view.getCoordinate();
  const linearScale = getScale('linear');
  const xRange = adjustScale(xScaleView, pathData, 'x', config);
  const xScale = new linearScale({
    min: xRange.min,
    max: xRange.max,
  });
  const yRange = adjustScale(yScaleView, pathData, 'y', config);
  const yScale = new linearScale({
    min: yRange.min,
    max: yRange.max,
  });
  const points = pathData.map((d) => ({
    x: coordinate.start.x + coordinate['width'] * xScale.scale(d.x),
    y: coordinate.start.y - coordinate['height'] * yScale.scale(d.y),
  }));
  return getSplinePath(points, false);
}

function renderPath(config: renderOptions) {
  const { group, options } = config;
  const { xField, yField, data, regressionLine } = options;
  const { type = 'linear', style, algorithm } = regressionLine;
  let pathData: Array<[number, number]>;
  if (algorithm) {
    pathData = isArray(algorithm) ? algorithm : algorithm(data);
  } else {
    const reg = REGRESSION_MAP[type]()
      .x((d) => d[xField])
      .y((d) => d[yField]);
    pathData = reg(data);
  }
  const path = getPath(pathData, config);
  const defaultStyle = {
    stroke: '#9ba29a',
    lineWidth: 2,
    opacity: 0.5,
  };
  group.addShape('path', {
    name: 'regression-line',
    attrs: {
      path,
      ...defaultStyle,
      ...style,
    },
  });
}

// 使用 shape annotation 绘制回归线
export function regressionLine<O extends ScatterOptions>(params: Params<O>) {
  const { options, chart } = params;
  const { regressionLine } = options;
  if (regressionLine) {
    chart.annotation().shape({
      render: (container, view) => {
        const group = container.addGroup({
          id: `${chart.id}-regression-line`,
          name: 'regression-line-group',
        });
        renderPath({
          view,
          group,
          options,
        });
      },
    });
  }

  return params;
}
