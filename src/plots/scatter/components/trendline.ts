import { each, isArray, isFunction, deepMix } from '@antv/util';
import { Group, BBox } from '@antv/g';
import { View } from '@antv/g2';
import {
  regressionLinear,
  regressionExp,
  regressionLoes,
  regressionLog,
  regressionPoly,
  regressionPow,
  regressionQuad,
} from 'd3-regression';

const REGRESSION_MAP = {
  exp: regressionExp,
  linear: regressionLinear,
  loess: regressionLoes,
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
  constructor(cfg: ITrendline) {
    this.options = cfg;
    this.view = this.options.view;
    this.init();
  }

  public init() {
    // 处理数据
    const { xField, yField, data } = this.options.plotOptions;
    const linearRegression = REGRESSION_MAP[this.options.type]()
      .x((d) => d[xField])
      .y((d) => d[yField]);
    this.data = linearRegression(data);
  }

  public render() {}

  public clear() {}

  public destory() {}

  private getRegressionMethod() {}
}
