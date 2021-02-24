import { View } from '@antv/g2';
import { deepAssign } from '../../utils';
import { adaptor as lineAdaptor } from '../line/adaptor';
import { adaptor as pieAdaptor } from '../pie/adaptor';
import { adaptor as columnAdaptor } from '../column/adaptor';
import { adaptor as barAdaptor } from '../bar/adaptor';
import { adaptor as areaAdaptor } from '../area/adaptor';
import { adaptor as gaugeAdaptor } from '../gauge/adaptor';
import { adaptor as tinyLineAdaptor } from '../tiny-line/adaptor';
import { adaptor as tinyColumnAdaptor } from '../tiny-column/adaptor';
import { adaptor as tinyAreadaptor } from '../tiny-area/adaptor';
import { adaptor as ringProgressAdaptor } from '../ring-progress/adaptor';
import { adaptor as progressAdaptor } from '../progress/adaptor';
import { Line, LineOptions } from '../line';
import { Pie, PieOptions } from '../pie';
import { Bar, BarOptions } from '../bar';
import { Column, ColumnOptions } from '../column';
import { Area, AreaOptions } from '../area';
import { Gauge, GaugeOptions } from '../gauge';
import { TinyLine, TinyLineOptions } from '../tiny-line';
import { TinyArea, TinyAreaOptions } from '../tiny-area';
import { TinyColumn, TinyColumnOptions } from '../tiny-column';
import { RingProgress, RingProgressOptions } from '../ring-progress';
import { Progress, ProgressOptions } from '../progress';

/**
 * 移除 options 中的 width、height 设置
 */
type OmitSize<T> = Omit<T, 'width' | 'height'>;

/**
 * multi-view 中的支持的 plots 类型（带 options 定义）
 */
export type IPlotTypes =
  | {
      /**
       * plot 类型
       */
      readonly type: 'line';
      /**
       * plot 配置
       */
      readonly options: OmitSize<LineOptions>;
    }
  | {
      readonly type: 'pie';
      readonly options: OmitSize<PieOptions>;
    }
  | {
      readonly type: 'bar';
      readonly options: OmitSize<BarOptions>;
    }
  | {
      readonly type: 'column';
      readonly options: OmitSize<ColumnOptions>;
    }
  | {
      readonly type: 'area';
      readonly options: OmitSize<AreaOptions>;
    }
  | {
      readonly type: 'gauge';
      readonly options: OmitSize<GaugeOptions>;
    }
  | {
      readonly type: 'tiny-line';
      readonly options: OmitSize<TinyLineOptions>;
    }
  | {
      readonly type: 'tiny-area';
      readonly options: OmitSize<TinyAreaOptions>;
    }
  | {
      readonly type: 'tiny-column';
      readonly options: OmitSize<TinyColumnOptions>;
    }
  | {
      readonly type: 'ring-progress';
      readonly options: OmitSize<RingProgressOptions>;
    }
  | {
      readonly type: 'progress';
      readonly options: OmitSize<ProgressOptions>;
    };

/**
 * 可在 multi-view 中使用的 plots
 */
const PLOT_ADAPTORS = {
  line: lineAdaptor,
  pie: pieAdaptor,
  column: columnAdaptor,
  bar: barAdaptor,
  area: areaAdaptor,
  gauge: gaugeAdaptor,
  'tiny-line': tinyLineAdaptor,
  'tiny-column': tinyColumnAdaptor,
  'tiny-area': tinyAreadaptor,
  'ring-progress': ringProgressAdaptor,
  progress: progressAdaptor,
};

/**
 * 获取指定 plot 的 class contructor
 * @param {string} plot
 */
const PLOT_CONSTRUCTOR = {
  line: Line,
  pie: Pie,
  column: Column,
  bar: Bar,
  area: Area,
  gauge: Gauge,
  'tiny-line': TinyLine,
  'tiny-column': TinyColumn,
  'tiny-area': TinyArea,
  'ring-progress': RingProgress,
  progress: Progress,
};

/**
 * 执行 plot 的 adaptor, 默认都带上 defaultOptions
 * @param {string} plot
 */
export function execPlotAdaptor<T extends IPlotTypes['type']>(
  plot: T,
  view: View,
  options: IPlotTypes['options']
): void {
  const cls = PLOT_CONSTRUCTOR[plot];
  if (!cls) {
    console.error(`could not find ${plot} plot`);
    return;
  }
  const module = PLOT_ADAPTORS[plot];
  module({ chart: view, options: deepAssign({}, cls.getDefaultOptions(), options) });
}
