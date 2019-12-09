import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import { getGeom } from '../../geoms/factory';
import TinyLayer, { TinyLayerConfig, TinyViewConfig } from '../tiny-layer';
import * as EventParser from './event';

const WIDTH_RATIO = 0.6;

const G2_GEOM_MAP = {
  column: 'interval',
};

const PLOT_GEOM_MAP = {
  interval: 'column',
};

export type TinyColumnViewConfig = TinyViewConfig;
export interface TinyColumnLayerConfig extends TinyColumnViewConfig, LayerConfig {}

export default class TinyColumnLayer extends TinyLayer<TinyColumnLayerConfig> {
  public line: any;
  public area: any;
  public type: string = 'tinyColumn';

  public init() {
    this.processProps();
    super.init();
  }

  protected geometryParser(dim: string, type: string): string {
    if (dim === 'g2') {
      return G2_GEOM_MAP[type];
    }
    return PLOT_GEOM_MAP[type];
  }

  protected addGeometry() {
    const props = this.options;
    const column = getGeom('interval', 'main', {
      positionFields: [props.xField, props.yField],
      plot: this,
    });
    this.setConfig('element', column);
  }

  protected parseEvents(eventParser) {
    super.parseEvents(EventParser);
  }

  private processProps() {
    let props = this.options;
    const cfg = {
      padding: [0, 0, 0, 0],
      columnSize: this.getSize(),
    } as any;
    props = _.mix(props, cfg);
  }

  private getSize() {
    const props = this.options;
    const columnNumber = this.getColumnNum(props.data, props.xField);
    const width = this.width;
    return (width / columnNumber) * WIDTH_RATIO;
  }

  private getColumnNum(data, field) {
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

registerPlotType('tinyColumn', TinyColumnLayer);
