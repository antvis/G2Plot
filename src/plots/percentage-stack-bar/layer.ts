import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import StackBar, { StackBarViewConfig } from '../stack-bar/layer';
import { DataItem } from '../../interface/config';
import { transformDataPercentage } from '../../util/data';

export interface PercentageStackBarViewConfig extends StackBarViewConfig {}
export interface PercentageStackBarLayerConfig extends PercentageStackBarViewConfig, LayerConfig {}

export default class PercentageStackBarLayer extends StackBar<PercentageStackBarLayerConfig> {
  public static getDefaultOptions(): any {
    return _.deepMix({}, super.getDefaultOptions(), {
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
  public type: string = 'percentageStackBar';

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

registerPlotType('percentageStackBar', PercentageStackBarLayer);
