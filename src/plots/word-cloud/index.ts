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

  /**
   * 覆写父类的方法，因为词云图使用 data-set 进行布局，原理上有些不一样
   */
  protected triggerResize() {
    // 重新做一遍 data-set 的处理逻辑，这个适和其他图形不一样的地阿芳
    this.execAdaptor();
    // 执行父类的方法
    super.triggerResize();
  }
}
