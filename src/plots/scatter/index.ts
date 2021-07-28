import { BRUSH_FILTER_EVENTS, VIEW_LIFE_CIRCLE } from '@antv/g2';
import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { deepAssign } from '../../utils';
import { ScatterOptions } from './types';
import { adaptor, transformOptions, meta } from './adaptor';
import { DEFAULT_OPTIONS } from './constant';
import './interactions';

export type { ScatterOptions };

export class Scatter extends Plot<ScatterOptions> {
  /**
   * 获取 散点图 默认配置项
   * 供外部使用
   */
  static getDefaultOptions(): Partial<ScatterOptions> {
    return DEFAULT_OPTIONS;
  }

  /** 图表类型 */
  public type: string = 'scatter';

  constructor(container: string | HTMLElement, options: ScatterOptions) {
    super(container, options);

    // 监听 brush 事件，处理 meta
    this.on(VIEW_LIFE_CIRCLE.BEFORE_RENDER, (evt) => {
      // 运行时，读取 option
      const { options, chart } = this;
      if (evt.data?.source === BRUSH_FILTER_EVENTS.FILTER) {
        const filteredData = this.chart.filterData(this.chart.getData());
        meta({ chart, options: { ...options, data: filteredData } });
      }

      if (evt.data?.source === BRUSH_FILTER_EVENTS.RESET) {
        meta({ chart, options });
      }
    });
  }

  /**
   * @override
   * @param data
   */
  public changeData(data: ScatterOptions['data']) {
    this.updateOption(transformOptions(deepAssign({}, this.options, { data })));
    const { options, chart } = this;
    meta({ chart, options });
    this.chart.changeData(data);
  }

  /**
   * 获取 散点图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<ScatterOptions> {
    return adaptor;
  }

  protected getDefaultOptions() {
    return Scatter.getDefaultOptions();
  }
}
