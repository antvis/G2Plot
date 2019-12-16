import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import { getGeom } from '../../geoms/factory';
import '../scatter/components/label/scatter-label';
import * as EventParser from '../scatter/event';
import ScatterLayer, { PointViewConfig } from '../scatter/layer';

export interface BubbleViewConfig extends PointViewConfig {
  /** 气泡大小 */
  pointSize: [number, number];
  /** 气泡大小字段 */
  sizeField?: string;
}

export interface BubbleLayerConfig extends BubbleViewConfig, LayerConfig {}

export default class BubbleLayer<T extends BubbleLayerConfig = BubbleLayerConfig> extends ScatterLayer<T> {
  public static getDefaultOptions(): any {
    return _.deepMix({}, super.getDefaultOptions(), {
      pointSize: [8, 58],
      pointStyle: {
        opacity: 0.5,
      },
      xAxis: {
        grid: {
          visible: true,
        },
      },
      yAxis: {
        grid: {
          visible: true,
        },
      },
      tooltip: {
        visible: true,
        shared: false,
        crosshairs: {
          type: 'rect',
        },
      },
      label: {
        visible: false,
        position: 'middle',
      },
      shape: 'circle',
    });
  }

  public type: string = 'bubble';

  public bubbles: any;

  protected legend() {
    super.legend();
    /** 取消气泡大小图例 */
    this.setConfig('legends', {
      fields: {
        [this.options.sizeField]: false,
      },
    });
  }

  protected addGeometry() {
    const props = this.options;

    const bubbles = getGeom('point', 'circle', {
      plot: this,
    });

    if (props.label && props.label.visible) {
      bubbles.label = this.extractLabel();
    }

    this.bubbles = bubbles;
    this.setConfig('element', bubbles);
  }

  protected animation() {
    super.animation();
    const props = this.options;
    if (props.animation === false) {
      /** 关闭动画 */
      this.bubbles.animate = false;
    }
  }

  protected parseEvents() {
    super.parseEvents(EventParser);
  }
}

registerPlotType('bubble', BubbleLayer);
