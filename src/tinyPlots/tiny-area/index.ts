import * as _ from '@antv/util';
import { getGeom } from '../../geoms/factory';
import TinyPlot from '../tinyPlot';
import * as EventParser from './event';

const GEOM_MAP = {
  area: 'area',
  line: 'line',
};

export default class TinyArea extends TinyPlot {
  public line: any;
  public area: any;

  protected geometryParser(dim: string, type: string): string {
    return GEOM_MAP[type];
  }

  protected setType(): void {
    this.type = 'tineArea';
  }

  protected _addGeometry() {
    this.area = getGeom('area', 'mini', {
      plot: this,
    });
    this._setConfig('element', this.area);

    this.line = getGeom('line', 'mini', {
      plot: this,
    });
    this._setConfig('element', this.line);
  }

  protected _events(eventParser) {
    super._events(EventParser);
  }
  
}
