import { deepMix } from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import ConnectedArea from '../../components/connected-area';
import { ElementOption, Label } from '../../interface/config';
import BaseColumnLayer, { ColumnViewConfig } from '../column/layer';
import StackColumnLabel from './component/label';

export interface StackColumnViewConfig extends ColumnViewConfig {
  stackField: string;
  connectedArea?: any;
}

export interface StackColumnLayerConfig extends StackColumnViewConfig, LayerConfig {}

export default class StackColumnLayer<
  T extends StackColumnLayerConfig = StackColumnLayerConfig
> extends BaseColumnLayer<T> {
  public static getDefaultOptions() {
    return deepMix({}, super.getDefaultOptions(), {
      legend: {
        visible: true,
        position: 'right-top',
      },
      label: {
        visible: false,
        position: 'middle',
        offset: 0,
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

  protected interaction() {
    if (this.options.connectedArea && this.options.connectedArea.visible) {
      this.options.interactions = [{ type: 'tooltip' }];
    }
    super.interaction();
  }

  protected renderLabel() {
    const { scales } = this.config;
    const { yField } = this.options;
    const scale = scales[yField];
    if (this.options.label && this.options.label.visible) {
      const label = new StackColumnLabel({
        view: this.view,
        plot: this,
        formatter: scale.formatter,
        ...this.options.label,
      });
      label.render();
    }
  }
}

registerPlotType('stackColumn', StackColumnLayer);
