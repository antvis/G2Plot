import { each, isArray, isFunction, deepMix } from '@antv/util';
import { Group, BBox } from '@antv/g';
import { View } from '@antv/g2';

export interface TrendlineConfig {
  type?: string;
  style?: any;
}

export interface ITrendline extends TrendlineConfig {
  view: View;
  plotOptions: any;
}

export default class Quadrant {
  constructor() {}

  public init() {}

  public render() {}

  public clear() {}

  public destory() {}
}
