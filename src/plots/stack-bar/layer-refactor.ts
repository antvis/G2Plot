import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import { getComponent } from '../../components/factory-refactor';
import { ElementOption, Label } from '../../interface/config';
import BaseBarLayer, { BarLayerConfig } from '../bar/layer-refactor';
import './component/label/stack-bar-label';

export interface StackBarLayerConfig extends BarLayerConfig {
    stackField: string;
}

export default class StackBarLayer extends BaseBarLayer<StackBarLayerConfig> {
    public static getDefaultOptions() {
      return _.deepMix({}, super.getDefaultOptions(), {
        label: {
            visible: false,
            position: 'middle',
          },
        });
    }

    public type: string = 'stackBar';
  
    protected adjustBar(bar: ElementOption) {
      bar.adjust = [
        {
          type: 'stack',
        },
      ];
    }
  
    protected extractLabel() {
      const props = this.options;
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

registerPlotType('stackBar',StackBarLayer);


  