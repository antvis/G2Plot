import * as _ from '@antv/util';

interface ILabel {
  position: string;
  text: string[] | Function;
  offset: number | Function;
  style: any;
}

interface IQuadrant {
  xBaseline: number;
  yBaseline: number;
  styles: any[];
  label: ILabel;
}

export default class Statistic {
  constructor() {}

  public init() {}

  public render() {}

  public clear() {}

  public destroy() {}
}
