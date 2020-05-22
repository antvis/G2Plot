import { deepMix } from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import StackedBar, { StackedBarViewConfig } from '../stacked-bar/layer';
import { DataItem } from '../../interface/config';
import { transformDataPercentage } from '../../util/data';

export type PercentStackedBarViewConfig = StackedBarViewConfig;
export interface PercentStackedBarLayerConfig extends PercentStackedBarViewConfig, LayerConfig {}

export default class PercentStackedBarLayer extends StackedBar<PercentStackedBarLayerConfig> {
  public static getDefaultOptions(): any {
    return deepMix({}, super.getDefaultOptions(), {
      xAxis: {
        visible: true,
        tickLine: {
          visible: false,
        },
        grid: {
          visible: false,
        },
        title: {
          visible: true,
          formatter: (v) => `${v} (%)`,
        },
        label: {
          visible: false,
          formatter: (v) => {
            const reg = /%/gi;
            return v.replace(reg, '');
          },
        },
      },
    });
  }
  public type: string = 'percentStackedBar';

  protected processData(originData?: DataItem[]) {
    const { xField, yField } = this.options;
    const processData = super.processData(originData);

    return transformDataPercentage(processData, yField, [xField]);
  }

  protected scale() {
    const metaConfig = {};
    const { xField } = this.options;
    metaConfig[xField] = {
      tickCount: 6,
      alias: `${xField} (%)`,
      min: 0,
      max: 1,
      formatter: (v) => {
        const formattedValue = (v * 100).toFixed(1);
        return `${formattedValue}%`;
      },
    };
    this.options.meta = deepMix({}, this.options.meta, metaConfig);
    super.scale();
  }
}

registerPlotType('percentStackedBar', PercentStackedBarLayer);
