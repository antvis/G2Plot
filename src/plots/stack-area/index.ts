import * as _ from '@antv/util';
import { getComponent } from '../../components/factory';
import { ElementOption, Label } from '../../interface/config';
import BaseArea, { AreaConfig } from '../area';
import './component/label';

export interface StackAreaConfig extends AreaConfig {
  stackField: string;
}

export default class StackArea extends BaseArea<StackAreaConfig> {

  protected setType() {
    this.type = 'stackArea';
  }

  protected _label() {
    const props = this._initialProps;
    const label = props.label as Label;

    if (label && label.visible === false) {
      this.line.label = false;
      return;
    }
    const labelType = label.type ? label.type : 'line';
    /** label类型为line，即跟随在折线尾部时，设置offset为0 */
    if (labelType === 'line' || labelType === 'area') {
      label.offset = 0;
    }

    this.area.label = getComponent('label', {
      fields: [props.stackField],
      labelType,
      plot: this,
      ...label
    });
  }

  protected _adjustArea(ele: ElementOption) {
    ele.adjust = [
      {
        type: 'stack',
      },
    ];
  }

  protected _adjustLine(ele: ElementOption) {
    ele.adjust = [
      {
        type: 'stack',
      },
    ];
  }

  protected _adjustPoint(ele: ElementOption) {
    ele.adjust = [
      {
        type: 'stack',
      },
    ];
  }
}
