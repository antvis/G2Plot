import { ShapeAttrs } from '@antv/g2';

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
  /** brush 类型: '矩形', 'x 方向' 和 'y 方向'. 默认: 'rect', 目前不支持 polygon 不规则矩形 */
  readonly type?: 'rect' | 'x' | 'y';
  /** brush 操作: '筛选过滤' 和 '高亮强调'. 默认: 'filter'. 目前只在 type 为 'rect' 的情况下生效 */
  readonly action?: 'filter' | 'highlight';
  /** brush mask 的配置 */
  readonly mask?: {
    style?: ShapeAttrs;
  };
};
