import { Lab } from '@antv/g2plot';

// Step 1: 声明数据源
// G2Plot 对数据源格式的要求，仅仅是 JSON 数组，数组的每个元素是一个标准 JSON 对象。
const data = [
  { area: 'Central', value: 0.218 },
  { area: 'East', value: 0.295 },
  { area: 'South', value: 0.171 },
  { area: 'West', value: 0.316 },
];

const defaultGrey = '#BFBFBF';
const semanticGreen = '#30BF78'; /** 语义绿 */

// Step 2: 创建图表
const labPlot = new Lab.MultiView('container', {
  appendPadding: 8,
  views: [
    {
      region: { start: { x: 0, y: 0 }, end: { x: 1 / 2, y: 2 / 5 } },
      data, // 图表数据
      meta: {
        value: {
          alias: '销售额(万)',
        },
      },
      axes: { area: { tickLine: false }, value: false },
      coordinate: { cfg: { isTransposed: true } },
      geometries: [
        {
          type: 'interval',
          xField: 'area',
          yField: 'value',
          mapping: {
            style: ({ value }) => ({ fill: value > 0.3 ? semanticGreen : defaultGrey, lineWidth: 1 }),
          },
          label: {
            position: 'left',
            formatter: ({ value }) => `${(value * 100).toFixed(1)}%`,
            style: { fill: '#fff' },
          },
        },
      ],
    },
    {
      region: { start: { x: 1 / 2, y: 0 }, end: { x: 1, y: 2 / 5 } },
      data, // 图表数据
      meta: {
        value: {
          alias: '销售额(万)',
        },
      },
      axes: { area: { tickLine: false }, value: false },
      coordinate: { cfg: { isTransposed: true } },
      geometries: [
        {
          type: 'interval',
          xField: 'area',
          yField: 'value',
          mapping: {
            style: ({ value }) => ({ fillOpacity: 0, stroke: value > 0.3 ? semanticGreen : defaultGrey, lineWidth: 1 }),
          },
          label: { position: 'left', formatter: ({ value }) => `${(value * 100).toFixed(1)}%` },
        },
      ],
    },
    {
      region: { start: { x: 0, y: 1 / 2 }, end: { x: 1 / 2, y: 1 } },
      data, // 图表数据
      meta: {
        value: {
          alias: '销售额(万)',
          max: 0.5,
          min: 0,
        },
      },
      axes: { area: { tickLine: false }, value: false },
      coordinate: { cfg: { isTransposed: true } },
      geometries: [
        {
          type: 'interval',
          xField: 'area',
          yField: 'value',
          mapping: {
            style: ({ value }) => ({ fillOpacity: 0 }),
          },
          label: { position: 'right', formatter: ({ value }) => `${(value * 100).toFixed(1)}%` },
        },
      ],

      annotations: [
        ...data.map((d) => {
          return {
            type: 'html',
            position: d,
            offsetX: -1,
            html: () =>
              `<div style="border:1.5px solid ${
                d.value > 0.3 ? semanticGreen : defaultGrey
              };width:12px;height:12px;transform:translateY(-50%);border-radius:12px;"></div>`,
            style: {
              fill: d.value > 0.3 ? semanticGreen : defaultGrey,
              fontWeight: 800,
            },
          };
        }),
        ...data.map((d) => {
          return {
            type: 'line',
            start: [d.area, 'min'],
            end: [d.area, d.value],
            style: {
              lineWidth: 4,
              stroke: d.value > 0.3 ? semanticGreen : defaultGrey,
            },
          };
        }),
      ],
    },
    {
      region: { start: { x: 1 / 2, y: 1 / 2 }, end: { x: 1, y: 1 } },
      data, // 图表数据
      meta: {
        value: {
          alias: '销售额(万)',
          min: 0,
          max: 1,
        },
      },
      axes: {
        area: { label: { style: { fillOpacity: 0 } }, tickLine: false },
        value: false,
      },
      coordinate: { cfg: { isTransposed: true } },
      label: {
        offsetX: -4,
        style: { fill: '#Fff' },
        formatter: ({ area, value }) => {
          return `${area}\n${(value * 100).toFixed(1)}%`;
        },
      },
      geometries: [
        {
          type: 'interval',
          xField: 'area',
          yField: 'value',
          label: {
            offsetX: -8,
            position: 'left',
            style: { fill: '#fff', fontSize: 12 },
            formatter: ({ area, value }) => {
              return `${area}\n${(value * 100).toFixed(1)}%`;
            },
          },
          mapping: {
            style: ({ value }) => ({ fill: value > 0.3 ? semanticGreen : defaultGrey }),
          },
        },
      ],
      annotations: data.map((d, idx) => {
        return {
          type: 'line',
          start: [3 - idx - 0.4, 'min'],
          end: [3 - idx - 0.4, 'max'],
          style: {
            lineWidth: 2,
            stroke: '#595959',
          },
        };
      }),
    },
  ],
});
labPlot.chart.theme({
  columnWidthRatio: 0.85,
});
// Step 3: 渲染图表
labPlot.render();
