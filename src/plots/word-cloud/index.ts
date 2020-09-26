import { deepMix } from '@antv/util';
import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { WordCloudOptions } from './types';
import { adaptor } from './adaptor';
import { processImageMask } from './utils';
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
   * 覆写父类方法，词云图需要加载图片资源，所以需要异步渲染
   */
  public render() {
    const { imageMask } = this.options;

    if (!imageMask) {
      // 调用父类渲染函数
      super.render();
      return;
    }

    processImageMask(imageMask, (img) => {
      this.options = {
        ...this.options,
        imageMask: img || null,
      };

      // 调用父类渲染函数
      super.render();
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
    if (!this.chart.destroyed) {
      // 当整个词云图图表的宽高信息发生变化时，每个词语的坐标需要重新
      // 交给 data-set 进行计算，不然会出现布局错乱，如相邻词语重叠的情况。
      this.execAdaptor();
      // 执行父类的方法
      super.triggerResize();
    }
  }
}
