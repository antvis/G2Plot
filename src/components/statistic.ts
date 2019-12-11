import * as _ from '@antv/util';

interface IItem {
  text?: string;
  field?: string;
  format?: () => string;
  style: {};
}

interface IPosition {
  x: number | string;
  y: number | string;
}

interface IStatistic {
  position: IPosition;
  item: IItem[];
  layout: 'vertical' | 'horizontal';
  order: string[];
  itemMargin: number;
  trigger: string;
}

export default class Statistic {
  constructor() {}

  public init() {}

  public render() {}

  public clear() {}

  public destroy() {}
}
