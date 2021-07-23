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
  /** Enable or disable the brush interaction */
  readonly enabled?: boolean;
  /** brush 类型: '矩形', 'x 方向' 和 'y 方向', 'circle', 'path'(不规则矩形). 默认: 'rect'. */
  readonly type?: 'rect' | 'x-rect' | 'y-rect' | 'circle' | 'path';
  /** brush 操作: '筛选过滤' 和 '高亮强调'. 默认: 'filter'. 目前只在 type 为 'rect' 的情况下生效 */
  readonly action?: 'filter' | 'highlight';
  /** brush mask 的配置 */
  readonly mask?: {
    /** mask 蒙层样式 */
    style?: ShapeAttrs;
  };
  /** brush button 的配置, 只在 action: 'filter' 的情况下适用 */
  readonly button?: ButtonCfg;
};
