import { deepMix } from '@antv/util';
import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { WordCloudOptions } from './types';
import { adaptor } from './adaptor';
// 注册的shape
import './shapes/word-cloud';

export { WordCloudOptions };

export class WordCloud extends Plot<WordCloudOptions> {
  /** 词云图 */
  public type: string = 'word-cloud';

  /**
   * 获取默认的 options 配置项
   */
  protected getDefaultOptions(): Partial<WordCloudOptions> {
    return deepMix({}, super.getDefaultOptions(), {
      timeInterval: 2000,
      tooltip: {
        showTitle: false,
        showMarkers: false,
        showCrosshairs: false,
      },
      wordStyle: {
        fontFamily: 'Verdana',
        fontWeight: 'normal',
        padding: 1,
        fontSize: [20, 60],
        rotation: [0, 90],
        rotationSteps: 2,
        rotateRatio: 0.5,
      },
    });
  }

  /**
   * 获取 词云图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<WordCloudOptions> {
    return adaptor;
  }
}
