import { ShapeStyle } from '../../types/style';
import { Axis } from '../../types/axis';
import { Options } from '../../types';

export interface LineConfig {
  color?: string;
  lineSize?: number;
  lineStyle?: ShapeStyle | (() => ShapeStyle);
  smooth?: boolean; // 是否平滑
  connectNulls?: boolean; // 是否连接空数据
  point?: {
    visible?: boolean;
    shape?: string;
    size?: number;
    color?: string;
    style?: ShapeStyle;
  };
  label?: any;
}

export type ComboOptionType = {
  readonly xField: string; 
  readonly yField: string[];
  /**增加 Y 轴的 leftConfig and rightConfig */
  readonly yAxis?: Axis[];
  /**图形样式 */
  readonly lineConfigs?: LineConfig[]
}

/*
 艾因: 这里理论上来说应该应该直接继承 Options, 但因为 Option 里声明了 yAxis, 双轴图的 YAxis 有所不同。接口继承非函数类属性时无法重写
 先暂时用交叉类型，接下来看是否可将 Options  做进一步拆分
*/
type ComboCommonOptionType = Options & ComboOptionType;

export interface ComboOption extends ComboCommonOptionType {}