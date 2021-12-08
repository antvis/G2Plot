import { ColorAttr, Options, StyleAttr } from '../../types';
import { DrillDownCfg } from '../../types/drill-down';
import { HierarchyOption } from '../../utils/hierarchy/types';

export interface SunburstOptions extends Omit<Options, 'data' | 'slider' | 'scrollbar' | 'xAxis' | 'yAxis'> {
  /** 旭日图数据 */
  readonly data: any;
  /** 径向类型 */
  readonly reflect?: 'x' | 'y';

  // 样式
  /** 内径 */
  readonly innerRadius?: number;
  /** 半经 */
  readonly radius?: number;
  /** 颜色映射 */
  readonly colorField?: string;
  /** 颜色*/
  readonly color?: ColorAttr;
  /** 旭日图形样式 */
  readonly sunburstStyle?: StyleAttr;

  /** 层级布局配置 */
  readonly hierarchyConfig?: Omit<HierarchyOption, 'as' | 'type'> & {
    /** default: 'value', required data to be like: { name: 'xx', [field]: 12, children: [] } */
    readonly field?: string;
    /** 是否忽略父节点的权重, 默认: false, 其父节点的权重不由子节点权重总和决定 */
    readonly ignoreParentValue?: boolean;
    /** 默认展示的层级深度. 默认空, 代表全部展示. 取值 > 0 */
    readonly activeDepth?: number;
  };

  // 其他
  /** 额外的原始字段 */
  readonly rawFields?: string[];
  /** 下钻交互 */
  readonly drilldown?: DrillDownCfg;
}
