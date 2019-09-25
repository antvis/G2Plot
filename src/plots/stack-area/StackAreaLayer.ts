import * as _ from '@antv/util';
import { getComponent } from '../../components/factory';
import { ElementOption, Label } from '../../interface/config';
import BaseArea, { AreaLayerConfig } from '../area/AreaLayer';
import './component/label';

export interface StackAreaLayerConfig extends AreaLayerConfig {
  stackField: string;
}

export default class StackAreaLayer extends BaseArea<StackAreaLayerConfig> {
  protected setType() {
    this.type = 'stackArea';
  }

  protected _label() {
    const props = this.initialProps;
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
      ...label,
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
