import { GeometryOptions } from '../../adaptor/geometries';
import { ColorAttr, Options, StyleAttr } from '../../types';
import { DrillDownCfg } from '../../types/drill-down';
import { HierarchyOption } from '../../utils/hierarchy/types';

export interface SunburstOptions
  extends Omit<Options, 'data' | 'slider' | 'scrollbar' | 'xAxis' | 'yAxis'>,
    Pick<GeometryOptions, 'customInfo'> {
  /**
   * @title 旭日图数据
   */
  readonly data: any;
  /**
   * @title 径向类型
   * @description  径向类型'x' | 'y'
   */
  readonly reflect?: 'x' | 'y';

  // 样式

  /**
   * @title 内径
   */
  readonly innerRadius?: number;
  /**
   * @title 半经
   */
  readonly radius?: number;
  /**
   * @title 颜色映射
   */
  readonly colorField?: string;
  /**
   * @title 颜色
   */
  readonly color?: ColorAttr;
  /**
   * @title 旭日图形样式
   */
  readonly sunburstStyle?: StyleAttr;

  /**
   * @title 层级布局
   */
  readonly hierarchyConfig?: Omit<HierarchyOption, 'as' | 'type'> & {
    /** default: 'value', required data to be like: { name: 'xx', [field]: 12, children: [] } */
    readonly field?: string;
    /**
     * @title 是否忽略父节点的权重
     * @description  其父节点的权重不由子节点权重总和决定
     * @default false
     */
    readonly ignoreParentValue?: boolean;
    /**
     * @title 展示的层级深度
     * @description  取值 > 0 默认空, 代表全部展示
     */
    readonly activeDepth?: number;
  };

  // 其他

  /**
   * @title 额外的原始字段
   */
  readonly rawFields?: string[];
  /**
   * @title 下钻交互
   */
  readonly drilldown?: DrillDownCfg;
  /**
   * @title 自定义旭日图形状
   * @description polygon 图形元素展示形状
   */
  readonly shape?: string;
}
