import { CoordinateType } from '@antv/g2/lib/plot/interface';
import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import { getGeom } from '../../geoms/factory';
import ProgressLayer, { ProgressViewConfig } from '../progress/layer';
import { getAngle, setShapeInfo } from './animation/index';
import * as EventParser from './event';

const DEFAULT_COLOR = ['#55A6F3', '#E8EDF3'];

export interface RingProgressViewConfig extends ProgressViewConfig {}
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

  public afterRender() {
    super.afterRender();
    const coord = this.view.get('coord');
    // 缓存图形
    const geoms = this.view.get('elements');
    _.each(geoms, (geom) => {
      const shapes = geom.getShapes();
      _.each(shapes, (shape) => {
        const { startAngle, endAngle } = getAngle(shape, coord);
        setShapeInfo(shape, startAngle, endAngle);
      });
    });
  }

  protected coord() {
    const coordConfig = {
      type: 'theta' as CoordinateType,
      cfg: {
        radius: 1.0,
        innerRadius: this.getThickness(),
      },
    };
    this.setConfig('coord', coordConfig);
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
    this.setConfig('element', this.ring);
  }

  protected animation() {
    this.ring.animate = {
      appear: {
        duration: 1000,
      },
      update: {
        easing: 'easeLinear',
        animation: 'groupProgress',
        duration: 1000,
      },
    };
  }

  protected parseEvents(eventParser) {
    super.parseEvents(EventParser);
  }

  private getThickness() {
    const width = this.width;
    const height = this.height;
    const size = Math.min(width, height);
    if (size >= 60) {
      return 1.0 - 20 / size;
    }
    return 1.0 - 10 / size;
  }
}

registerPlotType('ringProgress', RingProgressLayer);
