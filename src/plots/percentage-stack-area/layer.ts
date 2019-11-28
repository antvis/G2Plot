import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import StackArea, { StackAreaViewConfig } from '../stack-area/layer';

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
      sum[sumField] += Number.parseFloat(d[yField]);
    });
    // step2: 获取每一条数据stackField的值在对应xField数值总和的占比
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
    metaConfig[this.options.yField] = {
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

registerPlotType('percentageStackArea', PercentageStackAreaLayer);
