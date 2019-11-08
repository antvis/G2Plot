import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import { getGeom } from '../../geoms/factory';
import TinyLayer, { TinyViewConfig } from '../tiny-layer';
import * as EventParser from './event';

export interface ProgressViewConfig extends TinyViewConfig {
  stackField?: number;
  progressStyle?: any; // FIXME:
  percent?: number; // FIXME:
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
    this.getSize();

    let props = this.options;
    props.data = this.processData();
    const cfg = {
      padding: [0, 0, 0, 0],
      xField: 'value',
      yField: '1',
      stackField: 'type',
      barSize: this.getSize(),
      barStyle: props.progressStyle,
      color: this.parseColorProps(props) || DEFAULT_COLOR,
    } as any;
    props = _.mix(props, cfg);
  }

  public init() {
    this.processProps();
    super.init();
  }

  public update(value) {
    const props = this.options;
    props.percent = value;
    this.changeData(this.processData());
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
    this.setConfig('element', bar);
  }

  protected parserEvents(eventParser) {
    super.parserEvents(EventParser);
  }

  protected parseColorProps(props) {
    if (props.color) {
      if (_.isString(props.color)) {
        const color = _.clone(DEFAULT_COLOR);
        color[0] = props.color;
        return color;
      }
      if (_.isFunction(props.color)) {
        return props.color(props.percent);
      }
    }
    return props.color;
  }

  protected processData() {
    const props = this.options;
    const data = [{ type: 'current', value: props.percent }, { type: 'rest', value: 1.0 - props.percent }];
    return data;
  }

  private getSize() {
    const { height } = this;
    if (height >= 50) {
      return 10;
    }
    return 4;
  }
}

registerPlotType('progress', ProgressLayer);
