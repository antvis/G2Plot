/**
 * Create By Bruce Too
 * On 2020-02-17
 */
import * as _ from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import RoseLayer, { RoseViewConfig } from './layer';

export interface RoseConfig extends RoseViewConfig, PlotConfig {}

// TODO label的优化，可能要重新参考 https://github.com/antvis/G2Plot/blob/master/src/plots/rose/component/label/rose-label.ts
export default class Rose extends BasePlot<RoseConfig> {
  public static getDefaultOptions: typeof RoseLayer.getDefaultOptions = RoseLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'rose';
    super.createLayers(layerProps);
  }
}
