import { Data, Meta, Options, Region, Tooltip } from '../../types';
import { Axis } from '../../types/axis';
import { Legend } from '../../types/legend';
import { Geometry } from '../../adaptor/geometries/base';

/**
 * 子 view 的配置。暂时不开嵌套 view 的情况
 */
type View = {
  /**
   * view 的布局范围，默认是占满全部
   */
  readonly region?: Region;

  /**
   * view 的中数据
   */
  readonly data: Data;

  /**
   * view 中对应的 meta 字段配置
   */
  readonly meta?: Record<string, Meta>;

  /**
   * 图形 geometry 及映射配置
   */
  readonly geometries: Geometry[];

  /**
   * x 轴配置
   */
  readonly xAxis?: Axis;

  /**
   * y 轴配置
   */
  readonly yAxis?: Axis;

  /**
   * legend 配置
   */
  readonly legend?: Legend;
};

/** 配置类型定义 */
export interface MultiViewOptions extends Omit<Options, 'data' | 'legend' | 'xAxis' | 'yAxis' | 'legend' | 'tooltip'> {
  /**
   * 是否同步子 view 的配置
   * 目前仅仅支持 true / false，后续需要增加 function 的方式进行自定义 view 之前的布局同步
   */
  readonly syncViewPadding?: boolean;
  /**
   * 没一个图层的配置。
   * 每个图层包括有自己的：数据、图形、图形映射。
   */
  readonly views: View[];

  /**
   * tooltip 配置在 chart 层配置
   */
  readonly tooltip?: Tooltip;
}
