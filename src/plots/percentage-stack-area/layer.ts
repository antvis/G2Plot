import { deepMix } from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import StackedArea, { StackedAreaViewConfig } from '../stacked-area/layer';
import { DataItem } from '../../interface/config';
import { transformDataPercentage } from '../../util/data';

export type PercentageStackAreaViewConfig = StackedAreaViewConfig;
export interface PercentageStackAreaLayerConfig extends PercentageStackAreaViewConfig, LayerConfig {}

export default class PercentageStackAreaLayer extends StackedArea<PercentageStackAreaLayerConfig> {
  public static getDefaultOptions(): any {
    return deepMix({}, super.getDefaultOptions(), {
      yAxis: {
        visible: true,
        label: {
          visible: true,
          formatter: (v) => {
            const reg = /%/gi;
            return v.replace(reg, '');
          },
        },
      },
    });
  }
  public type: string = 'percentageStackArea';

  protected processData(originData?: DataItem[]) {
    const { xField, yField } = this.options;

    return transformDataPercentage(originData, xField, [yField]);
  }

  protected scale() {
    const metaConfig = {};
    const { yField } = this.options;
    metaConfig[this.options.yField] = {
      tickCount: 6,
      alias: `${yField} (%)`,
      min: 0,
      max: 1,
      formatter: (v) => {
        const formattedValue = (v * 100).toFixed(1);
        return `${formattedValue}%`;
      },
    };
    this.options.meta = deepMix({}, metaConfig, this.options.meta);
    super.scale();
  }
}

registerPlotType('percentageStackArea', PercentageStackAreaLayer);
