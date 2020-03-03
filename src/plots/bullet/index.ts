import * as _ from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import BulletLayer, { BulletViewConfig } from './layer';

export interface BulletConfig extends BulletViewConfig, PlotConfig {}

export default class Bullet extends BasePlot<BulletConfig> {
  public static getDefaultOptions: typeof BulletLayer.getDefaultOptions = BulletLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'bullet';
    super.createLayers(layerProps);
  }
}
