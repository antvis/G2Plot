import { each } from '@antv/util';
import { Element } from '@antv/g2';
import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { StateName, StateCondition, StateObject } from '../..';
import { getAllElementsRecursively } from '../../utils';
import { FunnelOptions } from './types';
import { adaptor } from './adaptor';
import {
  DEFAULT_OPTIONS,
  FUNNEL_CONVERSATION as FUNNEL_CONVERSATION_FIELD,
  FUNNEL_PERCENT,
  FUNNEL_TOTAL_PERCENT,
} from './constant';

export type { FunnelOptions };

export { FUNNEL_CONVERSATION_FIELD };

export class Funnel extends Plot<FunnelOptions> {
  /** 图表类型 */
  public type: string = 'funnel';

  static getDefaultOptions(): Partial<FunnelOptions> {
    return DEFAULT_OPTIONS;
  }

  // 内部变量
  /** 漏斗 转化率 字段 */
  static CONVERSATION_FIELD = FUNNEL_CONVERSATION_FIELD;
  /** 漏斗 百分比 字段 */
  static PERCENT_FIELD = FUNNEL_PERCENT;
  /** 漏斗 总转换率百分比 字段 */
  static TOTAL_PERCENT_FIELD = FUNNEL_TOTAL_PERCENT;

  /**
   * 获取 漏斗图 默认配置项
   */
  protected getDefaultOptions(): Partial<FunnelOptions> {
    // 由于不同漏斗图 defaultOption 有部分逻辑不同，此处仅处理 core.getDefaultOptions 覆盖范围，funnel 的 defaulOption 为不分散逻辑统一写到 adaptor 的 defaultOption 中
    return Funnel.getDefaultOptions();
  }

  /**
   * 获取 漏斗图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<FunnelOptions> {
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
