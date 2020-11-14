import { AdjustOption, CoordinateOption } from '@antv/g2/lib/interface';
import { Data, Meta, Options, Region, Tooltip } from '../../types';
import { Axis } from '../../types/axis';
import { Legend } from '../../types/legend';
import { Geometry } from '../../adaptor/geometries/base';
import { Annotation } from '../../types/annotation';

/**
 * geometry 映射信息
 */
export type IGeometry = Geometry & {
  adjust?: AdjustOption;
};

/**
 * 子 view 的配置。暂时不开嵌套 view 的情况
 */
export type IView = {
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
   * 坐标系的配置，每一个 view 具有相同的坐标系
   */
  readonly coordinate?: CoordinateOption;

  /**
   * 图形 geometry 及映射配置
   */
  readonly geometries: IGeometry[];

  /**
   * x,y  轴配置
   */
  readonly axes?: false | Record<string, Axis>;

  /**
   * annotation 配置
   */
  readonly annotations?: Annotation[];
};

/** 配置类型定义 */
export interface MultiViewOptions
  extends Omit<Options, 'data' | 'legend' | 'xAxis' | 'yAxis' | 'legend' | 'tooltip' | 'slider' | 'scrollbar'> {
  /**
   * 是否同步子 view 的配置
   * 目前仅仅支持 true / false，后续需要增加 function 的方式进行自定义 view 之前的布局同步
   */
  readonly syncViewPadding?: boolean;
  /**
   * 没一个图层的配置。
   * 每个图层包括有自己的：数据、图形、图形映射。
   */
  readonly views: IView[];

  /**
   * tooltip 配置在 chart 层配置
   */
  readonly tooltip?: Tooltip;

  /**
   * legend 配置，统一顶层配置
   */
  readonly legend?: false | Record<string, Legend>;
}
