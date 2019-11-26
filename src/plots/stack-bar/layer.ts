import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import { getComponent } from '../../components/factory';
import { ElementOption, Label } from '../../interface/config';
import BaseBarLayer, { BarViewConfig } from '../bar/layer';
import './component/label/stack-bar-label';

export interface StackBarViewConfig extends BarViewConfig {
  stackField: string;
}

export interface StackBarLayerConfig extends StackBarViewConfig, LayerConfig {}

export default class StackBarLayer<T extends StackBarLayerConfig = StackBarLayerConfig> extends BaseBarLayer<T> {
  public static getDefaultOptions() {
    return _.deepMix({}, super.getDefaultOptions(), {
      xAxis: {
        visible: true,
        autoHideLabel: false,
        autoRotateLabel: false,
        autoRotateTitle: false,
        grid: {
          visible: true,
        },
        line: {
          visible: false,
        },
        tickLine: {
          visible: true,
        },
        label: {
          visible: true,
          style: {
            textAlign: 'center'
          }
        },
        title: {
          visible: true,
          offset: 12,
        },
      },
      yAxis: {
        visible: true,
        autoHideLabel: false,
        autoRotateLabel: false,
        autoRotateTitle: true,
        grid: {
          visible: false,
        },
        line: {
          visible: false,
        },
        tickLine: {
          visible: false,
        },
        label: {
          visible: true,
        },
        title: {
          visible: false,
          offset: 12,
        },
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

    if (label.visible === false) {
      return false;
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

registerPlotType('stackBar', StackBarLayer);
