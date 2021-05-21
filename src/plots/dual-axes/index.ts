import { each } from '@antv/util';
import { Element } from '@antv/g2';
import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { StateName, StateCondition, StateObject } from '../../types';
import { deepAssign, getAllElementsRecursively } from '../../utils';
import { DualAxesOptions } from './types';
import { adaptor } from './adaptor';

export type { DualAxesOptions };

export class DualAxes extends Plot<DualAxesOptions> {
  /** 图表类型: 双轴图 */
  public type: string = 'dual-axes';

  /**
   * 获取 双轴图 默认配置
   */
  protected getDefaultOptions(): Partial<DualAxesOptions> {
    return deepAssign({}, super.getDefaultOptions(), {
      yAxis: [],
      syncViewPadding: true,
    });
  }

  /**
   * 获取双轴图的适配器
   */
  protected getSchemaAdaptor(): Adaptor<DualAxesOptions> {
    return adaptor;
  }

  /**
   * 设置状态
   * @param type 状态类型，支持 'active' | 'inactive' | 'selected' 三种
   * @param conditions 条件，支持数组
   * @param status 是否激活，默认 true
   */
  public setState(type: StateName, condition: StateCondition, status: boolean = true) {
    const elements = getAllElementsRecursively(this.chart);

    each(elements, (ele: Element) => {
      if (condition(ele.getData())) {
        ele.setState(type, status);
      }
    });
  }

  /**
   * 获取状态
   */
  public getStates(): StateObject[] {
    const elements = getAllElementsRecursively(this.chart);

    const stateObjects: StateObject[] = [];
    each(elements, (element: Element) => {
      const data = element.getData();
      const states = element.getStates();
      each(states, (state) => {
        stateObjects.push({ data, state, geometry: element.geometry, element });
      });
    });

    return stateObjects;
  }
}
