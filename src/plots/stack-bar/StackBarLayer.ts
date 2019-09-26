import * as _ from '@antv/util';
import { getComponent } from '../../components/factory';
import { ElementOption, Label } from '../../interface/config';
import BaseBarLayer, { BarLayerConfig } from '../bar/BarLayer';
import './component/label/stackBar-label';

export interface StackBarLayerConfig extends BarLayerConfig {
  stackField: string;
}

export default class StackBarLayer extends BaseBarLayer<StackBarLayerConfig> {
  protected setType() {
    this.type = 'stackBar';
  }

  protected _adjustBar(bar: ElementOption) {
    bar.adjust = [
      {
        type: 'stack',
      },
    ];
  }

  protected _extractLabel() {
    const props = this.initialProps;
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
