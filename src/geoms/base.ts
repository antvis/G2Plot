import * as _ from '@antv/util';
import { ElementOption } from '../interface/config';

export default class ElementParser {
  public plot: any;
  public type: string;
  private positionFields: string[];
  public config: ElementOption;
  public style: any;

  constructor (cfg) {
    _.assign(this, cfg);
    this.init();
  }

  public init() {
    this.config = {
      type: this.type,
      position: {
        fields: this.positionFields,
      },
    };
  }
}
