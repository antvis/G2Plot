import { clone, sortBy, valuesOfKey, getRange, each, hasKey } from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import { sturges } from '../../util/math';
import Column from '../column/layer';
import { ColumnViewConfig } from '../column/interface';
import { DataItem } from '../../interface/config';

export interface HistogramViewConfig extends ColumnViewConfig {
  binField: string;
  binWidth?: number;
  binNumber?: number;
}

export interface HistogramLayerConfig extends HistogramViewConfig, LayerConfig {}

export default class HistogramLayer extends Column<HistogramLayerConfig> {
  public type: string = 'histogram';

  public init() {
    this.options.xField = 'range';
    this.options.yField = 'count';
    super.init();
  }

  protected processData(originData?: DataItem[]) {
    const { binField, binWidth, binNumber } = this.options;
    const originData_copy = clone(originData);
    // 根据binField value对源数据进行排序
    sortBy(originData_copy, binField);
    // 获取源数据binField values的range
    const values = valuesOfKey(originData_copy, binField);
    const range = getRange(values);
    const rangeWidth = range.max - range.min;
    // 计算分箱，直方图分箱的计算基于binWidth，如配置了binNumber则将其转为binWidth进行计算
    let _binWidth = binWidth;
    if (!binWidth && binNumber) {
      _binWidth = rangeWidth / binNumber;
    }
    // 当binWidth和binNumber都没有指定的情况，采用Sturges formula自动生成binWidth
    if (!binWidth && !binNumber) {
      const _defaultBinNumber = sturges(values);
      _binWidth = rangeWidth / _defaultBinNumber;
    }
    const bins = {};
    each(originData_copy, (data) => {
      const value = data[binField];
      const bin = this.getBin(value, _binWidth);
      const binName = `${bin[0]}-${bin[1]}`;
      if (!hasKey(bins, binName)) {
        bins[binName] = { name: binName, range: bin, count: 0, data: [] };
      }
      bins[binName].data.push(data);
      bins[binName].count += 1;
    });
    // 将分箱数据转换为plotData
    const plotData = [];
    each(bins, (bin) => {
      plotData.push(bin);
    });
    return plotData;
  }

  protected scale() {
    super.scale();
    // fixme: 类型定义
    const range = this.config.scales.range as any;
    range.nice = false;
    range.type = 'linear';
  }

  private getBin(value, binWidth) {
    const index = Math.floor(value / binWidth);
    return [binWidth * index, binWidth * (index + 1)];
  }
}

registerPlotType('histogram', HistogramLayer);
