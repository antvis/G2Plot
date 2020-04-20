import { getScale } from '@antv/scale';
import { clone, deepMix, sortBy, valuesOfKey, getRange, each } from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import { sturges } from '../../util/math';
import Area from '../area/layer';
import { AreaViewConfig } from '../area/interface';
import { DataItem } from '../../interface/config';
import { LooseMap } from '../../interface/types';

export interface DensityViewConfig extends AreaViewConfig {
  binField: string;
  binWidth?: number;
  binNumber?: number;
  kernel?: 'uniform' | 'triangle' | 'epanechnikov' | 'quartic' | 'triweight' | 'gaussian' | 'cosinus';
}

export interface DensityLayerConfig extends DensityViewConfig, LayerConfig {}

const kernels = {
  epanechnikov: (dist: number) => {
    return Math.abs(dist) <= 1 ? 0.75 * (1 - dist * dist) : 0;
  },
  gaussian: (dist: number) => {
    return (1 / Math.sqrt(Math.PI * 2)) * Math.exp(-0.5 * Math.pow(dist, 2));
  },
  uniform: (dist: number) => {
    return Math.abs(dist) <= 1 ? 0.5 : 0;
  },
  triangle: (dist: number) => {
    return Math.abs(dist) <= 1 ? 1 - Math.abs(dist) : 0;
  },
  quartic: (dist: number) => {
    const v = 1 - dist * dist;
    return Math.abs(dist) <= 1 ? (15 / 16) * v * v : 0;
  },
  triweight: (dist: number) => {
    const v = 1 - dist * dist;
    return Math.abs(dist) <= 1 ? (15 / 16) * Math.pow(v, 3) : 0;
  },
  cosinus: (dist: number) => {
    const v = (Math.PI / 4) * Math.cos(0.5 * Math.PI * dist);
    return Math.abs(dist) <= 1 ? v : 0;
  },
};

export default class DensityLayer<T extends DensityLayerConfig = DensityLayerConfig> extends Area<T> {
  public type: string = 'density';

  public init() {
    const originXAxisConfig = this.options.xAxis ? clone(this.options.xAxis) : {};
    this.options.xField = 'value';
    this.options.yField = 'density';
    this.options.xAxis = deepMix({}, originXAxisConfig, { type: 'linear' });
    this.options.smooth = true;
    super.init();
  }

  protected processData(originData?: DataItem[]) {
    const { binField, binWidth, binNumber, kernel } = this.options;
    const _kernel = kernel ? kernel : 'epanechnikov';
    const kernelFunc = kernels[_kernel];
    const originDataCopy = clone(originData);
    sortBy(originDataCopy, binField);
    // 计算分箱，直方图分箱的计算基于binWidth，如配置了binNumber则将其转为binWidth进行计算
    const values = valuesOfKey(originDataCopy, binField);
    const range = getRange(values);
    const rangeWidth = range.max - range.min;
    let _binNumber = binNumber;
    let _binWidth = binWidth;
    if (!binNumber && binWidth) {
      _binNumber = Math.floor(rangeWidth / binWidth);
    }
    if (!binWidth && binNumber) {
      _binWidth = rangeWidth / binNumber;
    }
    // 当binWidth和binNumber都没有指定的情况，采用Sturges formula自动生成binWidth
    if (!binNumber && !binWidth) {
      _binNumber = sturges(values);
      _binWidth = rangeWidth / binNumber;
    }
    // 根据binNumber获取samples
    const LinearScale = getScale('linear');
    const scale = new LinearScale({
      min: range.min,
      max: range.max,
      tickCount: _binNumber,
      nice: false,
    });
    const samples = scale.getTicks();
    // 计算KDE
    const densities = [];
    each(samples, (s) => {
      const density = this.kernelDensityEstimator(_binWidth, kernelFunc, s, values);
      densities.push({ value: s.text, density });
    });

    return densities;
  }

  private kernelDensityEstimator(
    binWidth: number,
    kernelFunc: (dist: number) => number,
    x: LooseMap,
    values: number[]
  ) {
    let sum = 0;
    each(values, (v) => {
      const dist = (x.tickValue - v) / binWidth;
      sum += kernelFunc(dist);
    });
    return values.length === 0 ? 0 : sum / values.length;
  }
}

registerPlotType('density', DensityLayer);
