import { Plot } from '../../core/plot';
import { LineOptions } from './types';
import { LineAdaptor } from './adaptor';

export class Line extends Plot<LineOptions> {
  public type: string = 'line';

  protected getSchemaAdaptator(): LineAdaptor {
    return;
  }
}
