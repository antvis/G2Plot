import { each, deepMix, minBy, maxBy } from '@antv/util';
import { IGroup, IShape } from '@antv/g-base';
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
  visible?: boolean;
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

export default class TrendLine {
  public data: { trendlineData: any[]; confidenceData: any[] };
  protected options: any;
  protected view: View;
  protected container: IGroup;
  protected shape: IShape;

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
    this.container = this.view.backgroundGroup.addGroup();
  }

  public render() {
    const xscale_view = this.view.getScaleByField(this.options.plotOptions.xField);
    const yscale_view = this.view.getScaleByField(this.options.plotOptions.yField);
    const coord = this.view.getCoordinate();
    const { trendlineData } = this.data;
    // 创建图形绘制的scale
    const LinearScale = getScale('linear');
    const xRange = this.adjustScale(xscale_view, trendlineData, 'x');
    const xScale = new LinearScale({
      min: xRange.min,
      max: xRange.max,
      // nice: xscale_view.nice,
    });
    const yRange = this.adjustScale(yscale_view, trendlineData, 'y');
    const yScale = new LinearScale({
      min: yRange.min,
      max: yRange.max,
      // nice: yscale_view.nice,
    });
    // 绘制置信区间曲线
    if (this.options.showConfidence) {
      const confidencePath = this.getConfidencePath(xScale, yScale, coord);
      this.container.addShape('path', {
        attrs: {
          path: confidencePath,
          ...this.options.confidenceStyle,
        },
        name: 'confidence',
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
      name: 'trendline',
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
      if (!isNaN(p.x) && !isNaN(p.y)) {
        path.push([flag, p.x, p.y]);
      }
    }
    for (let j = lowerPoints.length - 1; j > 0; j--) {
      const p = lowerPoints[j];
      if (!isNaN(p.x) && !isNaN(p.y)) {
        path.push(['L', p.x, p.y]);
      }
    }
    return path;
  }

  private adjustScale(viewScale, trendlineData, dim) {
    // 处理用户自行配置min max的情况
    const { min, max } = viewScale;
    const { data, xField, yField } = this.options.plotOptions;
    const field = dim === 'x' ? xField : yField;
    const dataMin = minBy(data, field)[field];
    const dataMax = maxBy(data, field)[field];
    const minRatio = (min - dataMin) / (dataMax - dataMin);
    const maxRatio = (max - dataMax) / (dataMax - dataMin);
    const trendMin = minBy(trendlineData, dim)[dim];
    const trendMax = maxBy(trendlineData, dim)[dim];
    return {
      min: trendMin + minRatio * (trendMax - trendMin),
      max: trendMax + maxRatio * (trendMax - trendMin),
    };
  }
}
