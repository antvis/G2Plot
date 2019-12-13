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
  showConfidence?: boolean;
  confidenceStyle?: any;
}

export interface ITrendline extends TrendlineConfig {
  view: View;
  plotOptions: any;
}

function se95(p, n) {
  return Math.sqrt((p * (1 - p)) / n) * 1.96;
}

export default class Quadrant {
  public data: { trendlineData: any[]; confidenceData: any[] };
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
      showConfidence: false,
      confidenceStyle: {
        fill: '#ccc',
        opacity: 0.1,
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
    this.container = this.view.get('backgroundGroup').addGroup();
  }

  public render() {
    const coord = this.view.get('coord');
    const { trendlineData } = this.data;
    // 创建图形绘制的scale
    const LinearScale = getScale('linear');
    const xScale = new LinearScale({
      min: minBy(trendlineData, 'x').x,
      max: maxBy(trendlineData, 'x').x,
      nice: true,
    });
    const yScale = new LinearScale({
      min: minBy(trendlineData, 'y').y,
      max: maxBy(trendlineData, 'y').y,
      nice: true,
    });
    // 绘制置信区间曲线
    if (this.options.showConfidence) {
      const confidencePath = this.getConfidencePath(xScale, yScale, coord);
      this.container.addShape('path', {
        attrs: {
          path: confidencePath,
          ...this.options.confidenceStyle,
        },
      });
    }
    // 绘制trendline
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
    const trendline = [];
    const confidence = [];
    each(data, (d) => {
      trendline.push({ x: d[0], y: d[1] });
      const conf = se95(data.rSquared, d[1]);
      confidence.push({ x: d[0], y0: d[1] - conf, y1: d[1] + conf });
    });
    return { trendlineData: trendline, confidenceData: confidence };
  }

  private getTrendlinePoints(xScale, yScale, coord) {
    const points = [];
    each(this.data.trendlineData, (d) => {
      const xRatio = xScale.scale(d.x);
      const yRatio = yScale.scale(d.y);
      const x = coord.start.x + coord.width * xRatio;
      const y = coord.start.y - coord.height * yRatio;
      points.push({ x, y });
    });
    return points;
  }

  private getConfidencePath(xScale, yScale, coord) {
    const upperPoints = [];
    const lowerPoints = [];
    const path = [];
    each(this.data.confidenceData, (d) => {
      const xRatio = xScale.scale(d.x);
      const y0Ratio = yScale.scale(d.y0);
      const y1Ratio = yScale.scale(d.y1);
      const x = coord.start.x + coord.width * xRatio;
      const y0 = coord.start.y - coord.height * y0Ratio;
      const y1 = coord.start.y - coord.height * y1Ratio;
      upperPoints.push({ x, y: y0 });
      lowerPoints.push({ x, y: y1 });
    });
    for (let i = 0; i < upperPoints.length; i++) {
      const flag = i === 0 ? 'M' : 'L';
      const p = upperPoints[i];
      path.push([flag, p.x, p.y]);
    }
    for (let j = lowerPoints.length - 1; j > 0; j--) {
      const p = lowerPoints[j];
      path.push(['L', p.x, p.y]);
    }

    return path;
  }
}
