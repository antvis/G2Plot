import { Plot } from '../../core/plot';
import { deepAssign } from '../../utils';
import { Adaptor } from '../../core/adaptor';
import { PieOptions } from './types';
import { isAllZero, processIllegalData } from './utils';
import { adaptor, pieAnnotation } from './adaptor';
import './interactions';

export { PieOptions };

export class Pie extends Plot<PieOptions> {
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
   * 获取 饼图 默认配置项
   */
  protected getDefaultOptions(): Partial<PieOptions> {
    return deepAssign({}, super.getDefaultOptions(), {
      legend: {
        position: 'right',
      },
      tooltip: {
        shared: false,
        showTitle: false,
        showMarkers: false,
      },
      label: {
        layout: { type: 'limit-in-plot', cfg: { action: 'ellipsis' } },
      },
      /** 饼图样式, 不影响暗黑主题 */
      pieStyle: {
        stroke: 'white',
        lineWidth: 1,
      },
      /** 饼图中心文本默认样式 */
      statistic: {
        title: {
          style: { fontWeight: 300, color: '#4B535E', textAlign: 'center', fontSize: '20px', lineHeight: 1 },
        },
        content: {
          style: {
            fontWeight: 'bold',
            color: 'rgba(44,53,66,0.85)',
            textAlign: 'center',
            fontSize: '32px',
            lineHeight: 1,
          },
        },
      },
      /** 默认关闭 text-annotation 动画 */
      theme: {
        components: {
          annotation: {
            text: {
              animate: false,
            },
          },
        },
      },
    });
  }

  /**
   * 获取 饼图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<PieOptions> {
    return adaptor;
  }
}
