import { ShapeAttrs } from '@antv/g-base';
import { Options } from '../../types';
import { BarOptions } from '../bar';

/** 配置类型定义 */
export interface RadialBarOptions extends Options, Pick<BarOptions, 'barBackground' | 'minBarWidth' | 'maxBarWidth'> {
  /**
  * @title x轴字段
  * @description x轴字段
  */
  readonly xField?: string;
  /**
  * @title y轴字段
  * @description y轴字段
  */
  readonly yField?: string;
  /**
  * @title 样式
  * @description 样式
  */
  readonly barStyle?: ShapeAttrs;
  /**
  * @title 最大旋转角度
  * @description 范围0-360
  */
  readonly maxAngle?: number;
  /**
  * @title 圆半径
  * @description 圆半径
  */
  readonly radius?: number;
  /**
  * @title 圆内半径
  * @description 圆内半径
  */
  readonly innerRadius?: number;
  /**
  * @title 圆环的开始角度
  * @description 圆环的开始角度
  */
  readonly startAngle?: number;
  /**
  * @title 圆环的结束角度
  * @description 圆环的结束角度
  */
  readonly endAngle?: number;
  /**
  * @title 颜色字段
  * @description 颜色字段
  */
  readonly colorField?: string;
  /**
  * @title 类型
  * @description 类型
  */
  readonly type?: string;
  /**
  * @title 叠加
  * @description 叠加
  */
  readonly isStack?: boolean;
  /**
  * @title 分组
  * @description 分组
  */
  readonly isGroup?: boolean;
}
