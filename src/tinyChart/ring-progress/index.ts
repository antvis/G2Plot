import { CoordinateType } from '@antv/g2/lib/plot/interface';
import * as _ from '@antv/util';
import { getGeom } from '../../geoms/factory';
import Progress from '../progress';
import {getAngle,setShapeInfo} from './animation/index';

export default class RingProgress extends Progress {
  public ring: any;

  public processProps() {
    let props = this._initialProps;
    const cfg = {
      padding: [0, 0, 0, 0],
      xField: 'value',
      yField: '1',
      stackField: 'type',
      color: props.color || ['#55A6F3', '#E8EDF3'],
    } as any;
    props = _.mix(props, cfg);
  }

  protected _beforeInit() {
    super._beforeInit();
    this.type = 'tinyRingProgress';
  }

  protected _afterRender(){
    super._afterRender();
    const coord = this.plot.get('coord');
    // 缓存图形
    const geoms = this.plot.get('elements');
    _.each(geoms,(geom)=>{
      const shapes = geom.getShapes();
      _.each(shapes,(shape)=>{
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
    this._setConfig('coord', coordConfig);
  }

  protected _annotation() {}

  protected _addElements() {
    const props = this._initialProps;
    this.ring = getGeom('interval', 'main', {
      positionFields: [props.yField, props.xField],
      plot: this,
    });
    this.ring.adjust = [
      {
        type: 'stack',
      },
    ];
    this._setConfig('element', this.ring);
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

  private _getThickness() {
    const { width, height } = this.canvasController;
    const size = Math.min(width, height);
    if (size >= 60) {
      return 1.0 - 20 / size;
    }
    return 1.0 - 10 / size;
  }
}
