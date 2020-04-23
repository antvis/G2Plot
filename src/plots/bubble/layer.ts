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
          lineWidth: 2,
        },
      },
      shape: 'bubble-point',
    });
  }

  public getSizeScale() {
    const { sizeField } = this.options;
    if (sizeField) {
      this.view.getScaleByField(sizeField);
    }
  }

  public type: string = 'bubble';

  protected legend() {
    super.legend();

    if (this.options.legend && this.options.legend.visible === false) {
      return;
    }

    this.setConfig('legends', {
      [this.options.sizeField]: false,
    });
  }

  protected parseEvents() {
    super.parseEvents(EventParser);
  }
}

registerPlotType('bubble', BubbleLayer);
