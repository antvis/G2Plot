import { deepMix } from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import StackedArea from '../stacked-area/layer';
import { StackedAreaViewConfig } from '../stacked-area/interface';
import { DataItem } from '../../interface/config';
import { transformDataPercentage } from '../../util/data';

export type PercentStackedAreaViewConfig = StackedAreaViewConfig;
export interface PercentStackedAreaLayerConfig extends PercentStackedAreaViewConfig, LayerConfig {}

export default class PercentStackedAreaLayer extends StackedArea<PercentStackedAreaLayerConfig> {
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
  public type: string = 'percentStackedArea';
  public baseType: string = 'stackedArea';

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

registerPlotType('percentStackedArea', PercentStackedAreaLayer);
