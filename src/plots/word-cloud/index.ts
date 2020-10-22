import { deepMix } from '@antv/util';
import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { Tag, WordCloudOptions } from './types';
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
        customContent(_, data: { data: Tag; mappingData: { color: string } }[]) {
          if (!data.length) return;
          // 不完全采用模板字符串，是为了去掉换行符和部分空格，
          // 便于测试。
          return (
            '<li class="g2-tooltip-list-item" style="margin-bottom:4px;display:flex;align-items:center;">' +
            `<span style="background-color:${data[0]?.mappingData?.color};" class="g2-tooltip-marker"></span>` +
            '<span style="display:inline-flex;flex:1;justify-content:space-between">' +
            `<span style="margin-right: 16px;">${data[0]?.data.text}:</span><span>${data[0]?.data.value}</span>` +
            '</span>' +
            '</li>'
          );
        },
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

    const handler = (img: HTMLImageElement) => {
      this.options = {
        ...this.options,
        imageMask: img || null,
      };

      // 调用父类渲染函数
      super.render();
    };

    processImageMask(imageMask).then(handler).catch(handler);
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
      // 这里解决了重渲染时字体变的透明的问题
      this.chart.clear();
      // 当整个词云图图表的宽高信息发生变化时，每个词语的坐标
      // 需要重新执行 adaptor，执行词云图的布局函数，不然会出现布局错乱，
      // 如相邻词语重叠的情况。
      this.execAdaptor();
      // 执行父类的方法
      super.triggerResize();
    }
  }
}
