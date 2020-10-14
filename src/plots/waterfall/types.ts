import { Options, ShapeStyle, StyleAttr } from '../../types';

/** totalCfg of waterfall */
type TotalCfg = {
  /** 总计的标签 */
  label?: string;
  style?: ShapeStyle;
};

/** leaderLineCfg of waterfall */
type LeaderLineCfg = {
  style?: ShapeStyle;
};

export interface WaterfallOptions extends Options {
  /** x 轴字段 */
  readonly xField: string;
  /** y 轴字段 */
  readonly yField: string;
  /** label 数据模式, default: difference */
  readonly labelMode?: 'absolute' | 'difference';
  /** 是否展示 总计 */
  readonly total?: false | TotalCfg;
  /** 是否展示 柱子间牵引线 */
  readonly leaderLine?: false | LeaderLineCfg;
  /** 上涨色 */
  readonly risingFill?: string;
  /** 下跌色 */
  readonly fallingFill?: string;
  /** 柱子样式配置; 注意: fill 不再生效，直接使用 risingFill, fallingFill 或 color */
  readonly waterfallStyle?: StyleAttr;
  /** 柱状图宽度占比 [0-1] */
  readonly columnWidthRatio?: number;
}
