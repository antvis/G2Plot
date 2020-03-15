import Plot, { PlotConfig } from '../base/plot';
import { deepMix } from '@antv/util';
import { ViewLayerConfig } from '../base/view-layer';

interface ComboPlotLayerConfig extends ViewLayerConfig {
  type: string;
}

export interface ComboPlotConfig extends PlotConfig {
  layers: ComboPlotLayerConfig[];
}

export default class ComboPlot<T extends ComboPlotConfig = ComboPlotConfig> extends Plot<T> {
  public options: any;
  protected globalOptions: any;

  public getDefaultOptions() {
    return {};
  }

  protected getGlobalOptions(props) {
    return {
      xAxis: props.xAxis,
      yAxis: props.yAxis,
      theme: props.theme,
      legend: props.legend,
    };
  }

  protected createComboLayers() {
    this.globalOptions = deepMix({}, this.getDefaultOptions(), this.getGlobalOptions(this.options));
  }
}
