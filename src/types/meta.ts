/** scale 元信息，取名为 meta */
export type Meta = {
  /**
   * 坐标轴类型
   */
  readonly type?: string;
  /**
   * 是否美化
   */
  readonly nice?: boolean;
  /**
   * 坐标轴最小值
   */
  readonly min?: number;
  /**
   * 坐标轴最大值
   */
  readonly max?: number;
  /**
   * min limit
   */
  readonly minLimit?: number;
  /**
   * max limit
   */
  readonly maxLimit?: number;
  /**
   * 期望的坐标轴刻度数量，非最终结果
   */
  readonly tickCount?: number;
  /**
   * 坐标轴刻度间隔
   */
  readonly tickInterval?: number;
  /**
   * 指定 tick 计算方法或自定义计算 tick 的方法
   */
  readonly tickMethod?: string | ((scale: any) => any[]);
  /**
   * 字段别名
   */
  readonly alias?: string;
  /**
   * 指定 scale 中的 values 信息
   */
  readonly values?: string[];
  /**
   * scale 转换的范围，0 ~ 1 的数组，表示开始和结束的位置
   */
  readonly range?: number[];
  /**
   * 格式化 tick 值
   */
  readonly formatter?: (v: any) => string;
};
