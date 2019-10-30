import * as _ from '@antv/util';
import { getGeom } from '../../geoms/factory';
import TinyLayer from '../TinyLayer';
import * as EventParser from './event';

const WIDTH_RATIO = 0.6;

const G2_GEOM_MAP = {
  column: 'interval',
};

const PLOT_GEOM_MAP = {
  interval: 'column',
};

export default class TinyColumnLayer extends TinyLayer {
  public line: any;
  public area: any;

  protected geometryParser(dim: string, type: string): string {
    if (dim === 'g2') {
      return G2_GEOM_MAP[type];
    }
    return PLOT_GEOM_MAP[type];
  }

  protected setType(): void {
    this.type = 'tinyColumn';
  }

  protected _setDefaultG2Config() {}

  protected beforeInit() {
    super.beforeInit();
    this._processProps();
  }

  protected _addGeometry() {
    const props = this.initialProps;
    const column = getGeom('interval', 'main', {
      positionFields: [props.xField, props.yField],
      plot: this,
    });
    this.setConfig('element', column);
  }

  protected _parserEvents(eventParser) {
    super._parserEvents(EventParser);
  }

  private _processProps() {
    let props = this.initialProps;
    const cfg = {
      padding: [0, 0, 0, 0],
      columnSize: this._getSize(),
    } as any;
    props = _.mix(props, cfg);
  }

  private _getSize() {
    const props = this.initialProps;
    const columnNumber = this._getColumnNum(props.data, props.xField);
    const width = this.getLayerWidth();
    return (width / columnNumber) * WIDTH_RATIO;
  }

  private _getColumnNum(data, field) {
    const values = [];
    _.each(data, (d) => {
      const v = d[field];
      if (values.indexOf(v) < 0) {
        values.push(v);
      }
    });
    return values.length;
  }
}
