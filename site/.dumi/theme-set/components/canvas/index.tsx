import {
  Area,
  Bar,
  BarOptions,
  Column,
  ColumnOptions,
  Gauge,
  GaugeOptions,
  Heatmap,
  HeatmapOptions,
  Line,
  Pie,
  PieOptions,
  Radar,
  RadarOptions,
  RadialBar,
  RadialBarOptions,
  Scatter,
  ScatterOptions,
  Treemap,
  TreemapOptions,
  Waterfall,
  WaterfallOptions,
} from '@antv/g2plot';
import _ from 'lodash';
import React, { useMemo } from 'react';
import { UseG2Plot } from '../../hooks/use-g2plot';
import { ConfigProps } from '../../type';
import './index.less';

const t = v => v;

export const Canvas: React.FC<ConfigProps> = (props) => {
  const { seriesCount = 3, showAxisTitle, theme } = props;

  /** 图表数据 */
  const data = useMemo(() => {
    const months = [t('Jan'), t('Feb'), t('March'), t('Apr'), t('May'), t('Jun')];
    const result: any[] = [];
    months.forEach((month) => {
      for (let i = 0; i < seriesCount; i += 1) {
        result.push({
          month,
          category: `${t('分类')} ${i + 1}`,
          value: Math.floor(Math.random() * 920 + 40),
        });
      }
    });
    return result;
  }, [seriesCount, t]);

  const barData = useMemo(() => {
    const months = [
      t('Jan'),
      t('Feb'),
      t('March'),
      t('Apr'),
      t('May'),
      t('Jun'),
      t('July'),
      t('Aug'),
      t('Sep'),
      t('Oct'),
      t('Nov'),
      t('Dec'),
    ];
    const result: any[] = [];
    months.forEach((month) => {
      for (let i = 0; i < seriesCount; i += 1) {
        result.push({
          month,
          category: `${t('分类')} ${i + 1}`,
          value: Math.floor(Math.random() * 920 + 40),
        });
      }
    });
    return result;
  }, [seriesCount, t]);

  /** 适用于：折线图、面积图 */
  const options1 = useMemo(() => {
    return {
      data,
      xField: 'month',
      yField: 'value',
      seriesField: 'category',
      meta: {
        month: { type: 'cat' },
      },
      isStack: false,
      theme,
      tooltip: {
        showMarkers: undefined,
      },
      label: {},
      xAxis: { title: showAxisTitle ? {} : null },
      yAxis: { title: showAxisTitle ? {} : null },
    };
  }, [data, theme]);

  /** 适用于：柱状图 */
  const columnOptions = useMemo((): ColumnOptions => {
    return {
      data: barData,
      xField: 'month',
      yField: 'value',
      seriesField: 'category',
      meta: {
        month: { type: 'cat' },
      },
      theme,
      label: {},
      yAxis: { title: showAxisTitle ? {} : null },
    };
  }, [barData, theme]);

  /** 适用于：条形图 */
  const barOptions = useMemo((): BarOptions => {
    return {
      data: barData,
      yField: 'month',
      xField: 'value',
      seriesField: 'category',
      meta: {
        month: { type: 'cat' },
      },
      theme,
      isStack: true,
      label: {},
    };
  }, [barData, theme]);

  /** 饼图数据 */
  const pieData = useMemo(() => {
    const result: any[] = [];
    for (let i = 0; i < seriesCount; i += 1) {
      result.push({
        category: `${t('分类')} ${i + 1}`,
        value: Math.floor(Math.random() * 920 + 40),
      });
    }
    return result;
  }, [seriesCount, t]);

  /** 适用于：饼图 */
  const pieOptions = useMemo((): PieOptions => {
    return {
      data: pieData,
      angleField: 'value',
      colorField: 'category',
      radius: 0.8,
      theme,
    };
  }, [pieData, theme]);

  /** 适用于：玉珏图 */
  const radialBarOptions = useMemo((): RadialBarOptions => {
    return {
      data: pieData,
      xField: 'category',
      colorField: 'category',
      yField: 'value',
      radius: 0.8,
      innerRadius: 0.4,
      barBackground: {
        style: { fill: theme.subColor },
      },
      theme,
    };
  }, [pieData, theme]);

  /** 雷达图数据 */
  const radarData = useMemo(() => {
    const result: any[] = [];
    const names = [t('销售'), t('市场营销'), t('发展'), t('客户支持'), t('信息技术'), t('行政管理')];
    names.forEach((name) => {
      for (let i = 0; i < seriesCount; i += 1) {
        result.push({
          name,
          category: `${t('分类')} ${i + 1}`,
          value: Math.floor(Math.random() * 20 + 140),
        });
      }
    });

    return result;
  }, [seriesCount, t]);

  /** 适用于：雷达图 */
  const radarOptions = useMemo((): RadarOptions => {
    return {
      data: radarData,
      xField: 'name',
      yField: 'value',
      seriesField: 'category',
      tooltip: {
        showMarkers: undefined,
      },
      theme,
    };
  }, [radarData, theme]);

  /** 适用于：色块图 */
  const heatmapOptions = useMemo((): HeatmapOptions => {
    const heatmapData: any[] = [];
    const days = [t('Mon'), t('Thu'), t('Web'), t('Thur'), t('Fri'), t('Sat'), t('Sun')];
    days.forEach((day) => {
      for (let i = 0; i < 12; i++) {
        heatmapData.push({
          day,
          time: `${i}:00`,
          value: Math.floor(Math.random() * 10),
        });
      }
    });
    return {
      data: heatmapData,
      xField: 'time',
      yField: 'day',
      colorField: 'value',
      color: _.join(theme.sequenceColors, '-'),
      theme,
    };
  }, [theme, t]);

  /** 适用于：矩阵树图 */
  const treemapOptions = useMemo((): TreemapOptions => {
    const treemapData: any[] = [];
    for (let i = 0; i < 20; i++) {
      treemapData.push({
        name: `${t('分类')} ${i}`,
        value: Math.floor(Math.random() * 10),
      });
    }
    return {
      data: {
        name: 'root',
        children: treemapData,
      },
      colorField: 'name',
      legend: { position: 'bottom' },
      theme,
    };
  }, [theme, t]);

  /** 适用于：仪表盘 */
  const gaugeOptions = useMemo((): GaugeOptions => {
    const range =
      theme.defaultColor && theme.subColor
        ? {
            range: {
              color: [theme.defaultColor, theme.subColor],
            },
          }
        : {};
    return {
      percent: 0.75,
      axis: {},
      ...range,
      theme,
    };
  }, [theme]);

  const waterfallData = useMemo(() => {
    return [
      { month: t('Jan'), value: 10 },
      { month: t('Feb'), value: 42 },
      { month: t('March'), value: -10 },
      { month: t('Apr'), value: 31 },
      { month: t('May'), value: -12 },
      { month: t('Jun'), value: 10 },
    ];
  }, [t]);

  /** 适用于：瀑布图 */
  const waterfallOptions = useMemo((): WaterfallOptions => {
    const risingFill = theme.semanticRed ? { risingFill: theme.semanticRed } : {};
    const fallingFill = theme.semanticGreen ? { fallingFill: theme.semanticGreen } : {};

    const isBrowser = typeof document !== 'undefined';
    const themeType = isBrowser && document.body.getAttribute('data-theme');

    return {
      data: waterfallData,
      xField: 'month',
      yField: 'value',
      ...risingFill,
      ...fallingFill,
      legend: { position: 'top-left' },
      total: {
        style: {
          fill: themeType === 'dark' ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.25)',
        },
      },
      theme,
    };
  }, [theme, waterfallData]);

  const scatterData = useMemo(() => {
    const result: any[] = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        result.push(
          {
            x: _.random(i + 2, 30, false),
            y: _.random(j + 2, 50, false),
            size: _.random(2, 8),
            genre: t('female'),
          },
          {
            x: _.random(i + 2, 50, false),
            y: _.random(j + 2, 40, false),
            size: _.random(2, 10),
            genre: t('male'),
          }
        );
      }
    }
    return result;
    // 主题变化，改变下数据
  }, [theme, t]);

  /** 适用于：散点图 */
  const scatterOptions = useMemo((): ScatterOptions => {
    return {
      data: scatterData,
      xField: 'x',
      yField: 'y',
      colorField: 'genre',
      sizeField: 'size',
      size: [5, 20],
      shape: 'circle',
      yAxis: { grid: {} },
      legend: { position: 'top-left' },
      sizeLegend: {},
      theme,
    };
  }, [theme, scatterData]);

  /** canvas 容器样式 */
  const containerStyle = useMemo(() => {
    return {
      color: _.get(theme, ['labels', 'style', 'fill']),
    };
  }, [theme]);

  const plotStyle = useMemo(() => {
    return {
      background: theme.background,
    };
  }, [theme]);

  return (
    <div className="canvas-container" style={containerStyle}>
      <UseG2Plot Ctor={Line} title="Line Plot" options={options1} style={plotStyle} />
      <UseG2Plot Ctor={Area} title="Area Plot" options={options1} style={plotStyle} />
      <UseG2Plot
        Ctor={Column}
        title="Stacked Column Plot"
        style={plotStyle}
        options={{
          ...columnOptions,
          isStack: true,
          slider: {},
        }}
      />
      <UseG2Plot
        Ctor={Column}
        title="Group Column Plot"
        style={plotStyle}
        options={{
          ...columnOptions,
          isGroup: true,
          scrollbar: { type: 'horizontal', categorySize: 100 },
        }}
      />
      <UseG2Plot Ctor={Bar} title="Bar Plot" options={barOptions} style={plotStyle} />
      <UseG2Plot
        Ctor={Bar}
        title="Group Bar Plot"
        style={plotStyle}
        options={{
          ...barOptions,
          isGroup: true,
          scrollbar: {
            type: 'vertical',
          },
        }}
      />
      <UseG2Plot Ctor={Waterfall} title="Waterfall Plot" options={waterfallOptions} style={plotStyle} />
      <UseG2Plot Ctor={RadialBar} title="Radial Bar Plot" style={plotStyle} options={radialBarOptions} />
      <UseG2Plot Ctor={Radar} title="Radar Plot" options={radarOptions} style={plotStyle} />
      <UseG2Plot Ctor={Pie} title="Pie Plot" options={pieOptions} style={plotStyle} />
      <UseG2Plot Ctor={Gauge} title="Gauge Plot" options={gaugeOptions} style={plotStyle} />

      <UseG2Plot Ctor={Treemap} title="Treemap Plot" options={treemapOptions} style={plotStyle} />
      <UseG2Plot Ctor={Heatmap} title="Heatmap Plot" options={heatmapOptions} style={plotStyle} />
      <UseG2Plot Ctor={Scatter} title="Scatter Plot" options={scatterOptions} style={plotStyle} />
    </div>
  );
};
