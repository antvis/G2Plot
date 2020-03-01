import { each } from '@antv/util';
import { View, IGroup } from '../../../dependents';
import EventEmitter from '@antv/event-emitter';

export interface HeatmapBackgroundConfig {
  visible?: boolean;
  type?: string;
  value?: any;
  src?: string;
  callback?: Function;
}

export interface IHeatmapBackground extends HeatmapBackgroundConfig {
  view: View;
  plot: any;
}

export default class HeatmapBackground extends EventEmitter {
  public options: IHeatmapBackground;
  public container: IGroup;
  protected view: View;
  protected x: number;
  protected y: number;
  protected width: number;
  protected height: number;

  constructor(cfg: IHeatmapBackground) {
    super();
    this.options = cfg;
    this.view = this.options.view;
    this.init();
  }

  public init() {
    const coord = this.getCoordinate();
    this.width = coord.getWidth();
    this.height = coord.getHeight();
    this.x = coord.start.x;
    this.y = coord.end.y;
    this.container = this.view.backgroundGroup.addGroup({});
  }

  public render() {
    if (this.options.type === 'color') {
      this.renderColorBackground();
    } else if (this.options.type === 'image') {
      this.renderImageBackground();
    } else if (this.options.callback) {
      const callbackCfg = {
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height,
        container: this.container,
      };
      this.options.callback(callbackCfg);
    }
  }

  public renderColorBackground() {
    this.container.addShape('rect', {
      attrs: {
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height,
        fill: this.options.value,
      },
    });
  }

  public renderImageBackground() {
    this.container.addShape('image', {
      attrs: {
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height,
        img: this.options.src,
      },
    });
  }

  public clear() {
    if (this.container) {
      this.container.clear();
      this.emit('background:clear');
    }
  }

  public destroy() {
    if (this.container) {
      this.container.remove();
      // 使用callback定制的html background需要自己监听销毁事件自行销毁
      this.emit('background:destroy');
    }
  }

  private getCoordinate() {
    let coordinate;
    each(this.view.geometries, (geom) => {
      if (geom.type === 'heatmap') {
        coordinate = geom.coordinate;
      }
    });
    return coordinate;
  }
}
