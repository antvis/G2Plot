import { each } from '@antv/util';
import { Group, BBox } from '@antv/g';
import { View } from '@antv/g2';

interface ILabel {
  position: string;
  text: string[] | Function;
  offset: number | Function;
  style: any;
}

export interface QuadrantConfig {
  xBaseline?: number;
  yBaseline?: number;
  styles: any[];
  label: ILabel;
}

export interface IQuadrant extends QuadrantConfig {
  view: View;
  plotOptions: any;
}

export default class Quadrant {
  public options: IQuadrant;
  protected view: View;
  protected xBaseline: number = 0;
  protected yBaseline: number = 0;
  protected quadrantGroups: Group[] = [];

  constructor(cfg: IQuadrant) {
    this.options = cfg;
    this.view = this.options.view;
    this.init();
  }

  public init() {
    const { xBaseline, yBaseline } = this.options;
    const coord = this.view.get('coord');
    const regionData = [];
    // 根据xBaseline和yBaseline分割象限
    const scales = this.view.get('scales');
    const xScale = scales[this.options.plotOptions.xField];
    const yScale = scales[this.options.plotOptions.yField];
    // 先进行x方向的分割
    let xRegion;
    if (xBaseline > xScale.min && xBaseline < xScale.max) {
      const ratio = (xBaseline - xScale.min) / (xScale.max - xScale.min);
      xRegion = [
        new BBox(coord.start.x, coord.start.y, coord.width * ratio, coord.height),
        new BBox(coord.start.x + coord.width * ratio, coord.start.y, coord.width * (1 - ratio), coord.height),
      ];
    } else {
      xRegion = new BBox(coord.start.x, coord.start.y, coord.width, coord.height);
    }
    // 再进行y方向的分割
    if (yBaseline > yScale.min && yBaseline < yScale.max) {
      const ratio = (yBaseline - yScale.min) / (yScale.max - yScale.min);
      each(xRegion, (region) => {
        const yRegion = [
          new BBox(region.minX, region.minY, region.width, region.height * ratio),
          new BBox(region.minX, region.minY + region.height * ratio, region.width, region.height * (1 - ratio)),
        ];
        regionData.push(...yRegion);
      });
    }
  }

  public render() {}

  public clear() {}

  public destroy() {}
}
