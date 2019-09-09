import * as _ from '@antv/util';
import { getGeom } from '../../geoms/factory';
import TinyPlot from '../tinyPlot';
import * as EventParser from './event';

export default class TinyLine extends TinyPlot {
  public line: any;

  protected geometryParser(dim: string, type: string): string {
    throw new Error('Method not implemented.');
  }

  protected setType(): void {
    this.type = 'tinyLine';
  }

  protected _addGeometry() {
    this.line = getGeom('line', 'mini', {
      plot: this,
    });
    this._setConfig('element', this.line);
  }

  protected _events(eventParser) {
    super._events(EventParser);
  }

}
