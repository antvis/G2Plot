import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import { getGeom } from '../../geoms/factory';
import TinyLayer, { TinyViewConfig } from '../tiny-layer';
import * as EventParser from './event';

const GEOM_MAP = {
  line: 'line',
};

export interface TinyLineViewConfig extends TinyViewConfig {}
export interface TinyLineLayerConfig extends TinyLineViewConfig, LayerConfig {}

export default class TinyLineLayer extends TinyLayer<TinyLineLayerConfig> {
  public line: any;
  public type: string = 'tinyLine';

  protected geometryParser(dim: string, type: string): string {
    return GEOM_MAP[type];
  }

  protected addGeometry() {
    this.line = getGeom('line', 'mini', {
      plot: this,
    });
    this.setConfig('element', this.line);
  }

  protected parseEvents(eventParser) {
    super.parseEvents(EventParser);
  }
}

registerPlotType('tinyLine', TinyLineLayer);
