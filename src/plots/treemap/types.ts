import { Options, StyleAttr } from '../../types';
import { DrillDownCfg } from '../../types/drill-down';
import { HierarchyOption } from '../../utils/hierarchy/types';

export interface TreemapOptions extends Omit<Options, 'data'> {
  /**
   * @title 颜色字段
   */
  readonly colorField?: string;
  /**
   * @title 数据字段
   */
  readonly data?: Record<string, any>;
  /**
   * @title 图形样式
   */
  readonly rectStyle?: StyleAttr;
  /**
   * @title 层级布局
   */
  readonly hierarchyConfig?: Omit<HierarchyOption, 'as' | 'type' | 'field'>;
  /**
   * @title 附加的源字段
   */
  readonly rawFields?: string[];
  /**
   * @title 矩阵树图
   * @description  内置一些交互 下钻交互相关配置
   */
  readonly drilldown?: DrillDownCfg;
}
