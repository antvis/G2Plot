import * as _ from '@antv/util';
import fecha from 'fecha';
import { DataItem, LayerConfig, ViewConfig } from '../..';
import ViewLayer from '../../base/view-layer';
import { DAY_FIELD, FORMATTER, WEEK_FIELD } from './constant';
import { CoordinateType } from '@antv/g2/lib/plot/interface';
import { generateCalendarData } from './util';
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
      xAxis: { line: null, grid: null }, // TODO x y axis 配置没有生效
      yAxis: { line: null, grid: null },
      legend: { visible: false },
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
      // TODO 数据标签功能
      // label: this.extractLabel(),
    };

    this.setConfig('element', polygonConfig);
  }

  /**
   * 写入坐标系配置，默认增加镜像
   */
  protected coord(): void {
    const props = this.options;
    // 默认做镜像处理
    const coordinateConfig = {
      type: 'rect' as CoordinateType,
      cfg: {},
      actions: [['reflect', 'y']],
    };
    this.setConfig('coord', coordinateConfig);
  }

  /**
   * 无需 geometry parser，直接使用 polygon 即可
   */
  protected geometryParser(dim: string, type: string): string {
    return '';
  }
}

// 注册到池子中
registerPlotType('calendar', CalendarLayer);
