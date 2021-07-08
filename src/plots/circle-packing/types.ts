import { ColorAttr, Options, StyleAttr } from '../../types';
import { DrillDownCfg } from '../../types/drill-down';
import { HierarchyOption } from '../../utils/hierarchy/types';

export interface CirclePackingOptions extends Omit<Options, 'data'> {
  /** 数据字段 */
  readonly data?: Record<string, any>;
  /** 层级布局配置 */
  readonly hierarchyConfig?: Omit<HierarchyOption, 'as' | 'type' | 'field'>;

  /** 颜色字段 */
  readonly colorField?: string;

  /** 颜色配置 */
  readonly color?: ColorAttr;

  /** 大小字段 */
  readonly sizeField?: string;

  /** 源字段 */
  readonly rawFields?: string[];

  // 暂不提供自定义 size，内部计算
  // readonly size?: SizeAttr;

  // 暂不提供 shape 配置，默认：circle.
  // readonly shape?: string;

  /** 图形样式 */
  readonly pointStyle?: StyleAttr;

  // 交互
  /** 下钻交互 */
  readonly drilldown?: DrillDownCfg;
}
