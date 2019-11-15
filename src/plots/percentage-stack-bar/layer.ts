import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import StackBar, { StackBarViewConfig } from '../stack-bar/layer';

export interface PercentageStackBarViewConfig extends StackBarViewConfig {}
export interface PercentageStackBarLayerConfig extends PercentageStackBarViewConfig, LayerConfig {}

export default class PercentageStackBarLayer extends StackBar<PercentageStackBarLayerConfig> {
  public static getDefaultOptions(): any {
    return _.deepMix({}, super.getDefaultOptions(), {
      xAxis: {
        visible: true,
        tick: {
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

  protected processData(originData?: object[]) {
    const props = this.options;
    const { xField, yField } = props;
    // 百分比堆叠条形图需要对原始数据进行预处理
    // step1: 以yField为单位，对xField做聚合
    const plotData = [];
    const sum = {};
    _.each(originData, (d) => {
      const sumField = d[yField];
      if (!_.has(sum, sumField)) {
        sum[sumField] = 0;
      }
      sum[sumField] += d[xField];
    });
    // step2: 获取每一条数据yField的值在对应xField数值总和的占比
    _.each(originData, (d) => {
      const total = sum[d[yField]];
      const d_copy = _.clone(d);
      d_copy[xField] = d[xField] / total;
      d_copy._origin = d;
      d_copy.total = total;
      plotData.push(d_copy);
    });

    return plotData;
  }

  protected scale() {
    const metaConfig = {};
    const { xField } = this.options;
    metaConfig[xField] = {
      tickCount: 6,
      alias: `${xField} (%)`,
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
