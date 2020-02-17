import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import { getGeom } from '../../geoms/factory';
import ProgressLayer, { ProgressViewConfig } from '../progress/layer';
import * as EventParser from './event';

const DEFAULT_COLOR = ['#55A6F3', '#E8EDF3'];

export type RingProgressViewConfig = ProgressViewConfig;
export interface RingProgressLayerConfig extends RingProgressViewConfig, LayerConfig {}

export default class RingProgressLayer extends ProgressLayer<RingProgressLayerConfig> {
  public ring: any;
  public type: string = 'ringProgrsss';

  public processProps() {
    let props = this.options;
    props.data = this.processData();
    const cfg = {
      padding: [0, 0, 0, 0],
      xField: 'value',
      yField: '1',
      stackField: 'type',
      barStyle: props.progressStyle,
      color: this.parseColorProps(props) || DEFAULT_COLOR,
    } as any;
    props = _.mix(props, cfg);
  }

  protected coord() {
    const coordConfig: any = {
      type: 'theta',
      cfg: {
        radius: 1.0,
        innerRadius: this.getThickness(this.options.size),
      },
    };
    this.setConfig('coordinate', coordConfig);
  }

  protected annotation() {}

  protected addGeometry() {
    const props = this.options;
    this.ring = getGeom('interval', 'main', {
      positionFields: [props.yField, props.xField],
      plot: this,
    });
    this.ring.adjust = [
      {
        type: 'stack',
      },
    ];
    this.setConfig('geometry', this.ring);
  }

  protected animation() {
    this.ring.animate = {
      appear: {
        duration: 1000,
      },
    };
  }

  protected parseEvents(eventParser) {
    super.parseEvents(EventParser);
  }

  private getThickness(value?: number): number {
    const width = this.width;
    const height = this.height;
    const size = Math.min(width, height);

    if (value) {
      return 1.0 - value / size;
    }

    if (size >= 60) {
      return 1.0 - 20 / size;
    }
    return 1.0 - 10 / size;
  }
}

registerPlotType('ringProgress', RingProgressLayer);
