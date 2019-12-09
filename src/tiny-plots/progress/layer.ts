import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import { getGeom } from '../../geoms/factory';
import TinyLayer, { TinyViewConfig } from '../tiny-layer';
import Marker, { MarkerConfig } from './component/marker';
import * as EventParser from './event';
import { EVENT_MAP } from './event';

export interface ProgressViewConfig extends TinyViewConfig {
  stackField?: number;
  progressStyle?: any; // FIXME:
  percent?: number;
  size?: number;
  marker?: MarkerConfig;
  barSize?: number;
  barStyle?: any;
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
  protected markers: MarkerConfig[];
  private isEntered = false;

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

  public update(cfg) {
    const props = this.options;
    if (cfg.percent) {
      props.percent = cfg.percent;
      this.changeData(this.processData());
    }

    if (cfg.style) {
      this.styleUpdateAnimation(cfg.style);
      this.updateColorConfigByStyle(cfg.style);
    }

    if (cfg.color) {
      let style;
      if (_.isArray(cfg.color)) {
        this.options.color = cfg.color;
        style = [{ fill: cfg.color[0] }, { fill: cfg.color[1] }];
      } else {
        this.options.color[0] = cfg.color;
        style = { fill: cfg.color };
      }
      this.styleUpdateAnimation(style);
    }

    if (cfg.marker) {
      this.updateMarkers(cfg.marker);
    }
  }

  public destroy() {
    if (this.markers && this.markers.length > 0) {
      _.each(this.markers, (marker) => {
        marker.destroy();
      });
      this.markers = [];
    }
    super.destroy();
  }

  public afterRender() {
    if (this.options.marker && !this.markers) {
      this.markers = [];
      _.each(this.options.marker, (cfg) => {
        const markerCfg = _.mix(
          {
            canvas: this.canvas,
            view: this.view,
            progressSize: this.options.barSize,
          },
          cfg
        );
        const marker = new Marker(markerCfg);
        this.markers.push(marker);
      });
    }

    const progressContainer = this.view.get('elements')[0].get('container');
    const bbox = progressContainer.getBBox();
    const rect = progressContainer.addShape('rect', {
      attrs: {
        width: bbox.width,
        height: bbox.height,
        x: bbox.minX,
        y: bbox.minY,
        fill: 'rgba(0,0,0,0)',
      },
    });
    this.canvas.draw();

    rect.on('mouseenter', (ev) => {
      this.isEntered = true;
      this.view.emit('progress:mouseenter', ev);
    });

    rect.on('mouseleave', (ev) => {
      this.isEntered = false;
      this.view.emit('progress:mouseleave', ev);
    });

    const canvasDom = this.canvas.get('canvasDOM');
    canvasDom.addEventListener('mouseleave', (ev) => {
      if (this.isEntered) {
        this.view.emit('progress:mouseleave', ev);
        this.isEntered = false;
      }
    });
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

  protected updateMarkers(markerCfg) {
    const markerLength = markerCfg.length;
    const animationOptions = this.getUpdateAnimationOptions();
    // marker diff
    _.each(this.markers, (marker, index) => {
      if (index > markerLength - 1) {
        marker.destroy();
      } else {
        marker.update(markerCfg[index], animationOptions.duration, animationOptions.easing);
      }
    });
    // add new markers
    if (this.markers.length < markerLength) {
      const startIndex = this.markers.length;
      for (let i = startIndex; i < markerLength; i++) {
        const cfg = _.mix(
          {
            canvas: this.canvas,
            view: this.view,
            progressSize: this.options.barSize,
          },
          markerCfg[i]
        );
        const marker = new Marker(cfg);
        this.markers.push(marker);
      }
    }
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

  private updateColorConfigByStyle(style) {
    if (_.isArray(style)) {
      _.each(style, (s, index) => {
        if (s.fill) {
          this.options.color[index] = s.fill;
        }
      });
    } else if (style.fill) {
      this.options.color[0] = style.fill;
    }
  }
}

registerPlotType('progress', ProgressLayer);
