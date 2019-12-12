import { each, isArray, isFunction, deepMix, minBy, maxBy } from '@antv/util';
import { Group, BBox, Shape } from '@antv/g';
import { View } from '@antv/g2';
import { getScale } from '@antv/scale';
import {
  regressionLinear,
  regressionExp,
  regressionLoess,
  regressionLog,
  regressionPoly,
  regressionPow,
  regressionQuad,
} from 'd3-regression';

import { getSplinePath } from '../../../util/path';

const REGRESSION_MAP = {
  exp: regressionExp,
  linear: regressionLinear,
  loess: regressionLoess,
  log: regressionLog,
  poly: regressionPoly,
  pow: regressionPow,
  quad: regressionQuad,
};

export interface TrendlineConfig {
  type?: string;
  style?: any;
}

export interface ITrendline extends TrendlineConfig {
  view: View;
  plotOptions: any;
}

export default class Quadrant {
  public data: any[];
  protected options: any;
  protected view: View;
  protected container: Group;
  protected shape: Shape;

  constructor(cfg: ITrendline) {
    const defaultOptions = {
      type: 'linear',
      style: {
        stroke: '#9ba29a',
        lineWidth: 2,
        opacity: 0.5,
        lineJoin: 'round',
        lineCap: 'round',
      },
    };
    this.options = deepMix({}, defaultOptions, cfg);
    this.view = this.options.view;
    this.init();
  }

  public init() {
    // 处理数据
    const { xField, yField, data } = this.options.plotOptions;
    const reg = REGRESSION_MAP[this.options.type]()
      .x((d) => d[xField])
      .y((d) => d[yField]);
    this.data = this.processData(reg(data));
    // 创建container
    this.container = this.view.get('frontgroundGroup').addGroup();
  }

  public render() {
    const coord = this.view.get('coord');
    // 创建图形绘制的scale
    const LinearScale = getScale('linear');
    const xScale = new LinearScale({
      min: minBy(this.data, 'x').x,
      max: maxBy(this.data, 'x').x,
    });
    const yScale = new LinearScale({
      min: minBy(this.data, 'y').y,
      max: maxBy(this.data, 'y').y,
    });
    const points = this.getTrendlinePoints(xScale, yScale, coord);
    const constraint = [
      [0, 0],
      [1, 1],
    ];
    const path = getSplinePath(points, false, constraint);
    this.shape = this.container.addShape('path', {
      attrs: {
        path,
        ...this.options.style,
      },
    });
  }

  public clear() {
    if (this.container) {
      this.container.clear();
    }
  }

  public destroy() {
    if (this.container) {
      this.container.destroy();
    }
  }

  private processData(data) {
    const output = [];
    each(data, (d) => {
      output.push({ x: d[0], y: d[1] });
    });
    return output;
  }

  private getTrendlinePoints(xScale, yScale, coord) {
    const points = [];
    each(this.data, (d) => {
      const xRatio = xScale.scale(d.x);
      const yRatio = yScale.scale(d.y);
      const x = coord.start.x + coord.width * xRatio;
      const y = coord.start.y - coord.height * yRatio;
      points.push({ x, y });
    });
    return points;
  }
}
