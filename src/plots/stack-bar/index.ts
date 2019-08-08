import BaseBar, { BarConfig } from '../bar';
import { ElementOption, Label } from '../../interface/config';
import * as _ from '@antv/util';
import './guide/label/stackBar-label';
import LabelParser from '../../components/label';

export interface StackBarConfig extends BarConfig {
  stackField: string;
}

export default class StackBar extends BaseBar<StackBarConfig> {

  protected _adjustBar(bar: ElementOption) {
    bar.adjust = [ {
      type: 'stack',
    } ];
  }

  protected _extractLabel() {
    const props = this._initialProps;
    const label = props.label as Label;

    if (label && label.visible === false) return false;

    if(!label.position) label.position = 'middle';

    const labelConfig = new LabelParser({
      plot:this,
      labelType: 'stackBarLabel',
      fields: [ props.xField ],
      ...label
    }).config;

    return labelConfig as any;
  }

}
