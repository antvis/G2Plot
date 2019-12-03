import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import StackColumn, { StackColumnViewConfig } from '../stack-column/layer';
import { transformDataPercentage } from '../../util/data';
import { DataItem } from '../../interface/config';

export interface PercentageStackColumnViewConfig extends StackColumnViewConfig {}
export interface PercentageStackColumnLayerConfig extends PercentageStackColumnViewConfig, LayerConfig {}

export default class PercentageStackColumnLayer extends StackColumn<PercentageStackColumnLayerConfig> {
  public static getDefaultOptions(): any {
    return _.deepMix({}, super.getDefaultOptions(), {
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
  public type: string = 'percentageStackColumn';

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

registerPlotType('percentageStackColumn', PercentageStackColumnLayer);
