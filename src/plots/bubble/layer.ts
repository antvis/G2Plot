import { deepMix } from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import * as EventParser from '../scatter/event';
import ScatterLayer, { ScatterViewConfig } from '../scatter/layer';
import './shape';
import './theme';

export interface BubbleViewConfig extends ScatterViewConfig {
  /** 气泡大小 */
  pointSize?: [number, number];
  /** 气泡大小字段 */
  sizeField?: string;
}

export interface BubbleLayerConfig extends BubbleViewConfig, LayerConfig {}

export default class BubbleLayer<T extends BubbleLayerConfig = BubbleLayerConfig> extends ScatterLayer<T> {
  public static getDefaultOptions(): any {
    return deepMix({}, super.getDefaultOptions(), {
      // 直径 min 4px；max 64px
      pointSize: [2, 32],
      pointStyle: {
        stroke: null,
        strokeOpacity: 1,
        fillOpacity: 0.5,
      },
      label: {
        position: 'middle',
        style: {
          stroke: '#fff',
          lineWidth: 1,
        },
      },
      shape: 'bubble-point',
    });
  }

  public type: string = 'bubble';

  protected legend() {
    super.legend();
    this.setConfig('legends', {
      [this.options.sizeField]: false,
    });
  }

  protected parseEvents() {
    super.parseEvents(EventParser);
  }

  protected extractTooltip() {
    this.points.tooltip = {};
    const tooltipOptions: any = this.options.tooltip;
    if (tooltipOptions.fields) {
      this.points.tooltip.fields = tooltipOptions.fields;
    } else {
      this.points.tooltip.fields = [this.options.xField, this.options.yField, this.options.sizeField];
    }
    if (tooltipOptions.formatter) {
      this.points.tooltip.callback = tooltipOptions.formatter;
      if (this.options.colorField) {
        this.points.tooltip.fields.push(this.options.colorField);
      }
    }
  }
}

registerPlotType('bubble', BubbleLayer);
