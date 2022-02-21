import { ShapeAttrs } from '@antv/g2';
import { BrushCfg, Options, StyleAttr } from '../../types';
import { OptionWithConversionTag } from '../../adaptor/conversion-tag';
import { OptionWithConnectedArea } from '../../adaptor/connected-area';
import { IntervalGeometryOptions } from '../../adaptor/geometries/interval';

type PartialIntervalGeometryOptions = Pick<IntervalGeometryOptions, 'dodgePadding' | 'intervalPadding'>;

export interface ColumnOptions
  extends Options,
    OptionWithConversionTag,
    OptionWithConnectedArea,
    PartialIntervalGeometryOptions {
  /**
  * @title x轴字段
  * @description x轴字段
  */
  readonly xField: string;
  /**
  * @title y轴字段
  * @description y轴字段
  */
  readonly yField: string;
  /**
  * @title 拆分字段
  * @description 拆分字段
  */
  readonly seriesField?: string;
  /**
  * @title 是否分组柱形图
  * @description 是否分组柱形图
  * @default false
  */
  readonly isGroup?: boolean;
  /**
  * @title 是否是区间柱状图
  * @description 是否是区间柱状图
  * @default false
  */
  readonly isRange?: boolean;
  /**
  * @title 是否是百分比柱状图
  * @description 是否是百分比柱状图
  * @default false
  */
  readonly isPercent?: boolean;
  /**
  * @title 是否堆积柱状图
  * @description 是否堆积柱状图
  * @default false
  */
  readonly isStack?: boolean;
  /**
  * @title 柱状图宽度占比
  * @description 柱状图宽度占比 [0-1]
  */
  readonly columnWidthRatio?: number;
  /**
  * @title 分组中柱子之间的间距
  * @description 分组中柱子之间的间距 [0-1]，仅对分组柱状图适用
  */
  readonly marginRatio?: number;
  /**
  * @title 柱状图最小宽度（像素）
  * @description 柱状图最小宽度（像素）
  */
  readonly minColumnWidth?: number;
  /**
  * @title 柱状图最大宽度（像素）
  * @description 柱状图最大宽度（像素）
  */
  readonly maxColumnWidth?: number;
  /**
  * @title 柱状图柱子的背景
  * @description 配置柱状图柱子的背景
  */
  readonly columnBackground?: { style?: ShapeAttrs };
  /**
  * @title 柱子样式
  * @description 柱子样式配置
  */
  readonly columnStyle?: StyleAttr;
  /**
  * @title 分组字段
  * @description 优先级高于 seriesField , isGroup: true 时会根据 groupField 进行分组
  */
  readonly groupField?: string;
  /**
  * @title 自定义柱状图
  * @description 自定义柱状图 interval 图形元素展示形状
  */
  readonly shape?: string;
  /**
  * @title 图表交互
  * @description 开启下钻交互，以及进行下钻交互的配置
  */
  readonly brush?: BrushCfg;
}
