import * as _ from '@antv/util';
import { getComponent } from '../../components/factory';
import { ElementOption, Label } from '../../interface/config';
import BaseBarLayer, { BarLayerConfig } from '../bar/layer';
import './component/label/stack-bar-label';

export interface StackBarLayerConfig extends BarLayerConfig {
  stackField: string;
}

export default class StackBarLayer extends BaseBarLayer<StackBarLayerConfig> {
  public static getDefaultProps() {
    const globalDefaultProps = super.getDefaultProps();
    return _.deepMix({}, globalDefaultProps, {
      label: {
        visible: false,
        position: 'middle',
      },
    });
  }

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
