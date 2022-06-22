import { ShapeAttrs } from '@antv/g2';
import { ButtonCfg } from './button';

export type Interaction = {
  readonly type: string;
  readonly cfg?: Record<string, any>;
  /** 是否开启交互, 默认开启 */
  readonly enable?: boolean;
};

/** brush 交互 */
export type BrushCfg = {
  /**
   * @title 是否启用
   * @description 是否启用 brush 交互
   */
  readonly enabled?: boolean;
  /**
   * @title brush 类型
   * @description '矩形', 'x 方向' 和 'y 方向', 'circle', 'path'(不规则矩形). 默认: 'rect'.
   * @default "rect"
   */
  readonly type?: 'rect' | 'x-rect' | 'y-rect' | 'circle' | 'path';
  /**
   * @title brush 操作
   * @description '筛选过滤' 和 '高亮强调'. 默认: 'filter'. 目前只在 type 为 'rect' 的情况下生效
   * @default "filter"
   */
  readonly action?: 'filter' | 'highlight';
  /**
   * @title mask
   * @description brush mask 的配置
   */
  readonly mask?: {
    /**
     * @title mask 样式
     * @description mask 蒙层样式
     */
    style?: ShapeAttrs;
  };
  /**
   * @title button 配置
   * @description brush button 的配置, 只在 action: 'filter' 的情况下适用
   */
  readonly button?: ButtonCfg;

  /**
   * @title 是否允许 brush 交互开始的回调
   * @description 是否允许 brush 交互开始的回调
   */
  readonly isStartEnable?: (context: any) => boolean;
};
