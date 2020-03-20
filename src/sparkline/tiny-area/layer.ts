import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import { getGeom } from '../../geoms/factory';
import TinyLayer, { TinyViewConfig } from '../tiny-layer';
import * as EventParser from './event';
import { IStyle } from '../../interface/config';

const GEOM_MAP = {
  area: 'area',
  line: 'line',
};

export interface TinyAreaViewConfig extends TinyViewConfig {
  areaStyle?: IStyle;
  lineStyle?: IStyle;
  smooth?: boolean;
}

export interface TinyAreaLayerConfig extends TinyAreaViewConfig, LayerConfig {}

export default class TinyAreaLayer extends TinyLayer<TinyAreaLayerConfig> {
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
    this.setConfig('geometry', this.area);

    this.line = getGeom('line', 'mini', {
      plot: this,
    });
    this.setConfig('geometry', this.line);
  }

  protected parseEvents() {
    super.parseEvents(EventParser);
  }
}

registerPlotType('tinyArea', TinyAreaLayer);
