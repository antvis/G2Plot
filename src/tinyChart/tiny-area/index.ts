import * as _ from '@antv/util';
import TinyPlot from '../tinyPlot';
import { getGeom } from '../../geoms/factory';

export default class TinyArea extends TinyPlot {
  line: any;
  area: any;

  protected _beforeInit() {
    super._beforeInit();
    this.type = 'tinyLine';
  }

  protected _addElements() {
    this.area = getGeom('area','mini',{
      plot: this
    });
    this._setConfig('element', this.area);

    this.line = getGeom('line','mini',{
        plot: this
      });
    this._setConfig('element', this.line);
  }

}