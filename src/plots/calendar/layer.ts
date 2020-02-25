import * as _ from '@antv/util';
import fecha from 'fecha';
import { DataItem, LayerConfig, ViewConfig } from '../..';
import ViewLayer from '../../base/view-layer';
import { DAY_FIELD, FORMATTER, MONTHS, WEEK_FIELD, WEEKS } from './constant';
import { generateCalendarData, getMonthCenterWeek } from './util';
import { registerPlotType } from '../../base/global';
import { getDateRange } from '../../util/date';

/** 日历图配置定义 */
export interface CalendarViewConfig extends ViewConfig {
  /** 字段信息 */
  readonly dateField: string; // YYYY-MM-DD
  /** 映射的颜色值字段 */
  readonly valueField: string;
  /** 日历图的起止时间：[2019-10, 2020-03] */
  readonly dateRange?: string[];
  // 映射的颜色色板
  readonly colors?: string[] | string;
  // 对应的月份枚举
  readonly months?: string[];
  // 对应的星期枚举值
  readonly weeks?: string[];
}

interface CalendarLayerConfig extends CalendarViewConfig, LayerConfig {}

/**
 * 日历图
 */
export default class CalendarLayer extends ViewLayer<CalendarLayerConfig> {
  public type: string = 'calendar';

  public static getDefaultOptions(): Partial<CalendarLayerConfig> {
    return _.deepMix({}, super.getDefaultOptions(), {
      xAxis: { line: null, grid: null, tickLine: null },
      yAxis: { line: null, grid: null, tickLine: null },
      legend: { visible: false },
      meta: {
        [DAY_FIELD]: {
          type: 'cat',
          alias: 'Day',
          values: [ 0, 1, 2, 3, 4, 5, 6 ]
        },
        [WEEK_FIELD]: {
          type: 'cat',
          alias: 'Week',
        }
      },
      tooltip: {
        visible: true,
        showTitle: true,
        title: 'date',
      },
    });
  }

  /**
   * 复写父类的数据处理类，主要完成：
   * 1. 生成 polygon 的 x y field（虚拟的，无需用户传入）
   *
   * @param data
   */
  protected processData(data?: DataItem[]): DataItem[] | undefined {
    const { dateField } = this.options;
    let { dateRange } = this.options;

    // 给与默认值是当前这一年
    if (_.isNil(dateRange)) {
      const dates = _.map(data, (datum: DataItem) => fecha.parse(`${datum[dateField]}`, FORMATTER));
      dateRange = getDateRange(dates);
    }

    return generateCalendarData(data, dateRange, dateField);
  }

  protected addGeometry(): void {
    const { valueField, colors } = this.options;
    const polygonConfig: any = {
      type: 'polygon',
      position: {
        fields: [WEEK_FIELD, DAY_FIELD],
      },
      shape: {
        values: ['calendar-polygon'],
      },
      color: {
        fields: [valueField],
        values: colors,
      },
    };

    this.setConfig('geometry', polygonConfig);
  }

  /**
   * 写入坐标系配置，默认增加镜像
   */
  protected coord(): void {
    // 默认做镜像处理
    const coordinateConfig = {
      type: 'rect',
      cfg: {},
      actions: [['reflect', 'y']],
    } as any;
    this.setConfig('coordinate', coordinateConfig);
  }

  /**
   * 无需 geometry parser，直接使用 polygon 即可
   */
  protected geometryParser(dim: string, type: string): string {
    return '';
  }

  protected axis(): void {
    const { xAxis, yAxis } = this.options;

    /** 存储坐标轴配置项到config */
    this.setConfig('axes', {
      [WEEK_FIELD]: xAxis,
      [DAY_FIELD]: yAxis,
    });
  }

  protected scale(): void {
    super.scale();

    const monthWeek = getMonthCenterWeek(this.options.dateRange);

    // 拿出 scale 二次加工，主要是配置 x y 中的标题显示
    const scales = this.config.scales;
    const { weeks = WEEKS, months = MONTHS } = this.options;

    const x = scales[WEEK_FIELD];
    const y = scales[DAY_FIELD];

    x.formatter = (v) => {
      const m = monthWeek[v];
      return m !== undefined ? months[m] : '';
    };

    y.formatter = (v) => weeks[v] || '';


    this.setConfig('scales', scales);
  }
}

// 注册到池子中
registerPlotType('calendar', CalendarLayer);
