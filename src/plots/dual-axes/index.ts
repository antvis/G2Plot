import { deepMix } from '@antv/util';
import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { DualAxesOption, DualAxesGeometry } from './types';
import { adaptor } from './adaptor';

export { DualAxesOption };

export class DualAxes extends Plot<DualAxesOption> {
  /** 图表类型: 双轴图 */
  public type: string = 'dual-axes';

  /**
   * 获取 双轴图 默认配置
   */
  protected getDefaultOptions(options) {
    const { geometryOptions = [] } = options;
    const hasColumn = geometryOptions.find(
      (geometryOption) => geometryOption && geometryOption.geometry === DualAxesGeometry.Column
    );
    const defaultInteraction = [{ type: 'legend-visible-filter' }];
    return deepMix({}, super.getDefaultOptions(), {
      tooltip: {
        showMarkers: false,
        // 存在柱状图，不显示 crosshairs
        showCrosshairs: !hasColumn,
        shared: true,
        crosshairs: {
          type: 'x',
        },
      },
      interactions: hasColumn ? defaultInteraction.concat({ type: 'active-region' }) : defaultInteraction,
    });
  }

  /**
   * 获取双轴图的适配器
   */
  protected getSchemaAdaptor(): Adaptor<DualAxesOption> {
    return adaptor;
  }
}
