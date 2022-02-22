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
 * @title geometry 映射信息
 */
export type IGeometry = Geometry & {
  adjust?: Types.AdjustOption;
};

/**
 * @title 子 view 的配置
 * @description 1. 暂时不开嵌套 view 的情况 2. 暂不开放 分面子 view 的 meta 独立设置
 */
export type IView = {
  /**
   * @title 图形
   * @description geometry 及映射配置
   */
  readonly geometries: IGeometry[];
  /**
   * @title 数据
   * @description optional，view 中的数据
   */
  readonly data?: Data;
  /**
   * @title meta
   */
  readonly meta?: Record<string, Axis>;
  /**
   * @title 坐标系的配置
   * @description 每一个 view 具有相同的坐标系
   */
  readonly coordinate?: Types.CoordinateOption;
  /**
   * @title 坐标轴配置
   */
  readonly axes?: false | Record<string, Axis>;
  /**
   * @title interactions 配置
   */
  readonly interactions?: Interaction[];
  /**
   * @title annotation 配置
   */
  readonly annotations?: Annotation[];
  /**
   * @title animation 配置
   */
  readonly animation?: Animation;
  /**
   * @title tooltip 配置
   */
  readonly tooltip?: Tooltip;
};

/**
 * @title 子 plot 的配置
 */
export type IPlot = IPlotTypes;
/**
 * @title facetData map
 */
type FacetDataMap = {
  /**
   * @title rect 类型分面配置
   */
  readonly rect: Types.RectData;
  /**
   * @title mirror 类型分面配置
   */
  readonly mirror: Types.MirrorData;
  /**
   * @title list 类型分面配置
   */
  readonly list: Types.ListData;
  /**
   * @title matrix 类型分面配置
   */
  readonly matrix: Types.MatrixData;
  /**
   * @title circle 类型分面配置
   */
  readonly circle: Types.CircleData;
  /**
   * @title tree 类型分面配置
   */
  readonly tree: Types.TreeData;
};

type FacetCfg = Types.MirrorCfg & Types.RectCfg & Types.TreeCfg & Types.ListCfg & Types.CircleCfg & Types.MatrixCfg;

/**
 * @title 分面图的配置类型定义
 */
export interface FacetOptions<T extends keyof Types.FacetCfgMap = keyof Types.FacetCfgMap> extends Options, FacetCfg {
  /**
   * @title 分面类型
   * @description G2 内置了六种分面: rect、list、circle、tree、mirror 和 matrix
   */
  readonly type: T;
  /**
   * @title 数据划分维度
   */
  readonly fields: string[];
  /**
   * @title 分面数据
   */
  readonly data: Data;
  /**
   * @title 绘图
   * @description 每个分面 view 中的具体绘图表现 回调的方式
   */
  readonly eachView: (innerView: View, facet?: FacetDataMap[T]) => IView | IPlot;
  /**
   * @title 是否展示分面标题
   * @default false
   */
  readonly showTitle?: boolean;
  /**
   * @title meta 字段
   * @description facet 中对应的 meta 字段配置
   */
  readonly meta?: Record<string, Meta>;
  /**
   * @title 坐标系的配置
   * @description 每一个 view 具有相同的坐标系
   */
  readonly coordinate?: Types.CoordinateOption;
  /**
   * @title 轴配置
   */
  readonly axes?: false | Record<string, Axis>;
  /**
   * @title tooltip 配置
   */
  readonly tooltip?: Tooltip;
  /**
   * @title 图例配置
   */
  readonly legend?: Legend;
  /**
   * @title 图例配置
   */
  readonly interactions?: Interaction[];
}
