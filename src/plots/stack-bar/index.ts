import * as _ from '@antv/util';
import { getComponent } from '../../components/factory';
import { ElementOption, Label } from '../../interface/config';
import BaseBar, { BarConfig } from '../bar';
import './guide/label/stackBar-label';

export interface StackBarConfig extends BarConfig {
  stackField: string;
}

export default class StackBar extends BaseBar<StackBarConfig> {
  protected _adjustBar(bar: ElementOption) {
    bar.adjust = [
      {
        type: 'stack',
      },
    ];
  }

  protected _extractLabel() {
    const props = this._initialProps;
    const label = props.label as Label;

    if (label && label.visible === false) {
      return false;
    }

    if (!label.position) {
      label.position = 'middle';
    }

    const labelConfig = getComponent('label', {
      plot: this,
      labelType: 'stackBarLabel',
      fields: [props.xField],
      ...label,
    });

    return labelConfig as any;
  }
}
