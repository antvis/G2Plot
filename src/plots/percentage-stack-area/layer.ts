import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import StackArea, { StackAreaViewConfig } from '../stack-area/layer';
import { DataItem } from '../../interface/config';
import { transformDataPercentage } from '../../util/data';

export interface PercentageStackAreaViewConfig extends StackAreaViewConfig {}
export interface PercentageStackAreaLayerConfig extends PercentageStackAreaViewConfig, LayerConfig {}

export default class PercentageStackAreaLayer extends StackArea<PercentageStackAreaLayerConfig> {
  public static getDefaultOptions(): any {
    return _.deepMix({}, super.getDefaultOptions(), {
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
      minLimit: 0,
      maxLimit: 1,
      formatter: (v) => {
        const formattedValue = (v * 100).toFixed(1);
        return `${formattedValue}%`;
      },
    };
    this.options.meta = metaConfig;
    super.scale();
  }
}

registerPlotType('percentageStackArea', PercentageStackAreaLayer);
