import { Options, StyleAttr } from '../../types';
import { DrillDownCfg } from '../../types/drill-down';
import { HierarchyOption } from '../../utils/hierarchy/types';

export interface TreemapOptions extends Omit<Options, 'data'> {
  /** 颜色字段 */
  readonly colorField?: string;
  /** 数据字段 */
  readonly data?: Record<string, any>;
  /** 图形样式 */
  readonly rectStyle?: StyleAttr;
  /** 层级布局配置 */
  readonly hierarchyConfig?: Omit<HierarchyOption, 'as' | 'type' | 'field'>;
  /**
   * 附加的 源字段
   */
  readonly rawFields?: string[];
  // 矩阵树图 内置一些交互
  /** 下钻交互相关配置 */
  readonly drilldown?: DrillDownCfg;
}
