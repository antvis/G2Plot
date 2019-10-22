import { CoordinateType } from '@antv/g2/lib/plot/interface';
import * as _ from '@antv/util';
import { getGeom } from '../../geoms/factory';
import ProgressLayer from '../progress/ProgressLayer';
import { getAngle, setShapeInfo } from './animation/index';
import * as EventParser from './event';

const DEFAULT_COLOR = ['#55A6F3', '#E8EDF3'];

export default class RingProgressLayer extends ProgressLayer {
  public ring: any;

  public processProps() {
    let props = this.initialProps;
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

  protected beforeInit() {
    super.beforeInit();
    this.type = 'tinyRingProgress';
  }

  protected afterRender() {
    super.afterRender();
    const coord = this.plot.get('coord');
    // 缓存图形
    const geoms = this.plot.get('elements');
    _.each(geoms, (geom) => {
      const shapes = geom.getShapes();
      _.each(shapes, (shape) => {
        const { startAngle, endAngle } = getAngle(shape, coord);
        setShapeInfo(shape, startAngle, endAngle);
      });
    });
  }

  protected _coord() {
    const coordConfig = {
      type: 'theta' as CoordinateType,
      cfg: {
        radius: 1.0,
        innerRadius: this._getThickness(),
      },
    };
    this.setConfig('coord', coordConfig);
  }

  protected _annotation() {}

  protected _addGeometry() {
    const props = this.initialProps;
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

  protected _animation() {
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

  protected _parserEvents(eventParser) {
    super._parserEvents(EventParser);
  }

  private _getThickness() {
    const width = this.getLayerWidth();
    const height = this.getLayerHeight();
    const size = Math.min(width, height);
    if (size >= 60) {
      return 1.0 - 20 / size;
    }
    return 1.0 - 10 / size;
  }
}
