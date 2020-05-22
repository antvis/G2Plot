import { deepMix } from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import StackedColumn, { StackedColumnViewConfig } from '../stacked-column/layer';
import { transformDataPercentage } from '../../util/data';
import { DataItem } from '../../interface/config';

export type PercentStackedColumnViewConfig = StackedColumnViewConfig;
export interface PercentStackedColumnLayerConfig extends PercentStackedColumnViewConfig, LayerConfig {}

export default class PercentStackedColumnLayer extends StackedColumn<PercentStackedColumnLayerConfig> {
  public static getDefaultOptions(): any {
    return deepMix({}, super.getDefaultOptions(), {
      label: {
        visible: true,
        position: 'middle',
        offset: 0,
      },
      yAxis: {
        visible: true,
        tick: {
          visible: false,
        },
        grid: {
          visible: false,
        },
        title: {
          visible: true,
        },
        label: {
          visible: false,
        },
      },
    });
  }
  public type: string = 'percentStackedColumn';

  protected processData(originData?: DataItem[]) {
    const { xField, yField } = this.options;
    return transformDataPercentage(originData || [], xField, [yField]);
  }

  protected scale() {
    const metaConfig = {};
    const { yField } = this.options;
    metaConfig[yField] = {
      tickCount: 6,
      alias: `${yField} (%)`,
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

registerPlotType('percentStackedColumn', PercentStackedColumnLayer);
