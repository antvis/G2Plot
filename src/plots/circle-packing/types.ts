import { ColorAttr, Options, StyleAttr } from '../../types';
import { DrillDownCfg } from '../../types/drill-down';
import { HierarchyOption } from '../../utils/hierarchy/types';

export interface CirclePackingOptions extends Omit<Options, 'data'> {
  /**
  * @title 数据字段
  * @description 数据字段
  */
  readonly data?: Record<string, any>;
  /** 层级布局配置 */
  /**
  * @title 层级布局
  * @description 层级布局配置
  */
  readonly hierarchyConfig?: Omit<HierarchyOption, 'as' | 'type' | 'field'>;
  /**
  * @title 颜色字段
  * @description 颜色字段
  */
  readonly colorField?: string;
  /**
  * @title 颜色
  * @description 颜色配置
  */
  readonly color?: ColorAttr;
  /**
  * @title 大小字段
  * @description 大小字段
  */
  readonly sizeField?: string;
  /**
  * @title 源字段
  * @description 源字段
  */
  readonly rawFields?: string[];

  // 暂不提供自定义 size，内部计算
  // readonly size?: SizeAttr;

  // 暂不提供 shape 配置，默认：circle.
  // readonly shape?: string;

  /**
  * @title 图形样式
  * @description 图形样式配置
  */
  readonly pointStyle?: StyleAttr;
  /**
  * @title 交互
  * @description 下钻交互
  */
  readonly drilldown?: DrillDownCfg;
}
