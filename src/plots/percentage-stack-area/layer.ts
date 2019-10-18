import * as _ from '@antv/util';
import StackArea, { StackAreaLayerConfig } from '../stack-area/StackAreaLayer';

export interface PercentageStackAreaLayerConfig extends StackAreaLayerConfig {}

export default class PercentageStackAreaLayer extends StackArea {
  protected setType() {
    this.type = 'percentageStackArea';
  }

  protected processData() {
    const props = this.initialProps;
    const { xField, yField, stackField } = props;
    this.originData = props.data;
    // this.plotData = props.data;
    // 百分比堆叠面积图需要对原始数据进行预处理
    // step1: 以xField为单位，对yField做聚合
    const plotData = [];
    const sum = {};
    _.each(this.originData, (d) => {
      const sumField = d[xField];
      if (!_.has(sum, sumField)) {
        sum[sumField] = 0;
      }
      sum[sumField] += d[yField];
    });
    // step2: 获取每一条数据stackField的值在对应xField数值总和的占比
    _.each(this.originData, (d) => {
      const total = sum[d[xField]];
      const d_copy = _.clone(d);
      d_copy[yField] = d[yField] / total;
      d_copy._origin = d;
      d_copy.total = total;
      plotData.push(d_copy);
    });
    this.plotData = plotData;
  }
}
