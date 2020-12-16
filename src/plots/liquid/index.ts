import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { LiquidOptions } from './types';
import { adaptor } from './adaptor';
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
      radius: 0.9,
      statistic: {
        title: false,
        content: {
          formatter: ({ percent }) => `${(percent * 100).toFixed(2)}%`,
          style: {
            opacity: 0.75,
            fontSize: '30px',
            textAlign: 'center',
          },
        },
      },
      outline: {
        border: 2,
        distance: 0,
      },
      wave: {
        count: 3,
        length: 192,
      },
    };
  }

  /**
   * 更新数据
   * @param percent
   */
  public changeData(percent: number) {
    this.update({
      percent,
    });
  }

  /**
   * 获取适配器
   */
  protected getSchemaAdaptor(): Adaptor<LiquidOptions> {
    return adaptor;
  }
}
