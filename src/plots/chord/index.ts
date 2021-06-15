import { each } from '@antv/util';
import { Element } from '@antv/g2';
import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { StateName, StateCondition, StateObject } from '../../types';
import { getAllElementsRecursively } from '../../utils';
import { adaptor } from './adaptor';
import { DEFAULT_OPTIONS } from './constant';
import { ChordOptions } from './types';

export type { ChordOptions };

/**
 *  弦图 Chord
 */
export class Chord extends Plot<ChordOptions> {
  /**
   * 获取 面积图 默认配置项
   * 供外部使用
   */
  static getDefaultOptions(): Partial<ChordOptions> {
    return DEFAULT_OPTIONS;
  }
  /** 图表类型 */
  public type: string = 'chord';

  /**
   * @override
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
   * @override
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

  protected getDefaultOptions() {
    return Chord.getDefaultOptions();
  }

  /**
   * 获取适配器
   */
  protected getSchemaAdaptor(): Adaptor<ChordOptions> {
    return adaptor;
  }
}
