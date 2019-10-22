import * as _ from '@antv/util';
import Line, { LineLayerConfig } from '../line/LineLayer';

export interface DensityLayerConfig extends LineLayerConfig {
  binField: string;
  binWidth?: number;
  kernel?: 'uniform' | 'triangle' | 'epanechnikov' | 'quartic' | 'triweight' | 'gaussian' | 'cosinus';
}

function kernel_uniform(dist: number) {
  return Math.abs(dist) <= 1 ? 0.5 : 0;
}

function kernel_triangle(dist: number) {
  return Math.abs(dist) <= 1 ? 1 - Math.abs(dist) : 0;
}

function kernel_epanechnikov(dist: number) {
  return Math.abs(dist) <= 1 ? 0.75 * (1 - dist * dist) : 0;
}

function kernel_quartic(dist: number) {
  const v = 1 - dist * dist;
  return Math.abs(dist) <= 1 ? (15 / 16) * v * v : 0;
}

function kernel_triweight(dist: number) {
  const v = 1 - dist * dist;
  return Math.abs(dist) <= 1 ? (15 / 16) * Math.pow(v, 3) : 0;
}

function kernel_gaussian(dist: number) {
  return (1 / Math.sqrt(Math.PI * 2)) * Math.exp(-0.5 * Math.pow(dist, 2));
}

function kernel_cosinus(dist: number, value: number) {
  const v = (Math.PI / 4) * Math.cos(0.5 * Math.PI * dist);
  return Math.abs(dist) <= 1 ? v : 0;
}

export default class DensityLayer extends Line<DensityLayerConfig> {
  protected setType() {
    this.type = 'density';
  }

  protected processData(originData?: object[]) {
    return originData;
  }
}
