import { Column } from '@antv/g2plot';

const data = [
  { month: '1', value: 1078 },
  { month: '2', value: 1216 },
  { month: '3', value: 758 },
  { month: '4', value: 623 },
  { month: '5', value: 319 },
  { month: '6', value: 422 },
  { month: '7', value: -4 },
  { month: '8', value: -217 },
  { month: '9', value: -358 },
  { month: '10', value: 1513 },
  { month: '11', value: 1388 },
  { month: '12', value: 597 },
];

const columnPlot = new Column('container', {
  data,
  padding: 'auto',
  xField: 'month',
  yField: 'value',
  meta: {
    value: {
      max: 2000,
      min: -1000,
    },
    month: {
      formatter: (val) => `${val} 月`,
    },
  },
  annotations: [
    {
      type: 'region',
      // @ts-ignore todo 修复 G2 类型定义
      start: (xScale: any) => {
        const ratio = xScale.ticks ? 1 / xScale.ticks.length : 1;
        const x = xScale.scale('7') - ratio / 2;
        return [`${x * 100}%`, '0%'];
      },
      // @ts-ignore todo 修复 G2 类型定义
      end: (xScale: any) => {
        const ratio = xScale.ticks ? 1 / xScale.ticks.length : 1;
        const x = xScale.scale('9') + ratio / 2;
        return [`${x * 100}%`, '100%'];
      },
    },
  ],
});

columnPlot.render();
