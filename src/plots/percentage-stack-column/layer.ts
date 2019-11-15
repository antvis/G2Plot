import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import StackColumn, { StackColumnViewConfig } from '../stack-column/layer';

export interface PercentageStackColumnViewConfig extends StackColumnViewConfig {}
export interface PercentageStackColumnLayerConfig extends PercentageStackColumnViewConfig, LayerConfig {}

export default class PercentageStackColumnLayer extends StackColumn<PercentageStackColumnLayerConfig> {
  public static getDefaultOptions(): any {
    return _.deepMix({}, super.getDefaultOptions(), {
      label: {
        visible: true,
        position: 'middle',
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

  protected processData(originData?: object[]) {
    const props = this.options;
    const { xField, yField } = props;
    // 百分比堆叠面积图需要对原始数据进行预处理
    // step1: 以xField为单位，对yField做聚合
    const plotData = [];
    const sum = {};
    _.each(originData, (d) => {
      const sumField = d[xField];
      if (!_.has(sum, sumField)) {
        sum[sumField] = 0;
      }
      sum[sumField] += d[yField];
    });
    // step2: 获取每一条数据yField的值在对应xField数值总和的占比
    _.each(originData, (d) => {
      const total = sum[d[xField]];
      const d_copy = _.clone(d);
      d_copy[yField] = d[yField] / total;
      d_copy._origin = d;
      d_copy.total = total;
      plotData.push(d_copy);
    });

    return plotData;
  }

  protected scale() {
    const metaConfig = {};
    const { yField } = this.options;
    metaConfig[yField] = {
      tickCount: 6,
      alias: `${yField} (%)`,
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
