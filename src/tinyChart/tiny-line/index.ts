import * as _ from '@antv/util';
import { getGeom } from '../../geoms/factory';
import TinyPlot from '../tinyPlot';

export default class TinyLine extends TinyPlot {
  public line: any;

  protected _beforeInit() {
    super._beforeInit();
    this.type = 'tinyLine';
  }

  protected _addElements() {
    this.line = getGeom('line', 'mini', {
      plot: this,
    });
    this._setConfig('element', this.line);
  }
}
