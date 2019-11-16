import * as _ from '@antv/util';
import { ElementOption } from '../interface/config';

export default class ElementParser {
  public plot: any;
  public type: string;
  public config: ElementOption;
  public style: any;
  private positionFields: string[];

  constructor(cfg) {
    _.assign(this, cfg);
    this.init();
  }

  public init() {
    this.config = {
      type: this.type,
      position: {
        fields: this.positionFields,
      },
      widthRatio: {
        // 宽度所占的分类的比例
        column: 2 / 3, // g2plot定制为2/3
        rose: 0.9999999, // 玫瑰图柱状占比 1
        multiplePie: 1 / 1.3, // 多层的饼图、环图
      },
    };
  }
}
