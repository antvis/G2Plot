import { View } from '@antv/g2';
import { get } from '@antv/util';
import { deepAssign } from '../../utils';
import { adaptor as lineAdaptor } from '../line/adaptor';
import { adaptor as pieAdaptor } from '../pie/adaptor';
import { adaptor as columnAdaptor } from '../column/adaptor';
import { adaptor as barAdaptor } from '../bar/adaptor';
import { adaptor as areaAdaptor } from '../area/adaptor';
import { adaptor as gaugeAdaptor } from '../gauge/adaptor';
import { adaptor as tinyLineAdaptor } from '../tiny-line/adaptor';
import { adaptor as tinyColumnAdaptor } from '../tiny-column/adaptor';
import { adaptor as tinyAreaAdaptor } from '../tiny-area/adaptor';
import { adaptor as ringProgressAdaptor } from '../ring-progress/adaptor';
import { adaptor as progressAdaptor } from '../progress/adaptor';
import { adaptor as scatterAdaptor } from '../scatter/adaptor';
import { adaptor as histogramAdaptor } from '../histogram/adaptor';
import { adaptor as funnelAdaptor } from '../funnel/adaptor';
import { adaptor as stockAdaptor } from '../stock/adaptor';
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
import { Scatter, ScatterOptions } from '../scatter';
import { Histogram, HistogramOptions } from '../histogram';
import { Funnel, FunnelOptions } from '../funnel';
import { Stock, StockOptions } from '../stock';
import { Options } from '../../types';

/**
 * 移除 options 中的 width、height 设置, 将 options 的 data 设置为可选
 */
type PlotOptions<T> = Omit<T, 'width' | 'height' | 'data'> & Partial<Pick<T extends Options ? T : never, 'data'>>;

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
      readonly options: PlotOptions<LineOptions>;
    }
  | {
      readonly type: 'pie';
      readonly options: PlotOptions<PieOptions>;
    }
  | {
      readonly type: 'bar';
      readonly options: PlotOptions<BarOptions>;
    }
  | {
      readonly type: 'column';
      readonly options: PlotOptions<ColumnOptions>;
    }
  | {
      readonly type: 'area';
      readonly options: PlotOptions<AreaOptions>;
    }
  | {
      readonly type: 'gauge';
      readonly options: PlotOptions<GaugeOptions>;
    }
  | {
      readonly type: 'tiny-line';
      readonly options: PlotOptions<TinyLineOptions>;
    }
  | {
      readonly type: 'tiny-area';
      readonly options: PlotOptions<TinyAreaOptions>;
    }
  | {
      readonly type: 'tiny-column';
      readonly options: PlotOptions<TinyColumnOptions>;
    }
  | {
      readonly type: 'ring-progress';
      readonly options: PlotOptions<RingProgressOptions>;
    }
  | {
      readonly type: 'progress';
      readonly options: PlotOptions<ProgressOptions>;
    }
  | {
      readonly type: 'histogram';
      readonly options: PlotOptions<HistogramOptions>;
    }
  | {
      readonly type: 'scatter';
      readonly options: PlotOptions<ScatterOptions>;
    }
  | {
      readonly type: 'funnel';
      readonly options: PlotOptions<FunnelOptions>;
    }
  | {
      readonly type: 'stock';
      readonly options: PlotOptions<StockOptions>;
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
  'tiny-area': tinyAreaAdaptor,
  'ring-progress': ringProgressAdaptor,
  progress: progressAdaptor,
  scatter: scatterAdaptor,
  histogram: histogramAdaptor,
  funnel: funnelAdaptor,
  stock: stockAdaptor,
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
  scatter: Scatter,
  histogram: Histogram,
  funnel: Funnel,
  stock: Stock,
};

/**
 * 在 mix 图表以及 facet 图表中，defaultOptions 进行复写简化
 */
const DEFAULT_OPTIONS_MAP = {
  pie: { label: false },
  column: { tooltip: { showMarkers: false } },
  bar: { tooltip: { showMarkers: false } },
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
  module({
    chart: view,
    options: deepAssign({}, cls.getDefaultOptions(), get(DEFAULT_OPTIONS_MAP, plot, {}), options),
  });
}
