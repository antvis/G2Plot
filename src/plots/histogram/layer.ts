import * as _ from '@antv/util';
import Column, { ColumnLayerConfig } from '../column/ColumnLayer';

export interface HistogramLayerConfig extends ColumnLayerConfig {
  binField: string;
  binWidth?: number;
  binNumber?: number;
}

export default class HistogramLayer extends Column<HistogramLayerConfig> {
  protected setType() {
    this.type = 'histogram';
  }

  protected processData(originData?: object[]) {
    const { binField, binWidth, binNumber } = this.initialProps;
    const originData_copy = _.clone(originData);
    // 根据binField value对源数据进行排序
    _.sortBy(originData_copy, binField);
    // 获取源数据binField values的range
    const values = _.valuesOfKey(originData_copy, binField);
    const range = _.getRange(values);
    const rangeWidth = range.max - range.min;
    // 计算分箱，直方图分箱的计算基于binWidth，如配置了binNumber则将其转为binWidth进行计算
    // todo: 当binWidth和binNumber都没有指定的情况，采用Sturges'_formula自动生成bindWidth
    let _binWidth = binWidth;
    if (!binWidth && binNumber) {
      _binWidth = rangeWidth / binNumber;
    }
    const bins = {};
    _.each(originData_copy, (data) => {
      const value = data[binField];
      const bin = this.getBin(value, _binWidth, range.min);
      const binName = `${bin[0]}-${bin[1]}`;
      if (!_.hasKey(bins, binName)) {
        bins[binName] = { name: binName, range: bin, count: 0, data: [] };
      }
      bins[binName].data.push(data);
      bins[binName].count += 1;
    });
    // 将分箱数据转换为plotData
    const plotData = [];
    _.each(bins, (bin) => {
      plotData.push(bin);
    });
    this.initialProps.xField = 'range';
    this.initialProps.yField = 'count';
    return plotData;
  }

  private getBin(value, binWidth, min) {
    const dist = value - min;
    const index = Math.floor(dist / binWidth);
    return [min + binWidth * index, min + binWidth * (index + 1)];
  }
}
