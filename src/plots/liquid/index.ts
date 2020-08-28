import { Plot } from '../../core/plot';
import { LiquidOptions } from './types';
import { adaptor } from './adaptor';
import { Adaptor } from '../../core/adaptor';
// register liquid shape
import './shapes/liquid';

export { LiquidOptions };

/**
 * 传说中的水波图
 */
export class Liquid extends Plot<LiquidOptions> {
  /** 图表类型 */
  public type: string = 'liquid';

  protected getDefaultOptions(): Partial<LiquidOptions> {
    return {
      color: '#6a99f9',
      statistic: {
        formatter: (v: number) => `${(v * 100).toFixed(2)}%`,
        style: {
          opacity: 0.75,
          fontSize: 30,
          textAlign: 'center',
        },
      },
    };
  }

  /**
   * 获取适配器
   */
  protected getSchemaAdaptor(): Adaptor<LiquidOptions> {
    return adaptor;
  }
}
