import { Line } from '../../src';
import { Column } from '../../src';
import * as _ from '@antv/util';
import StateManager from '../../src/util/stateManager';

describe('stateManager', () => {
  // 分别创建两份图表
  // 创建折线图
  const canvasDiv1 = document.createElement('div');
  canvasDiv1.style.width = '400px';
  canvasDiv1.style.height = '300px';
  canvasDiv1.style.marginLeft = '0px';
  canvasDiv1.style.marginTop = '0px';
  canvasDiv1.style.float = 'left';
  canvasDiv1.id = 'canvas1';
  document.body.appendChild(canvasDiv1);

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

  it('stateManager', () => {
    const linePlot = new Line(canvasDiv1, {
      width: 400,
      height: 300,
      data: data1,
      xField: 'date',
      yField: 'value',
      seriesField: 'type',
      xAxis: {
        type: 'dateTime',
      },
      tooltip: {
        visible: false,
      },
      //responsive: true
    });
    linePlot.render();

    // 创建柱状图，柱状图数据是折线图type字段的聚合
    const canvasDiv2 = document.createElement('div');
    canvasDiv2.style.width = '400px';
    canvasDiv2.style.height = '300px';
    canvasDiv2.style.marginLeft = '10px';
    canvasDiv2.style.marginTop = '0px';
    canvasDiv2.style.float = 'left';
    canvasDiv2.id = 'canvas2';
    document.body.appendChild(canvasDiv2);

    const data2 = [{ type: 'bill', value: 0 }, { type: 'register', value: 0 }, { type: 'download', value: 0 }];
    _.each(data1, (d) => {
      const type = d.type;
      const value = d.value;
      const row = getTargetRow('type', type, data2);
      row.value += value;
    });
    const columnPlot = new Column(canvasDiv2, {
      width: 400,
      height: 300,
      data: data2,
      xField: 'type',
      yField: 'value',
      tooltip: {
        visible: false,
      },
    });
    columnPlot.render();

    const stateManager = new StateManager();
    linePlot.bindStateManager(stateManager, {
      setState: [
        {
          event: 'line:click',
          state: (e) => {
            const origin = e.target.get('origin')[0]._origin;
            const state = { name: 'type', exp: origin.type };
            return state;
          },
        },
      ],
      onStateChange: [
        {
          name: 'type',
          callback: (d, plot) => {
            plot.setSelected(d);
            plot.setNormal((origin) => {
              return origin[d.name] !== d.exp;
            });
          },
        },
      ],
    });

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
            plot.setSelected(d /*, {
              lineWidth: 2,
              stroke: 'black'
            }*/);
            plot.setNormal((origin) => {
              return origin[d.name] !== d.exp;
            });
          },
        },
      ],
    });

    // 加入外部组件
    const selector = document.createElement('select');
    selector.setAttribute('id', 'type');
    selector.options[0] = new Option('bill', 'bill');
    selector.options[1] = new Option('register', 'register');
    selector.options[2] = new Option('download', 'download');
    selector.style.width = '200px';
    selector.style.height = '30px';
    selector.style.marginTop = '20px';
    selector.style.marginLeft = '24px';
    selector.style.fontSize = '14px';
    document.body.appendChild(selector);

    selector.onchange = (e) => {
      const index = selector.selectedIndex;
      const value = selector.options[index].value;
      stateManager.setState('type', value);
    };
    stateManager.on('type:change', (d) => {
      selector.value = d.exp;
    });
  });

  it('default state', () => {
    const linePlot = new Line(canvasDiv1, {
      width: 400,
      height: 300,
      data: data1,
      xField: 'date',
      yField: 'value',
      seriesField: 'type',
      xAxis: {
        type: 'dateTime',
      },
      tooltip: {
        visible: false,
      },
      label: {
        visible: true,
        type: 'line',
      },
      defaultState: {
        active: {
          condition: {
            name: 'value',
            exp: 6411,
          },
          related: ['tooltip', 'label', 'axis'],
        },
        disable: {
          condition: {
            name: 'type',
            exp: (d) => {
              return d !== 'download';
            },
          },
          related: ['tooltip', 'label', 'axis'],
        },
      },
      responsive: true,
    });
    linePlot.render();
  });
});

function getTargetRow(field, value, data) {
  for (let i = 0; i < data.length; i++) {
    if (data[i][field] === value) {
      return data[i];
    }
  }
}
