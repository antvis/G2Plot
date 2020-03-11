import { assign, deepMix, get } from '@antv/util';
import { ElementOption } from '../interface/config';

export default class ElementParser {
  public plot: any;
  public type: string;
  public config: ElementOption;
  public style: any;
  private positionFields: string[];
  private widthRatio: { [key: string]: number };

  constructor(cfg) {
    assign(this, cfg);
    this.init();
  }

  public init() {
    this.config = {
      type: this.type,
      position: {
        fields: this.positionFields,
      },
      widthRatio: deepMix(
        {},
        {
          column: 3 / 5,
          rose: 0.9999999, // 玫瑰图柱状占比 1
          multiplePie: 1 / 1.3, // 多层的饼图、环图
        },
        this.plot.options?.widthRatio || {},
        this.widthRatio || {}
      ),
    };
  }
}
