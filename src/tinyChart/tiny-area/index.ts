import * as _ from '@antv/util';
import { getGeom } from '../../geoms/factory';
import TinyPlot from '../tinyPlot';

export default class TinyArea extends TinyPlot {
  public line: any;
  public area: any;

  protected _beforeInit() {
    super._beforeInit();
    this.type = 'tinyLine';
  }

  protected _addElements() {
    this.area = getGeom('area', 'mini', {
      plot: this,
    });
    this._setConfig('element', this.area);

    this.line = getGeom('line', 'mini', {
      plot: this,
    });
    this._setConfig('element', this.line);
  }
}
