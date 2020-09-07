export type Interaction = {
  readonly type: string;
  readonly cfg?: Record<string, any>;
  /** 是否开启交互, 默认开启 */
  readonly enable?: boolean;
};
