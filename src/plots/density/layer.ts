import * as _ from '@antv/util';
import Line, { LineLayerConfig } from '../line/LineLayer';

export interface DensityLayerConfig extends LineLayerConfig {
  binField: string;
  binWidth?: number;
  kernel?: 'uniform' | 'triangle' | 'epanechnikov' | 'quartic' | 'triweight' | 'gaussian' | 'cosinus';
}

export default class DensityLayer extends Line<DensityLayerConfig> {
  protected setType() {
    this.type = 'density';
  }

  protected processData(originData?: object[]) {
    return originData;
  }
}
