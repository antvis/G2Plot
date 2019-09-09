import * as _ from '@antv/util';
import { getGeom } from '../../geoms/factory';
import TinyPlot from '../tinyPlot';
import * as EventParser from './event';

const WIDTH_RATIO = 0.6;

export default class TinyColumn extends TinyPlot {
  public line: any;
  public area: any;

  protected geometryParser(dim: string, type: string): string {
    throw new Error('Method not implemented.');
  }

  protected setType(): void {
    this.type = 'tinyColumn';
  }

  protected _setDefaultG2Config() {}

  protected _beforeInit() {
    super._beforeInit();
    this._processProps();
  }

  protected _addGeometry() {
    const props = this._initialProps;
    const column = getGeom('interval', 'main', {
      positionFields: [props.xField, props.yField],
      plot: this,
    });
    this._setConfig('element', column);
  }

  protected _events(eventParser) {
    super._events(EventParser);
  }

  private _processProps() {
    let props = this._initialProps;
    const cfg = {
      padding: [0, 0, 0, 0],
      columnSize: this._getSize(),
    } as any;
    props = _.mix(props, cfg);
  }

  private _getSize() {
    const props = this._initialProps;
    const columnNumber = this._getColumnNum(props.data, props.xField);
    const width = this.canvasController.width;
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
