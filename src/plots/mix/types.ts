import { Types } from '@antv/g2';
import { Geometry } from '../../adaptor/geometries/base';
import { Data, Meta, Options, Region, Tooltip } from '../../types';
import { Animation } from '../../types/animation';
import { Annotation } from '../../types/annotation';
import { Axis } from '../../types/axis';
import { Interaction } from '../../types/interaction';
import { Legend } from '../../types/legend';
import { Slider } from '../../types/slider';
import { IPlotTypes } from './utils';

/**
 * @title geometry 映射信息
 */
export type IGeometry = Geometry & {
  adjust?: Types.AdjustOption;
};
/**
 * @title 子 view 的配置
 * @description 暂时不开嵌套 view 的情况
 */
export type IView = {
  /**
   * @title view 的布局范围
   * @default "占满全部"
   */
  readonly region?: Region;
  /**
   * @title view 中的数据
   */
  readonly data: Data;
  /**
   * @title view 中对应的 meta 字段配置
   */
  readonly meta?: Record<string, Meta>;
  /**
   * @title 坐标系的配置
   * @description 每一个 view 具有相同的坐标系
   */
  readonly coordinate?: Types.CoordinateOption;
  /**
   * @title 图形 geometry 及映射配置
   */
  readonly geometries: IGeometry[];
  /**
   * @title x,y 轴
   */
  readonly axes?: false | Record<string, Axis>;
  /**
   * @title interactions
   */
  readonly interactions?: Interaction[];
  /**
   * @title annotation
   */
  readonly annotations?: Annotation[];
  /**
   * @title annotation
   */
  readonly animation?: Animation;
  /**
   * @title tooltip
   */
  readonly tooltip?: Tooltip;
};

/**
 * @title 子 plot 的配置
 */
export type IPlot = IPlotTypes & {
  /**
   * @title 数据
   * @description 设置画布具体的数据. 默认基础顶层 data
   */
  readonly data?: Record<string, any>[];
  /**
   * @title plot view 的布局范围
   * @default "占满全部"
   */
  readonly region?: Region;
  /**
   * @title 是否为顶层
   * @description 设置为 true 时，几何图形挂在顶层 chart 对象上，而不是子 view 下。此时 region 设置无效，data 继承顶层 data 配置。
   * @default false
   */
  readonly top?: boolean;
};

/**
 * @title 类型定义
 */
export interface MixOptions
  extends Omit<Options, 'data' | 'legend' | 'xAxis' | 'yAxis' | 'legend' | 'tooltip' | 'slider' | 'scrollbar'> {
  /**
   * @title 顶层数据配置
   */
  readonly data?: Options['data'];
  /**
   * @title 是否同步子 view 的配置
   * @description 目前仅仅支持 true / false，后续需要增加 function 的方式进行自定义 view 之前的布局同步
   */
  readonly syncViewPadding?: boolean;
  /**
   * @title 每一个图层的配置
   * @description 每个图层包括有自己的：数据、图形、图形映射
   */
  readonly views?: IView[];
  /**
   * @title 限定与指定 plot 类型
   * @description 支持使用已有的 plot，限定与指定 plot 类型
   */
  readonly plots?: IPlot[];
  /**
   * @title tooltip 配置
   * @description Mix tooltip 组件配置，统一顶层配置
   * TODO 字段映射
   */
  readonly tooltip?: Tooltip;
  /**
   * @title legend 配置
   * @description Mix 图例配置，统一顶层配置
   */
  readonly legend?: false | Record<string, Legend>;
  /**
   * @title slider 配置
   * @description Mix 缩略轴配置，统一顶层配置
   */
  readonly slider?: Slider;
}
