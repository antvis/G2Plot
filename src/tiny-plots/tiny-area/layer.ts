import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import { getGeom } from '../../geoms/factory-refactor';
import TinyLayer, { TinyLayerConfig } from '../tiny-layer';
import * as EventParser from './event';

const GEOM_MAP = {
  area: 'area',
  line: 'line',
};

export interface TinyAreaLayerConfig extends TinyLayerConfig {}

export default class TinyAreaLayer extends TinyLayer {
  public line: any;
  public area: any;
  public type: string = 'tinyArea';

  protected geometryParser(dim: string, type: string): string {
    return GEOM_MAP[type];
  }

  protected addGeometry() {
    this.area = getGeom('area', 'mini', {
      plot: this,
    });
    this.setConfig('element', this.area);

    this.line = getGeom('line', 'mini', {
      plot: this,
    });
    this.setConfig('element', this.line);
  }

  protected parserEvents(eventParser) {
    super.parserEvents(EventParser);
  }
}

registerPlotType('tinyArea', TinyAreaLayer);
