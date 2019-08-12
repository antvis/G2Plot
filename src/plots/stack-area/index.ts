import BaseArea, { AreaConfig } from '../area';
import { ElementOption } from '../../interface/config';
import * as _ from '@antv/util';

export interface StackAreaConfig extends AreaConfig {
  stackField: string;
}

export default class StackArea extends BaseArea<StackAreaConfig> {
  protected _adjustArea(ele: ElementOption) {
    ele.adjust = [ {
      type: 'stack',
    } ];
  }

  protected _adjustLine(ele: ElementOption) {
    ele.adjust = [ {
      type: 'stack',
    } ];
  }

  protected _adjustPoint(ele: ElementOption) {
    ele.adjust = [ {
      type: 'stack',
    } ];
  }
}
