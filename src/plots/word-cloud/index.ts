import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { WordCloudOptions } from './types';
import { adaptor } from './adaptor';
import { DEFAULT_OPTIONS } from './constant';
import { processImageMask, transform } from './utils';
// 注册的shape
import './shapes/word-cloud';

export type { WordCloudOptions };

export class WordCloud extends Plot<WordCloudOptions> {
  /**
   * 获取 词云图 默认配置项
   * 供外部使用
   */
  static getDefaultOptions(): Partial<WordCloudOptions> {
    return DEFAULT_OPTIONS;
  }

  /** 词云图 */
  public type: string = 'word-cloud';

  /**
   * @override
   * @param data
   */
  public changeData(data) {
    this.updateOption({ data });
    if (this.options.imageMask) {
      this.render();
    } else {
      this.chart.changeData(transform({ chart: this.chart, options: this.options }));
    }
  }

  /**
   * 获取默认的 options 配置项
   */
  protected getDefaultOptions(): Partial<WordCloudOptions> {
    return WordCloud.getDefaultOptions();
  }

  /**
   * 覆写父类方法，词云图需要加载图片资源，所以需要异步渲染
   */
  public render() {
    return new Promise<void>((res) => {
      const { imageMask } = this.options;

      if (!imageMask) {
        // 调用父类渲染函数
        super.render();
        res();
        return;
      }

      const handler = (img: HTMLImageElement) => {
        this.options = {
          ...this.options,
          imageMask: img || null,
        };

        // 调用父类渲染函数
        super.render();
        res();
      };

      processImageMask(imageMask).then(handler).catch(handler);
    });
  }

  /**
   * 获取 词云图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<WordCloudOptions> {
    return adaptor;
  }

  /**
   * 覆写父类的方法，因为词云图使用 单独的函数 进行布局，原理上有些不一样
   */
  protected triggerResize() {
    if (!this.chart.destroyed) {
      // 当整个词云图图表的宽高信息发生变化时，每个词语的坐标
      // 需要重新执行 adaptor，不然会出现布局错乱，
      // 如相邻词语重叠的情况。
      this.execAdaptor();

      // 延迟执行，有利于动画更流畅
      // TODO: 在多次更改画布尺寸时，动画会越来越卡顿，原因未知
      window.setTimeout(() => {
        // 执行父类的方法
        super.triggerResize();
      });
    }
  }
}
