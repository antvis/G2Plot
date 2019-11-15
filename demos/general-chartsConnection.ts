// 图表联动

const stateManager = new g2plot.StateManager(); // tslint:disable-line
const color = ['#69755a', '#a2aac6', '#d1ad4e', '#cfcab3', '#beceb7'];
// 原始数据
const data1 = [
  {
    date: '2018/8/1',
    type: 'download',
    value: 4623,
  },
  {
    date: '2018/8/1',
    type: 'register',
    value: 2208,
  },
  {
    date: '2018/8/1',
    type: 'bill',
    value: 182,
  },
  {
    date: '2018/8/2',
    type: 'download',
    value: 6145,
  },
  {
    date: '2018/8/2',
    type: 'register',
    value: 2016,
  },
  {
    date: '2018/8/2',
    type: 'bill',
    value: 257,
  },
  {
    date: '2018/8/3',
    type: 'download',
    value: 508,
  },
  {
    date: '2018/8/3',
    type: 'register',
    value: 2916,
  },
  {
    date: '2018/8/3',
    type: 'bill',
    value: 289,
  },
  {
    date: '2018/8/4',
    type: 'download',
    value: 6268,
  },
  {
    date: '2018/8/4',
    type: 'register',
    value: 4512,
  },
  {
    date: '2018/8/4',
    type: 'bill',
    value: 428,
  },
  {
    date: '2018/8/5',
    type: 'download',
    value: 6411,
  },
  {
    date: '2018/8/5',
    type: 'register',
    value: 8281,
  },
  {
    date: '2018/8/5',
    type: 'bill',
    value: 619,
  },
  {
    date: '2018/8/6',
    type: 'download',
    value: 1890,
  },
  {
    date: '2018/8/6',
    type: 'register',
    value: 2008,
  },
  {
    date: '2018/8/6',
    type: 'bill',
    value: 87,
  },
  {
    date: '2018/8/7',
    type: 'download',
    value: 4251,
  },
  {
    date: '2018/8/7',
    type: 'register',
    value: 1963,
  },
  {
    date: '2018/8/7',
    type: 'bill',
    value: 706,
  },
  {
    date: '2018/8/8',
    type: 'download',
    value: 2978,
  },
  {
    date: '2018/8/8',
    type: 'register',
    value: 2367,
  },
  {
    date: '2018/8/8',
    type: 'bill',
    value: 387,
  },
  {
    date: '2018/8/9',
    type: 'download',
    value: 3880,
  },
  {
    date: '2018/8/9',
    type: 'register',
    value: 2956,
  },
  {
    date: '2018/8/9',
    type: 'bill',
    value: 488,
  },
  {
    date: '2018/8/10',
    type: 'download',
    value: 3606,
  },
  {
    date: '2018/8/10',
    type: 'register',
    value: 678,
  },
  {
    date: '2018/8/10',
    type: 'bill',
    value: 507,
  },
  {
    date: '2018/8/11',
    type: 'download',
    value: 4311,
  },
  {
    date: '2018/8/11',
    type: 'register',
    value: 3188,
  },
  {
    date: '2018/8/11',
    type: 'bill',
    value: 548,
  },
  {
    date: '2018/8/12',
    type: 'download',
    value: 4116,
  },
  {
    date: '2018/8/12',
    type: 'register',
    value: 3491,
  },
  {
    date: '2018/8/12',
    type: 'bill',
    value: 456,
  },
  {
    date: '2018/8/13',
    type: 'download',
    value: 6419,
  },
  {
    date: '2018/8/13',
    type: 'register',
    value: 2852,
  },
  {
    date: '2018/8/13',
    type: 'bill',
    value: 689,
  },
  {
    date: '2018/8/14',
    type: 'download',
    value: 1643,
  },
  {
    date: '2018/8/14',
    type: 'register',
    value: 4788,
  },
  {
    date: '2018/8/14',
    type: 'bill',
    value: 280,
  },
  {
    date: '2018/8/15',
    type: 'download',
    value: 445,
  },
  {
    date: '2018/8/15',
    type: 'register',
    value: 4319,
  },
  {
    date: '2018/8/15',
    type: 'bill',
    value: 176,
  },
];
// 总和数据
const data2 = [
  { type: 'bill', value: 0 },
  { type: 'register', value: 0 },
  { type: 'download', value: 0 },
];
_.each(data1, (d) => {
  const type = d.type;
  const value = d.value;
  const row = getTargetRow('type', type, data2);
  row.value += value;
});
// 去除最小分类的数据
const data3 = [
  {
    date: '2018/8/1',
    type: 'download',
    value: 4623,
  },
  {
    date: '2018/8/1',
    type: 'register',
    value: 2208,
  },
  {
    date: '2018/8/2',
    type: 'download',
    value: 6145,
  },
  {
    date: '2018/8/2',
    type: 'register',
    value: 2016,
  },
  {
    date: '2018/8/3',
    type: 'download',
    value: 508,
  },
  {
    date: '2018/8/3',
    type: 'register',
    value: 2916,
  },
  {
    date: '2018/8/4',
    type: 'download',
    value: 6268,
  },
  {
    date: '2018/8/4',
    type: 'register',
    value: 4512,
  },
  {
    date: '2018/8/5',
    type: 'download',
    value: 6411,
  },
  {
    date: '2018/8/5',
    type: 'register',
    value: 8281,
  },
  {
    date: '2018/8/6',
    type: 'download',
    value: 1890,
  },
  {
    date: '2018/8/6',
    type: 'register',
    value: 2008,
  },
  {
    date: '2018/8/7',
    type: 'download',
    value: 4251,
  },
  {
    date: '2018/8/7',
    type: 'register',
    value: 1963,
  },
  {
    date: '2018/8/8',
    type: 'download',
    value: 2978,
  },
  {
    date: '2018/8/8',
    type: 'register',
    value: 2367,
  },
  {
    date: '2018/8/9',
    type: 'register',
    value: 2956,
  },
  {
    date: '2018/8/10',
    type: 'download',
    value: 3606,
  },
  {
    date: '2018/8/10',
    type: 'register',
    value: 678,
  },
  {
    date: '2018/8/11',
    type: 'download',
    value: 4311,
  },
  {
    date: '2018/8/11',
    type: 'register',
    value: 3188,
  },
  {
    date: '2018/8/12',
    type: 'download',
    value: 4116,
  },
  {
    date: '2018/8/12',
    type: 'register',
    value: 3491,
  },
  {
    date: '2018/8/13',
    type: 'download',
    value: 6419,
  },
  {
    date: '2018/8/13',
    type: 'register',
    value: 2852,
  },
  {
    date: '2018/8/14',
    type: 'download',
    value: 1643,
  },
  {
    date: '2018/8/14',
    type: 'register',
    value: 4788,
  },
  {
    date: '2018/8/15',
    type: 'download',
    value: 445,
  },
  {
    date: '2018/8/15',
    type: 'register',
    value: 4319,
  },
];
// 绘制总和柱状图
const columnPlot = new g2plot.Column('c1', {
  padding: [10, 10, 10, 10],
  forceFit: true,
  data: data2,
  xField: 'type',
  yField: 'value',
  tooltip: {
    visible: false,
  },
  xAxis: {
    visible: false,
  },
  yAxis: {
    visible: false,
  },
  legend: {
    visible: false,
  },
  colorField: 'type',
  // color: colors,
  color,
  animation: false,
});
columnPlot.render();
columnPlot.bindStateManager(stateManager, {
  setState: [
    {
      event: 'column:click',
      state: (e) => {
        const origin = e.target.get('origin')._origin;
        const state = { name: 'type', exp: origin.type };
        return state;
      },
    },
  ],
  onStateChange: [
    {
      name: 'type',
      callback: (d, plot) => {
        plot.setSelected(d, {
          strokeStyle: '#4D4D4D',
          lineWidth: 2,
        });
        plot.setNormal((origin) => {
          return origin[d.name] !== d.exp;
        });
      },
    },
  ],
});
// 绘制总和饼图
const piePlot = new g2plot.Pie('c3', {
  padding: [10, 10, 10, 10],
  forceFit: true,
  data: data2,
  colorField: 'type',
  angleField: 'value',
  // color: ['#d1ad4e', '#a2aac6', '#69755a', '#cfcab3'],
  color,
  tooltip: {
    visible: false,
  },
  xAxis: {
    visible: false,
  },
  yAxis: {
    visible: false,
  },
  legend: {
    visible: false,
  },
  animation: false,
});
piePlot.render();
piePlot.bindStateManager(stateManager, {
  setState: [
    {
      event: 'pie:click',
      state: (e) => {
        const origin = e.target.get('origin')._origin;
        const state = { name: 'type', exp: origin.type };
        return state;
      },
    },
  ],
  onStateChange: [
    {
      name: 'type',
      callback: (d, plot) => {
        plot.setSelected(d, {
          strokeStyle: '#4D4D4D',
          lineWidth: 2,
        });
        plot.setNormal((origin) => {
          return origin[d.name] !== d.exp;
        });
      },
    },
  ],
});
// 绘制多折线图
const linePlot = new g2plot.Line('c2', {
  forceFit: true,
  data: data1,
  xField: 'date',
  yField: 'value',
  seriesField: 'type',
  // color: ['#d1ad4e', '#69755a', '#cfcab3'],
  color,
  tooltip: {
    visible: false,
  },
  xAxis: {
    visible: false,
  },
  yAxis: {
    visible: false,
  },
  legend: {
    visible: false,
  },
  animation: false,
});
linePlot.render();
linePlot.bindStateManager(stateManager, {
  setState: [
    {
      event: 'line:click',
      state: (e) => {
        const origin = e.target.get('origin')._origin;
        const state = { name: 'type', exp: origin.type };
        return state;
      },
    },
  ],
  onStateChange: [
    {
      name: 'type',
      callback: (d, plot) => {
        plot.setSelected(d, {
          lineWidth: 3,
          strokeStyle: '#4D4D4D',
        });
        plot.setNormal((origin) => {
          return origin[d.name] !== d.exp;
        });
      },
    },
  ],
});
// 绘制堆叠柱状图
const stackColumn = new g2plot.StackColumn('c4', {
  padding: [10, 20, 10, 20],
  forceFit: true,
  data: data1,
  xField: 'date',
  yField: 'value',
  stackField: 'type',
  color,
  // color: ['#cfcab3', '#a2aac6', '#d1ad4e', '#69755a',],
  tooltip: {
    visible: false,
  },
  xAxis: {
    visible: false,
  },
  yAxis: {
    visible: false,
  },
  legend: {
    visible: false,
  },
  animation: false,
});
stackColumn.render();
stackColumn.bindStateManager(stateManager, {
  setState: [
    {
      event: 'column:click',
      state: (e) => {
        const origin = e.target.get('origin')._origin;
        const state = { name: 'type', exp: origin.type };
        return state;
      },
    },
  ],
  onStateChange: [
    {
      name: 'type',
      callback: (d, plot) => {
        plot.setSelected(d, {
          strokeStyle: '#4D4D4D',
          lineWidth: 1,
        });
        plot.setNormal((origin) => {
          return origin[d.name] !== d.exp;
        });
      },
    },
  ],
});
// 绘制堆叠面积图
const stackArea = new g2plot.StackArea('c6', {
  forceFit: true,
  data: data1,
  xField: 'date',
  yField: 'value',
  stackField: 'type',
  // color: ['#beceb7', '#d1ad4e', '#69755a', '#a2aac6', '#cfcab3',],
  color,
  tooltip: {
    visible: false,
  },
  xAxis: {
    visible: false,
  },
  yAxis: {
    visible: false,
  },
  legend: {
    visible: false,
  },
  animation: false,
});
stackArea.render();
stackArea.bindStateManager(stateManager, {
  setState: [
    {
      event: 'area:click',
      state: (e) => {
        const origin = e.target.get('origin')._origin;
        const state = { name: 'type', exp: origin.type };
        return state;
      },
    },
  ],
  onStateChange: [
    {
      name: 'type',
      callback: (d, plot) => {
        plot.setSelected(d, {
          // fillStyle: '#D14D14',
          strokeStyle: '#4D4D4D',
        });
        plot.setNormal((origin) => {
          return origin[d.name] !== d.exp;
        });
      },
    },
  ],
});
// 绘制雷达图
const radar = new g2plot.Radar('c5', {
  padding: [0, 0, 0, 0],
  forceFit: true,
  data: data3,
  xField: 'date',
  yField: 'value',
  seriesField: 'type',
  // color: colors,
  color,
  line: {
    visible: false,
  },
  xAxis: {
    label: {
      visible: false,
      style: {
        opacity: 0,
      },
    },
  },
  tooltip: {
    visible: false,
  },
  legend: {
    visible: false,
  },
  animation: false,
});
radar.render();
radar.bindStateManager(stateManager, {
  setState: [
    {
      event: 'area:click',
      state: (e) => {
        const origin = e.target.get('origin')._origin;
        const state = { name: 'type', exp: origin.type };
        return state;
      },
    },
  ],
  onStateChange: [
    {
      name: 'type',
      callback: (d, plot) => {
        plot.setSelected(d, {
          strokeStyle: '#4D4D4D',
          lineWidth: 1,
        });
        plot.setNormal((origin) => {
          return origin[d.name] !== d.exp;
        });
      },
    },
  ],
});
// 绘制环图
const ringPlot = new g2plot.Ring('c7', {
  forceFit: true,
  data: data2,
  colorField: 'type',
  angleField: 'value',
  innerRadius: 0.5,
  // color: ['#cfcab3', '#d1ad4e', '#69755a', '#a2aac6'],
  color,
  tooltip: {
    visible: false,
  },
  xAxis: {
    visible: false,
  },
  yAxis: {
    visible: false,
  },
  legend: {
    visible: false,
  },
  animation: false,
});
ringPlot.render();
ringPlot.bindStateManager(stateManager, {
  setState: [
    {
      event: 'ring:click',
      state: (e) => {
        const origin = e.target.get('origin')._origin;
        const state = { name: 'type', exp: origin.type };
        return state;
      },
    },
  ],
  onStateChange: [
    {
      name: 'type',
      callback: (d, plot) => {
        plot.setSelected(d, {
          strokeStyle: '#4D4D4D',
          lineWidth: 2,
        });
        plot.setNormal((origin) => {
          return origin[d.name] !== d.exp;
        });
      },
    },
  ],
});
// 创建stateManager
function getTargetRow(field, value, data) {
  for (let i = 0; i < data.length; i++) {
    if (data[i][field] === value) {
      return data[i];
    }
  }
}

// 作为模块 避免变量冲突
export {};
