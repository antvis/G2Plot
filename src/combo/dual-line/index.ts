import { deepMix } from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import DualLineLayer, { DualLineViewConfig } from './layer';

export interface DualLineConfig extends DualLineViewConfig, PlotConfig {
  /** 用户自定义 meta */
  customMeta?: boolean;
}

export default class DualLine extends BasePlot<DualLineConfig> {
  public static getDefaultOptions: typeof DualLineLayer.getDefaultOptions = DualLineLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = deepMix({}, props);
    layerProps.type = 'dualLine';
    super.createLayers(layerProps);
  }
}
