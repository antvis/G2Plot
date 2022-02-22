import { ScaleConfig } from '@antv/g2';

/** scale 元信息，取名为 meta */
export type Meta = ScaleConfig & {
  /**
   * @title mescale 的 type 类型ta
   * @description 对于连续的，一般是 linear，对于分类一般为 cat。当然也有 log, pow, time 等类型，或者通过 tickMethod 自定义自己的 scale
   */
  readonly type?: string;
  /**
   * @title 是否进行 scale 的同步
   * @description 设置为 false 则不同步； 设置为 true 则以 field 为 key 进行同步；设置为 string，则以这个 string 为 key 进行同步
   */
  readonly sync?: boolean | string;
};
