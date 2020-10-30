import { deepMix, every, some } from '@antv/util';
import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { DualAxesOptions, DualAxesGeometry } from './types';
import { adaptor } from './adaptor';

export { DualAxesOptions };

export class DualAxes extends Plot<DualAxesOptions> {
  /** 图表类型: 双轴图 */
  public type: string = 'dual-axes';

  /**
   * 获取 双轴图 默认配置
   */
  protected getDefaultOptions(options: DualAxesOptions): Partial<DualAxesOptions> {
    const { geometryOptions = [], xField } = options;
    const allLine = every(
      geometryOptions,
      ({ geometry }) => geometry === DualAxesGeometry.Line || geometry === undefined
    );

    return deepMix({}, super.getDefaultOptions(options), {
      yAxis: [],
      geometryOptions: [],
      meta: {
        [xField]: {
          // x 轴一定是同步 scale 的
          sync: true,
          // 如果有没有柱子，则
          range: allLine ? [0, 1] : undefined,
        },
      },
      tooltip: {
        showMarkers: allLine,
        // 存在柱状图，不显示 crosshairs
        showCrosshairs: allLine,
        shared: true,
        crosshairs: {
          type: 'x',
        },
      },
      interactions: !allLine
        ? [{ type: 'legend-visible-filter' }, { type: 'active-region' }]
        : [{ type: 'legend-visible-filter' }],
      syncViewPadding: true,
    });
  }

  /**
   * 获取双轴图的适配器
   */
  protected getSchemaAdaptor(): Adaptor<DualAxesOptions> {
    return adaptor;
  }
}
