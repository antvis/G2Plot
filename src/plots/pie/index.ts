import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { adaptor, pieAnnotation } from './adaptor';
import { DEFAULT_OPTIONS } from './contants';
import { PieOptions } from './types';
import { isAllZero, processIllegalData } from './utils';
import './interactions';

export { PieOptions };

export class Pie extends Plot<PieOptions> {
  /**
   * 获取 饼图 默认配置项
   * @static 供外部使用
   */
  static getDefaultOptions(): Partial<PieOptions> {
    return DEFAULT_OPTIONS;
  }

  /** 图表类型 */
  public type: string = 'pie';

  /**
   * 更新数据
   * @param data
   */
  public changeData(data: PieOptions['data']) {
    const prevOptions = this.options;
    const { angleField } = this.options;
    const prevData = processIllegalData(prevOptions.data, angleField);
    const curData = processIllegalData(data, angleField);
    // 如果上一次或当前数据全为 0，则重新渲染
    if (isAllZero(prevData, angleField) || isAllZero(curData, angleField)) {
      this.update({ data });
    } else {
      this.updateOption({ data });
      this.chart.data(curData);
      // todo 后续让 G2 层在 afterrender 之后，来重绘 annotations
      pieAnnotation({ chart: this.chart, options: this.options });
      this.chart.render(true);
    }
  }

  /**
   * 获取 饼图 默认配置项, 供 base 获取
   */
  protected getDefaultOptions(): Partial<PieOptions> {
    return Pie.getDefaultOptions();
  }

  /**
   * 获取 饼图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<PieOptions> {
    return adaptor;
  }
}
