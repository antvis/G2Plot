import { Options, StyleAttr } from '../../types';
import { DrillDownCfg } from '../../types/drill-down';
import { HierarchyOption } from '../../utils/hierarchy/types';

export interface TreemapOptions extends Omit<Options, 'data'> {
  /**
   * @title 颜色字段
   * @description  颜色字段
   */
  readonly colorField?: string;
  /**
   * @title 数据字段
   * @description  数据字段
   */
  readonly data?: Record<string, any>;
  /**
   * @title 图形样式
   * @description  图形样式
   */
  readonly rectStyle?: StyleAttr;
  /**
   * @title 层级布局
   * @description  层级布局配置
   */
  readonly hierarchyConfig?: Omit<HierarchyOption, 'as' | 'type' | 'field'>;=
  /**
   * @title 源字段
   * @description  附加的 源字段
   */
  readonly rawFields?: string[];
  /**
   * @title 矩阵树图
   * @description  内置一些交互 下钻交互相关配置
   */
  readonly drilldown?: DrillDownCfg;
}
