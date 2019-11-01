import * as _ from '@antv/util';
import StackBar, { StackBarLayerConfig } from '../stack-bar/layer';

export interface PercentageStackBarLayerConfig extends StackBarLayerConfig {}

export default class PercentageStackBarLayer extends StackBar {
  protected setType() {
    this.type = 'percentageStackBar';
  }

  protected processData(originData?: object[]) {
    const props = this.initialProps;
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
}
