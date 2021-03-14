import { MultiView } from '@antv/g2plot';

// Step 1: 声明数据源
// G2Plot 对数据源格式的要求，仅仅是 JSON 数组，数组的每个元素是一个标准 JSON 对象。
const data = [
  { area: 'Central', value: 0.218 },
  { area: 'East', value: 0.295 },
  { area: 'South', value: 0.171 },
  { area: 'West', value: 0.316 },
];

const defaultGrey = '#BFBFBF';

// Step 2: 创建图表

const plot = new MultiView('container', {
  appendPadding: 8,
  tooltip: { showMarkers: false },
});

plot.chart.theme({
  defaultColor: '#30BF78' /** 语义绿 */,
});

plot.update({
  plots: [
    {
      region: { start: { x: 0, y: 0 }, end: { x: 1 / 2, y: 2 / 5 } },
      type: 'bar',
      options: {
        data, // 图表数据
        yField: 'area',
        xField: 'value',
        yAxis: { tickLine: null },
        xAxis: false,
        seriesField: 'area',
        label: {
          position: 'left',
          layout: { type: 'adjust-color' },
          formatter: ({ value }) => `${(value * 100).toFixed(1)}%`,
          style: { fill: '#fff' },
        },
        color: ({ area }) => {
          const value = data.find((d) => d.area === area)?.value;
          return value > 0.3 ? plot.chart.getTheme().defaultColor : defaultGrey;
        },
        barStyle: { lineWidth: 1 },
      },
    },
    {
      region: { start: { x: 1 / 2, y: 0 }, end: { x: 1, y: 2 / 5 } },
      type: 'bar',
      options: {
        data, // 图表数据
        yField: 'area',
        xField: 'value',
        yAxis: { tickLine: null },
        xAxis: false,
        label: {},
        color: ({ area }) => {
          const value = data.find((d) => d.area === area)?.value;
          return value > 0.3 ? plot.chart.getTheme().defaultColor : defaultGrey;
        },
        barStyle: ({ value }) => {
          return {
            lineWidth: 1,
            fillOpacity: 0,
            stroke: value > 0.3 ? plot.chart.getTheme().defaultColor : defaultGrey,
          };
        },
      },
    },
    {
      region: { start: { x: 1 / 2, y: 1 / 2 }, end: { x: 1, y: 1 } },
      type: 'bar',
      options: {
        data, // 图表数据
        meta: {
          value: {
            alias: '销售额(万)',
            min: 0,
            max: 1,
          },
        },
        yAxis: { label: { style: { fillOpacity: 0 } }, tickLine: null },
        xAxis: false,
        label: {
          offsetX: -4,
          position: 'left',
          layout: { type: 'adjust-color' },
          style: { fill: '#fff', fontSize: 12 },
          formatter: ({ area, value }) => {
            return `${area}\n${(value * 100).toFixed(1)}%`;
          },
        },
        yField: 'area',
        xField: 'value',
        color: ({ area }) => {
          const value = data.find((d) => d.area === area).value;
          return value > 0.3 ? plot.chart.getTheme().defaultColor : defaultGrey;
        },
        annotations: data.map((d, idx) => {
          return {
            type: 'line',
            start: [3 - idx - 0.25, 'min'],
            end: [3 - idx - 0.25, 'max'],
            style: {
              lineWidth: 2,
              stroke: '#595959',
            },
          };
        }),
      },
    },
  ],
  views: [
    {
      region: { start: { x: 0, y: 1 / 2 }, end: { x: 1 / 2, y: 1 } },
      data: [...data].reverse(), // 图表数据
      meta: {
        value: {
          alias: '销售额(万)',
          max: 0.5,
          min: 0,
        },
      },
      axes: { area: { tickLine: null }, value: false },
      coordinate: { cfg: { isTransposed: true } },
      geometries: [
        {
          type: 'point',
          xField: 'area',
          yField: 'value',
          mapping: {
            color: ({ area }) => {
              const value = data.find((d) => d.area === area).value;
              return value > 0.3 ? plot.chart.getTheme().defaultColor : defaultGrey;
            },
            style: ({ value }) => {
              return {
                r: 4,
                strokeOpacity: 0,
                fill: value > 0.3 ? plot.chart.getTheme().defaultColor : defaultGrey,
              };
            },
          },
          label: {
            offsetY: -12,
            offsetX: 8,
            style: { textAlign: 'right' },
            position: 'top',
            formatter: ({ value }) => `${(value * 100).toFixed(1)}%`,
          },
        },
      ],
      // @ts-ignore
      annotations: [
        ...data.map((d) => {
          return {
            type: 'line',
            start: [d.area, 'min'],
            end: [d.area, 'max'],
            top: false,
            style: {
              lineWidth: 2,
              radius: 2,
              lineDash: [2, 4],
              stroke: defaultGrey,
            },
          };
        }),
      ],
    },
  ],
});
// Step 3: 渲染图表
plot.render();
