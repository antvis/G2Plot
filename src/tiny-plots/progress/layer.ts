import * as _ from '@antv/util';
import { getGeom } from '../../geoms/factory';
import TinyLayer, { TinyLayerConfig } from '../tiny-layer';
import * as EventParser from './event';

export interface ProgressLayerConfig extends TinyLayerConfig {
  stackField?: number;
}

const G2_GEOM_MAP = {
  progress: 'interval',
};

const PLOT_GEOM_MAP = {
  interval: 'progress',
};

const DEFAULT_COLOR = ['#55A6F3', '#E8EDF3'];

export default class ProgressLayer extends TinyLayer<ProgressLayerConfig> {
  /**
   * 将进度条配置项转为堆叠条形图配置项
   */
  public processProps() {
    this._getSize();
    let props = this.initialProps;
    const cfg = {
      padding: [0, 0, 0, 0],
      xField: 'value',
      yField: '1',
      stackField: 'type',
      barSize: this._getSize(),
      barStyle: props.progressStyle,
      color: this.parseColorProps(props) || DEFAULT_COLOR,
    } as any;
    props = _.mix(props, cfg);
  }

  public update(value) {
    const props = this.initialProps;
    props.percent = value;
    this.changeData(this.processData(props.data));
  }

  protected geometryParser(dim: string, type: string): string {
    if (dim === 'g2') {
      return G2_GEOM_MAP[type];
    }
    return PLOT_GEOM_MAP[type];
  }

  protected setType(): void {
    this.type = 'tinyProgress';
  }

  protected beforeInit() {
    super.beforeInit();
    this.processProps();
  }

  protected _coord() {
    const coordConfig = {
      actions: [['transpose']],
    };
    this.setConfig('coord', coordConfig);
  }

  protected _addGeometry() {
    const props = this.initialProps;
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

  protected _parserEvents(eventParser) {
    super._parserEvents(EventParser);
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

  protected processData(originData?: object[]) {
    const props = this.initialProps;
    const data = [{ type: 'current', value: props.percent }, { type: 'rest', value: 1.0 - props.percent }];

    return data;
  }

  private _getSize() {
    const height = this.getLayerHeight();
    if (height >= 50) {
      return 10;
    }
    return 4;
  }
}
