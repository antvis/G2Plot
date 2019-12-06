import Plot, { PlotConfig } from '../base/plot';
import { deepMix } from '@antv/util';

export interface ComboPlotConfig extends PlotConfig {
  layers: ViewLayer[];
}

export default class ComboPlot<T extends ComboPlotConfig = ComboPlotConfig> extends Plot<T> {
  protected globalOptions: any;

  public getDefaultOptions() {
    return {};
  }

  protected getGlobalOptions(props) {
    return {
      xAxis: props.xAxis,
      yAxis: props.yAxis,
    };
  }

  protected createLayers(props: T & { layers?: any }) {
    this.globalOptions = deepMix({}, this.getDefaultOptions(), this.getGlobalOptions(props));
  }
}
