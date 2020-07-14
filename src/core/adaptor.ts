import { Chart, Geometry } from '@antv/g2';
import { Options } from '../types';

/**
 * adaptor flow 的参数
 */
export type Params<O extends Options> = {
  readonly chart: Chart;
  readonly options: O;
  readonly geometry?: Geometry;
};

/**
 * schema 转 G2 的适配器基类
 * 使用 纯函数的方式，这里只是类型定义
 */
export type Adaptor<O extends Options> = (params: Params<O>) => void;
