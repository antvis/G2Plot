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
    const { geometryOptions = [], xField, data } = options;
    const columnIndex = geometryOptions.findIndex(
      (geometryOption) => geometryOption && geometryOption.geometry === DualAxesGeometry.Column
    );

    let defaultXFieldMeta = {};
    if (columnIndex > -1) {
      const columnData = data[columnIndex];
      defaultXFieldMeta = {
        range: [1 / columnData.length / 2, 1 - 1 / columnData.length / 2],
      };
    }

    const defaultInteraction = [{ type: 'legend-visible-filter' }];

    return deepMix({}, super.getDefaultOptions(), {
      meta: {
        [xField]: defaultXFieldMeta,
      },
      tooltip: {
        showMarkers: false,
        // 存在柱状图，不显示 crosshairs
        showCrosshairs: columnIndex > -1,
        shared: true,
        crosshairs: {
          type: 'x',
        },
      },
      interactions: columnIndex > -1 ? defaultInteraction.concat({ type: 'active-region' }) : defaultInteraction,
      syncViewPadding: true,
    });
  }

  /**
   * 获取双轴图的适配器
   */
  protected getSchemaAdaptor(): Adaptor<DualAxesOption> {
    return adaptor;
  }
}
