import { DataPointType } from '@antv/g2/lib/interface';
import { getScale } from '@antv/scale';
import * as _ from '@antv/util';
import { sturges } from '../../util/math';
import Area, { AreaLayerConfig } from '../area/AreaLayer';

export interface DensityLayerConfig extends AreaLayerConfig {
  binField: string;
  binWidth?: number;
  binNumber?: number;
  kernel?: 'uniform' | 'triangle' | 'epanechnikov' | 'quartic' | 'triweight' | 'gaussian' | 'cosinus';
}

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

export default class DensityLayer extends Area<DensityLayerConfig> {
  protected setType() {
    this.type = 'density';
  }

  protected beforeInit() {
    super.beforeInit();
    const originXAxisConfig = this.initialProps.xAxis ? _.clone(this.initialProps.xAxis) : {};
    this.initialProps.xField = 'value';
    this.initialProps.yField = 'density';
    this.initialProps.xAxis = _.deepMix({}, originXAxisConfig, { type: 'linear' });
    this.initialProps.smooth = true;
  }

  protected processData(originData?: object[]) {
    const { binField, binWidth, binNumber, kernel } = this.initialProps;
    const _kernel = kernel ? kernel : 'epanechnikov';
    const kernelFunc = kernels[_kernel];
    const originDataCopy = _.clone(originData);
    _.sortBy(originDataCopy, binField);
    // 计算分箱，直方图分箱的计算基于binWidth，如配置了binNumber则将其转为binWidth进行计算
    const values = _.valuesOfKey(originDataCopy, binField);
    const range = _.getRange(values);
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
    _.each(samples, (s) => {
      const density = this.kernelDensityEstimator(_binWidth, kernelFunc, s, values);
      densities.push({ value: s.text, density });
    });

    return densities;
  }

  private kernelDensityEstimator(
    binWidth: number,
    kernelFunc: (dist: number) => number,
    x: DataPointType,
    values: number[]
  ) {
    let sum = 0;
    _.each(values, (v) => {
      const dist = (x.tickValue - v) / binWidth;
      sum += kernelFunc(dist);
    });
    return values.length === 0 ? 0 : sum / values.length;
  }
}
