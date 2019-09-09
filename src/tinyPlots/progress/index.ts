import * as _ from '@antv/util';
import { getGeom } from '../../geoms/factory';
import TinyPlot, { TinyConfig } from '../tinyPlot';
import * as EventParser from './event';

interface TinyProgressCfg extends TinyConfig {
  stackField?: number;
}

const G2_GEOM_MAP = {
  progress: 'interval',
};

const PLOT_GEOM_MAP = {
  interval: 'progress',
};

export default class Progress extends TinyPlot<TinyProgressCfg> {
  /**
   * 将进度条配置项转为堆叠条形图配置项
   */
  public processProps() {
    this._getSize();
    let props = this._initialProps;
    const cfg = {
      padding: [0, 0, 0, 0],
      xField: 'value',
      yField: '1',
      stackField: 'type',
      barSize: this._getSize(),
      barStyle: props.progressStyle,
      color: props.color || ['#55A6F3', '#E8EDF3'],
    } as any;
    props = _.mix(props, cfg);
  }

  public update(value) {
    const props = this._initialProps;
    props.percent = value;
    this.processData();
    this.changeData(props.data);
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

  protected _beforeInit() {
    super._beforeInit();
    this.processData();
    this.processProps();
  }

  protected _coord() {
    const coordConfig = {
      actions: [['transpose']],
    };
    this._setConfig('coord', coordConfig);
  }

  protected _addGeometry() {
    const props = this._initialProps;
    const bar = getGeom('interval', 'main', {
      positionFields: [props.yField, props.xField],
      plot: this,
    });
    bar.adjust = [
      {
        type: 'stack',
      },
    ];
    this._setConfig('element', bar);
  }

  protected _events(eventParser) {
    super._events(EventParser);
  }

  private processData() {
    const props = this._initialProps;
    const data = [{ type: 'current', value: props.percent }, { type: 'rest', value: 1.0 - props.percent }];
    props.data = data;
  }

  private _getSize() {
    const height = this.canvasController.height;
    if (height >= 50) {
      return 10;
    }
    return 4;
  }
}
