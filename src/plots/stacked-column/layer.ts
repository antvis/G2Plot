import { deepMix } from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import ConnectedArea from '../../components/connected-area';
import { ElementOption, Label } from '../../interface/config';
import BaseColumnLayer, { ColumnViewConfig } from '../column/layer';
import StackColumnLabel from './component/label';

export interface StackedColumnViewConfig extends ColumnViewConfig {
  stackField: string;
  connectedArea?: any;
}

export interface StackedColumnLayerConfig extends StackedColumnViewConfig, LayerConfig {}

export default class StackedColumnLayer<
  T extends StackedColumnLayerConfig = StackedColumnLayerConfig
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

  public type: string = 'stackedColumn';
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

registerPlotType('stackedColumn', StackedColumnLayer);
