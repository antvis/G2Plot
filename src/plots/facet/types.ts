import { View, Types } from '@antv/g2';
import { Data, Meta, Options, Tooltip } from '../../types';
import { Axis } from '../../types/axis';
import { Legend } from '../../types/legend';
import { Geometry } from '../../adaptor/geometries/base';
import { Animation } from '../../types/animation';
import { Annotation } from '../../types/annotation';
import { Interaction } from '../../types/interaction';
import { IPlotTypes } from '../mix/utils';

/**
 * geometry 映射信息
 */
export type IGeometry = Geometry & {
  adjust?: Types.AdjustOption;
};

/**
 * 子 view 的配置。
 * 1. 暂时不开嵌套 view 的情况
 * 2. 暂不开放 分面子 view 的 meta 独立设置
 */
export type IView = {
  /**
   * 图形 geometry 及映射配置
   */
  readonly geometries: IGeometry[];

  /**
   * 1. optional，view 中的数据，默认由分面数据来根据拆分维度值进行分配
   */
  readonly data?: Data;

  /**
   * 2. meta
   */
  readonly meta?: Record<string, Axis>;

  /**
   * 3. 坐标系的配置，每一个 view 具有相同的坐标系
   */
  readonly coordinate?: Types.CoordinateOption;

  /**
   * 4. 坐标轴配置
   */
  readonly axes?: false | Record<string, Axis>;

  /**
   * 5. interactions 配置
   */
  readonly interactions?: Interaction[];

  /**
   * 6. annotation 配置
   */
  readonly annotations?: Annotation[];

  /**
   * 7. animation 配置
   */
  readonly animation?: Animation;

  /**
   * 8. tooltip 配置
   */
  readonly tooltip?: Tooltip;
};

/**
 * 子 plot 的配置
 */
export type IPlot = IPlotTypes;
/**
 * facetData map
 */
type FacetDataMap = {
  /** rect 类型分面配置 */
  readonly rect: Types.RectData;
  /** mirror 类型分面配置 */
  readonly mirror: Types.MirrorData;
  /** list 类型分面配置 */
  readonly list: Types.ListData;
  /** matrix 类型分面配置 */
  readonly matrix: Types.MatrixData;
  /** circle 类型分面配置 */
  readonly circle: Types.CircleData;
  /** tree 类型分面配置 */
  readonly tree: Types.TreeData;
};

type FacetCfg = Types.MirrorCfg & Types.RectCfg & Types.TreeCfg & Types.ListCfg & Types.CircleCfg & Types.MatrixCfg;

/** 分面图的配置类型定义 */
export interface FacetOptions<T extends keyof Types.FacetCfgMap = keyof Types.FacetCfgMap> extends Options, FacetCfg {
  /**
   * 分面类型，G2 内置了六种分面: rect、list、circle、tree、mirror 和 matrix
   */
  readonly type: T;
  /**
   * 数据划分维度。
   */
  readonly fields: string[];
  /**
   * 分面数据
   */
  readonly data: Data;

  /**
   * 每个分面 view 中的具体绘图表现
   * 回调的方式
   */
  readonly eachView: (innerView: View, facet?: FacetDataMap[T]) => IView | IPlot;
  /**
   * 是否展示分面标题
   */
  readonly showTitle?: boolean;

  /**
   * 3. facet 中对应的 meta 字段配置
   */
  readonly meta?: Record<string, Meta>;

  /**
   * 4. 坐标系的配置，每一个 view 具有相同的坐标系
   */
  readonly coordinate?: Types.CoordinateOption;

  /**
   * 5. 轴配置
   */
  readonly axes?: false | Record<string, Axis>;

  /**
   * 6. tooltip 配置
   */
  readonly tooltip?: Tooltip;

  /**
   * 7. 图例配置
   */
  readonly legend?: Legend;

  /**
   * 8. 图例配置
   */
  readonly interactions?: Interaction[];
}
