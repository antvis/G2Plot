import { Plot } from '../../base';
import type { Adaptor } from '../../types';
import { adaptor } from './adaptor';
import { BidirectionalBarOptions } from './type';

export type { BidirectionalBarOptions };

export class BidirectionalBar extends Plot<BidirectionalBarOptions> {
  /** 图表类型 */
  public type = 'BidirectionalBar';

  static getDefaultOptions(): Partial<BidirectionalBarOptions> {
    return {
      type: 'spaceFlex',
      coordinate: { transform: [{ type: 'transpose' }] },
      scale: {
        y: { nice: true },
      },
      direction: 'row',
      layout: 'horizontal',
      legend: false,
      axis: {
        y: {
          title: false,
        },
        x: { title: false, label: false },
      },
      children: [{ type: 'interval' }, { type: 'interval' }],
    };
  }

  protected getDefaultOptions() {
    return BidirectionalBar.getDefaultOptions();
  }

  protected getSchemaAdaptor(): (params: Adaptor<BidirectionalBarOptions>) => void {
    return adaptor;
  }
}
