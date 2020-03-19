import { deepMix, uniqueId } from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import GaugeLayer from '../gauge/layer';
import { GaugeViewConfig } from '../gauge/options';
import { getOptions } from '../gauge/geometry/shape/options';
import { getGlobalTheme } from '../../theme';

export type MeterGaugeViewConfig = GaugeViewConfig;

export interface MeterGaugeLayerConfig extends MeterGaugeViewConfig, LayerConfig {}

export default class MeterGaugeLayer<T extends MeterGaugeLayerConfig = MeterGaugeLayerConfig> extends GaugeLayer<T> {
  public static getDefaultOptions() {
    return deepMix({}, super.getDefaultOptions(), {});
  }

  public type: string = 'meterGauge';

  protected getCustomStyle() {
    const { theme, styleMix } = this.options;
    const colors = styleMix.colors || getGlobalTheme().colors;
    return getOptions('meter', theme, colors);
  }
}

registerPlotType('meterGauge', MeterGaugeLayer);
