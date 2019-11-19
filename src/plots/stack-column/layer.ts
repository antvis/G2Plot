import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import ConnectedArea from '../../components/connected-area';
import { getComponent } from '../../components/factory';
import { ElementOption, Label } from '../../interface/config';
import BaseColumnLayer, { ColumnViewConfig } from '../column/layer';
import './component/label/stack-column-label';
import { tsPropertySignature } from '@babel/types';

export interface StackColumnViewConfig extends ColumnViewConfig {
  stackField: string;
  connectedArea?: any;
}

export interface StackColumnLayerConfig extends StackColumnViewConfig, LayerConfig {}

export default class StackColumnLayer<
  T extends StackColumnLayerConfig = StackColumnLayerConfig
> extends BaseColumnLayer<T> {
  public static getDefaultOptions() {
    return _.deepMix({}, super.getDefaultOptions(), {
      legend: {
        visible: true,
        position: 'right-top',
      },
      label: {
        visible: false,
        position: 'middle',
        adjustColor: true,
      },
      connectedArea: {
        visible: false,
        triggerOn: 'mouseenter',
      },
    });
  }

  public type: string = 'stackColum';
  public connectedArea: any;

  public init() {
    if (this.options.connectedArea.visible) {
      this.options.tooltip.crosshairs = null;
    }
    super.init();
  }

  public afterRender() {
    const props = this.options;
    // 绘制区域连接组件
    if (props.connectedArea.visible) {
      this.connectedArea = new ConnectedArea({
        view: this.view,
        field: props.stackField,
        animation: props.animation === false ? false : true,
        ...props.connectedArea,
      });
    }
    super.afterRender();
  }

  protected adjustColumn(column: ElementOption) {
    column.adjust = [
      {
        type: 'stack',
      },
    ];
  }

  protected extractLabel() {
    const props = this.options;

    const label = props.label as Label;
    if (!label.position) {
      label.position = 'middle';
    }

    if (label && label.visible === false) {
      return false;
    }

    const labelConfig = getComponent('label', {
      plot: this,
      labelType: 'stackColumnLabel',
      fields: [props.yField],
      ...label,
    });

    return labelConfig as any;
  }
}

registerPlotType('stackColumn', StackColumnLayer);
