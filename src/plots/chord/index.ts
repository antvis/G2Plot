import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { adaptor } from './adaptor';
import { DEFAULT_OPTIONS } from './constant';
import { ChordOptions } from './types';

export type { ChordOptions };

/**
 *  弦图 Chord
 */
export class Chord extends Plot<ChordOptions> {
  /**
   * 获取 面积图 默认配置项
   * 供外部使用
   */
  static getDefaultOptions(): Partial<ChordOptions> {
    return DEFAULT_OPTIONS;
  }
  /** 图表类型 */
  public type: string = 'chord';

  protected getDefaultOptions() {
    return Chord.getDefaultOptions();
  }

  /**
   * 获取适配器
   */
  protected getSchemaAdaptor(): Adaptor<ChordOptions> {
    return adaptor;
  }
}
