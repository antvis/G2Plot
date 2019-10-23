import { getScale } from '@antv/scale';
import * as _ from '@antv/util';
import Line, { LineLayerConfig } from '../line/LineLayer';

export interface DensityLayerConfig extends LineLayerConfig {
  binField: string;
  binWidth?: number;
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

export default class DensityLayer extends Line<DensityLayerConfig> {
  protected setType() {
    this.type = 'density';
  }

  protected beforeInit() {
    super.beforeInit();
    this.initialProps.xField = 'value';
    this.initialProps.yField = 'density';
    this.initialProps.smooth = true;
  }

  protected processData(originData?: object[]) {
    const { binField, binWidth, kernel } = this.initialProps;
    const _kernel = kernel ? kernel : 'epanechnikov';
    const kernelFunc = kernels[_kernel];
    const originData_copy = _.clone(originData);
    _.sortBy(originData_copy, binField);
    // 根据binWidth获取samples
    const values = _.valuesOfKey(originData_copy, binField);
    const range = _.getRange(values);
    const binNumber = Math.floor((range.max - range.min) / binWidth);
    const LinearScale = getScale('linear');
    const scale = new LinearScale({
      min: range.min,
      max: range.max,
      tickCount: binNumber,
      nice: false,
    });
    const samples = scale.getTicks();
    // 计算KDE
    const densities = [];
    _.each(samples, (s) => {
      const density = this._kernelDensityEstimator(binWidth, kernelFunc, s, values);
      densities.push({ value: s.text, density });
    });

    return densities;
  }

  private _kernelDensityEstimator(binWidth, kernelFunc, x, values) {
    let sum = 0;
    _.each(values, (v) => {
      const dist = (x.tickValue - v) / binWidth;
      sum += kernelFunc(dist);
    });
    return sum === 0 ? 0 : sum / values.length;
  }
}
