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
  // 是否在计算总值时，忽略父节点的值
  ignoreParentValue?: boolean;
  ratio?: number;
  padding?: number;
  paddingInner?: number;
  paddingOuter?: number;
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  as: [string, string];
  sort?(a: any, b: any): number;
}
