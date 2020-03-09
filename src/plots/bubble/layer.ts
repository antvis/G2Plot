import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import * as EventParser from '../scatter/event';
import ScatterLayer, { ScatterViewConfig } from '../scatter/layer';

export interface BubbleViewConfig extends ScatterViewConfig {
  /** 气泡大小 */
  pointSize?: [number, number];
  /** 气泡大小字段 */
  sizeField?: string;
}

export interface BubbleLayerConfig extends BubbleViewConfig, LayerConfig {}

export default class BubbleLayer<T extends BubbleLayerConfig = BubbleLayerConfig> extends ScatterLayer<T> {
  public static getDefaultOptions(): any {
    return _.deepMix({}, super.getDefaultOptions(), {
      pointSize: [8, 58],
      pointStyle: {
        strokeOpacity: 1,
        fillOpacity: 1,
        opacity: 0.5,
      },
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
}

registerPlotType('bubble', BubbleLayer);
