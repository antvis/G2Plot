import { Options, StyleAttr } from '../../types';
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
}
