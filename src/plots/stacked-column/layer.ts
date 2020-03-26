import { deepMix } from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import ConnectedArea from '../../components/connected-area';
import { ElementOption, Label } from '../../interface/config';
import BaseColumnLayer, { ColumnViewConfig } from '../column/layer';
import './component/label';
import { getGeometryByType } from '../../util/view';

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
    const { label, yField } = this.options;
    const scale = scales[yField];
    if (label && label.visible) {
      const geometry = getGeometryByType(this.view, 'interval');
      this.doRenderLabel(geometry, {
        type: 'stacked-column',
        formatter: scale.formatter,
        ...this.options.label,
      });
    }
  }

  protected geometryTooltip() {
    this.column.tooltip = {};
    const tooltipOptions: any = this.options.tooltip;
    if (tooltipOptions.fields) {
      this.column.tooltip.fields = tooltipOptions.fields;
    }
    if (tooltipOptions.formatter) {
      this.column.tooltip.callback = tooltipOptions.formatter;
      if (!tooltipOptions.fields) {
        this.column.tooltip.fields = [this.options.xField, this.options.yField, this.options.stackField];
      }
    }
  }
}

registerPlotType('stackedColumn', StackedColumnLayer);
