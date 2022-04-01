import { ShapeAttrs } from '@antv/g2';
import { BrushCfg, Options, StyleAttr } from '../../types';
import { OptionWithConversionTag } from '../../adaptor/conversion-tag';
import { OptionWithConnectedArea } from '../../adaptor/connected-area';
import { IntervalGeometryOptions } from '../../adaptor/geometries/interval';
import { Transformations } from '../../types/coordinate';

type PartialIntervalGeometryOptions = Pick<IntervalGeometryOptions, 'dodgePadding' | 'intervalPadding'>;

export interface ColumnOptions
  extends Options,
    OptionWithConversionTag,
    OptionWithConnectedArea,
    PartialIntervalGeometryOptions {
  /**
   * @title x轴字段
   */
  readonly xField: string;
  /**
   * @title y轴字段
   */
  readonly yField: string;
  /**
   * @title 拆分字段
   */
  readonly seriesField?: string;
  /**
   * @title 是否分组柱形图
   * @default false
   */
  readonly isGroup?: boolean;
  /**
   * @title 是否是区间柱状图
   * @default false
   */
  readonly isRange?: boolean;
  /**
   * @title 是否是百分比柱状图
   * @default false
   */
  readonly isPercent?: boolean;
  /**
   * @title 是否堆积柱状图
   * @default false
   */
  readonly isStack?: boolean;
  /**
   * @title 柱状图宽度占比
   * @description 范围[0-1]
   */
  readonly columnWidthRatio?: number;
  /**
   * @title 分组中柱子之间的间距
   * @description 范围[0-1]，仅对分组柱状图适用
   */
  readonly marginRatio?: number;
  /**
   * @title 柱状图最小宽度（像素）
   */
  readonly minColumnWidth?: number;
  /**
   * @title 柱状图最大宽度（像素）
   */
  readonly maxColumnWidth?: number;
  /**
   * @title 柱状图柱子的背景
   */
  readonly columnBackground?: { style?: ShapeAttrs };
  /**
   * @title 柱子样式
   */
  readonly columnStyle?: StyleAttr;
  /**
   * @title 分组字段
   * @description 优先级高于 seriesField , isGroup: true 时会根据 groupField 进行分组
   */
  readonly groupField?: string;
  /**
   * @title 自定义柱状图
   * @description interval 图形元素展示形状
   */
  readonly shape?: string;
  /**
   * @title 图表交互
   * @description 开启下钻交互，以及进行下钻交互的配置
   */
  readonly brush?: BrushCfg;

  /**
   * @title 坐标转换
   * @description 可以对坐标系进行转换，如: reflectX, reflectY, transpose 等
   */
  readonly coordinate?: Transformations;
}
