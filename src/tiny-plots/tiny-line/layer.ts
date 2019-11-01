import * as _ from '@antv/util';
import { getGeom } from '../../geoms/factory';
import TinyLayer from '../tiny-layer';
import * as EventParser from './event';

const GEOM_MAP = {
  line: 'line',
};

export default class TinyLineLayer extends TinyLayer {
  public line: any;

  protected geometryParser(dim: string, type: string): string {
    return GEOM_MAP[type];
  }

  protected setType(): void {
    this.type = 'tinyLine';
  }

  protected _addGeometry() {
    this.line = getGeom('line', 'mini', {
      plot: this,
    });
    this.setConfig('element', this.line);
  }

  protected _parserEvents(eventParser) {
    super._parserEvents(EventParser);
  }
}
