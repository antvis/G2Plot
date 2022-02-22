import { Options, State, StyleAttr } from '../../types';

export interface ViolinOptions extends Options {
  /**
   * @title X 轴映射
   */
  readonly xField: string;
  /**
   * @title Y 轴映射
   */
  readonly yField: string;
  /**
   * @title 拆分字段映射
   * @default "分组情况,颜色作为视觉通道 "
   */
  readonly seriesField?: string;
  /**
   * @title 内部箱线图配置
   * @description false 为不显示
   */
  readonly box?:
    | boolean
    | {
        /**
         * @title 箱线图
         * @description 状态样式设置
         */
        state: State;
      };
  /**
   * @title 小提琴的形状
   * @description smooth: 平滑,hollow: 空心,hollow-smooth: 平滑、空心.
   * @default "非平滑、实心"
   */
  readonly shape?: 'smooth' | 'hollow' | 'hollow-smooth';
  /**
   * @title 小提琴样式配置
   */
  readonly violinStyle?: StyleAttr;
  /**
   * @title 核函数配置
   * @description 核函数配置，当前只支持三角核
   */
  readonly kde?: {
    /**
     * @title 三角波类型
     * @description 三角波类型'triangular'
     */
    type: 'triangular';
    /**
     * @title 最小值
     * @description 默认为数据中的最小值减去一个固定的阈值
     * @default "数据中的最小值减去一个固定的阈值"
     */
    min?: number;
    /**
     * @title 最大值
     * @description 默认为数据中的最大值减去一个固定的阈值
     * @default "数据中的最大值减去一个固定的阈值"
     */
    max?: number;
    /**
     * @title 采样数量
     * @description 越大轮廓线越接近真实概率分布函数
     * @default "32"
     */
    sampleSize?: number;
    /**
     * @title 核函数的带宽
     * @description 带宽越大产生的曲线越平滑（越模糊），带宽越小产生的曲线越陡峭
     * @default "3"
     */
    width?: number;
  } /* | { type: 'gaussian', } ⬅️ 像这样添加新的核函数支持 */;
}
