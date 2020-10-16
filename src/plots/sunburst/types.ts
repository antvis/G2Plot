import { Options, StyleAttr } from '../../types';

export interface HierarchyOption {
  /**
   * 字段名 默认为 value
   */
  field?: string;
  tile?:
    | 'treemapBinary'
    | 'treemapDice'
    | 'treemapSlice'
    | 'treemapSliceDice'
    | 'treemapSquarify'
    | 'treemapResquarify';
  size?: [number, number];
  round?: boolean;
  ratio?: number;
  padding?: number;
  paddingInner?: number;
  paddingOuter?: number;
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  as: [string, string];
}
export interface SunburstOptions extends Omit<Options, 'data' | 'legend' | 'slider' | 'scrollbar' | 'xAxis' | 'yAxis'> {
  /** 旭日图数据 */
  readonly data: any;
  /** 布局类型 */
  readonly type?: string;
  /** 分组字段 */
  readonly seriesField?: string;
  /** 径向类型 */
  readonly reflect?: 'x' | 'y';
  /** 内径 */
  readonly innerRadius?: number;
  /** 半经 */
  readonly radius?: number;
  /** 颜色映射 */
  readonly colorField?: string;
  /** 旭日图形样式 */
  readonly sunburstStyle?: StyleAttr;
  /** 层级布局配置 */
  readonly hierarchyConfig?: Omit<HierarchyOption, 'as' | 'type' | 'field'>;
}
