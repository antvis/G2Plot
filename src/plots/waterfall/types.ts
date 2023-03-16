import { GeometryOptions } from '../../adaptor/geometries';
import { Options, ShapeStyle, StyleAttr } from '../../types';

/** totalCfg of waterfall */
type TotalCfg = {
  /**
   * @title 总计的标签
   */
  label?: string;
  /**
   * @title 样式
   */
  style?: ShapeStyle;
};

/** leaderLineCfg of waterfall */
type LeaderLineCfg = {
  /**
   * @title 样式
   */
  style?: ShapeStyle;
};

export interface WaterfallOptions extends Options, Pick<GeometryOptions, 'customInfo'> {
  /**
   * @title x 轴字段
   */
  readonly xField: string;
  /**
   * @title y 轴字段
   */
  readonly yField: string;
  /**
   * @title label 数据模式
   * @description absolute' | 'difference'
   * @default "difference"
   */
  readonly labelMode?: 'absolute' | 'difference';
  /**
   * @title 是否展示 总计
   * @description   false | TotalCfg
   */
  readonly total?: false | TotalCfg;
  /**
   * @title 是否展示 柱子间牵引线
   * @description false | LeaderLineCfg
   */
  readonly leaderLine?: false | LeaderLineCfg;
  /**
   * @title 上涨色
   */
  readonly risingFill?: string;
  /**
   * @title 下跌色
   */
  readonly fallingFill?: string;
  /**
   * @title 柱子样式配置
   * @description 注意: fill 不再生效，直接使用 risingFill, fallingFill 或 color
   */
  readonly waterfallStyle?: StyleAttr;
  /**
   * @title 柱状图宽度占比
   * @description 范围0-1
   */
  readonly columnWidthRatio?: number;
  /**
   * @title 自定义瀑布图
   * @description interval 图形元素展示形状
   */
  readonly shape?: string;
}
