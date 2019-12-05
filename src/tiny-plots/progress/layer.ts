import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import { getGeom } from '../../geoms/factory';
import TinyLayer, { TinyViewConfig } from '../tiny-layer';
import Marker from './component/marker';
import * as EventParser from './event';

export interface ProgressViewConfig extends TinyViewConfig {
  stackField?: number;
  progressStyle?: any; // FIXME:
  percent?: number;
  size?: number;
}

export interface ProgressLayerConfig extends ProgressViewConfig, LayerConfig {}

const G2_GEOM_MAP = {
  progress: 'interval',
};

const PLOT_GEOM_MAP = {
  interval: 'progress',
};

const DEFAULT_COLOR = ['#55A6F3', '#E8EDF3'];

export default class ProgressLayer<T extends ProgressLayerConfig = ProgressLayerConfig> extends TinyLayer<T> {
  /**
   * 将进度条配置项转为堆叠条形图配置项
   */

  public type: string = 'progress';
  public processProps() {
    let props = this.options;
    props.data = this.processData();
    const cfg = {
      padding: [0, 0, 0, 0],
      xField: 'value',
      yField: '1',
      stackField: 'type',
      barSize: props.size ? props.size : this.getSize(),
      barStyle: props.progressStyle,
      color: this.parseColorProps(props) || DEFAULT_COLOR,
    } as any;
    props = _.mix(props, cfg);
  }

  public init() {
    this.processProps();
    super.init();
  }

  public update(value, style?) {
    const props = this.options;
    props.percent = value;
    this.changeData(this.processData());
    if (style) {
      this.styleUpdateAnimation(style);
    }
  }

  public afterRender() {
    if (this.options.marker) {
      _.each(this.options.marker, (cfg) => {
        const marker = new Marker(
          _.mix(
            {
              canvas: this.canvas,
              view: this.view,
              progressSize: this.options.barSize,
            },
            cfg
          )
        );
      });
    }
  }

  protected geometryParser(dim: string, type: string): string {
    if (dim === 'g2') {
      return G2_GEOM_MAP[type];
    }
    return PLOT_GEOM_MAP[type];
  }

  protected coord() {
    const coordConfig = {
      actions: [['transpose']],
    };
    this.setConfig('coord', coordConfig);
  }

  protected addGeometry() {
    const props = this.options;
    const bar = getGeom('interval', 'main', {
      positionFields: [props.yField, props.xField],
      plot: this,
    });
    bar.adjust = [
      {
        type: 'stack',
      },
    ];
    if (_.has(props, 'animation')) {
      bar.animate = props.animation;
    }
    this.setConfig('element', bar);
  }

  protected parseEvents(eventParser) {
    super.parseEvents(EventParser);
  }

  protected parseColorProps(props) {
    let colorOption;
    if (props.color) {
      if (_.isFunction(props.color)) {
        colorOption = props.color(props.percent);
      } else {
        colorOption = props.color;
      }
      if (_.isString(colorOption)) {
        const color = _.clone(DEFAULT_COLOR);
        color[0] = colorOption;
        return color;
      } else {
        return colorOption;
      }
    }
    return props.color;
  }

  protected processData() {
    const props = this.options;
    const data = [
      { type: 'current', value: props.percent },
      { type: 'rest', value: 1.0 - props.percent },
    ];
    return data;
  }

  private getSize() {
    const { height } = this;
    if (height >= 50) {
      return 10;
    }
    return 4;
  }

  private styleUpdateAnimation(style) {
    // style更新动画接受用户animation配置的透传
    const { duration, easing } = this.getUpdateAnimationOptions();
    // get geometry shapes
    const progressShapes = [];
    const { view } = this;
    const geometry = view.get('elements');
    _.each(geometry, (geom) => {
      if (geom.get('shapeType') === 'interval') {
        const shapes = geom.getShapes();
        progressShapes.push(...shapes);
      }
    });
    if (_.isArray(style)) {
      _.each(style, (s, index) => {
        progressShapes[index].animate(s, duration, easing);
      });
    } else {
      progressShapes[0].animate(style, duration, easing);
    }
  }

  private getUpdateAnimationOptions() {
    let duration = 450;
    let easing = 'easeQuadInOut';
    const animationOptions = this.options.animation;
    if (animationOptions && animationOptions.update) {
      if (animationOptions.update.duration) {
        duration = animationOptions.update.duration;
      }
      if (animationOptions.update.easing) {
        easing = animationOptions.update.easing;
      }
    }
    return { duration, easing };
  }
}

registerPlotType('progress', ProgressLayer);
