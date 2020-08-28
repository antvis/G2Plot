import { Plot } from '../../core/plot';
// registered shapes
import { adaptor } from './adaptor';
import { Adaptor } from '../../core/adaptor';
import { HeatmapOptions } from './types';

import './geometry/shape/liquid';

export class Liquid extends Plot<HeatmapOptions> {
  public type: string = 'liquid';
  protected getSchemaAdaptor(): Adaptor<HeatmapOptions> {
    return adaptor;
  }
}
