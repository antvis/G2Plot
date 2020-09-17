import { View } from '@antv/g2';

/**
 * adaptor flow 的参数
 */
export type Params<O> = {
  readonly chart: View;
  readonly options: O;
  /** 一些存储一些扩展信息，用户上游 adaptor 向下游传递临时数据 */
  readonly ext?: Record<string, any>;
};

/**
 * schema 转 G2 的适配器基类
 * 使用 纯函数的方式，这里只是类型定义
 */
export type Adaptor<O> = (params: Params<O>) => void;
