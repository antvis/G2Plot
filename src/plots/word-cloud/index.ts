import { Plot } from '../../core/plot';
import { WordCloudOptions } from './types';
import { adaptor } from './adaptor';
import { Adaptor } from '../../core/adaptor';
// 注册的shape
import './shapes/cloud';

export { WordCloudOptions };

export class WordCloud extends Plot<WordCloudOptions> {
  /** 词云图 */
  public type: string = 'word-cloud';

  /**
   * 获取 词云图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<WordCloudOptions> {
    return adaptor;
  }
}
