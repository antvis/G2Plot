import 'jest-extended';
import { get } from '@antv/util';
import { Column } from '../../../../src';
import { IGroup } from '@antv/g2/lib/dependents';

describe('Column plot', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '600px';
  canvasDiv.style.height = '600px';
  canvasDiv.style.left = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.id = 'canvas1';
  document.body.appendChild(canvasDiv);

  const data = [
    {
      year: '1991',
      value: 31,
    },
    {
      year: '1992',
      value: 41,
    },
    {
      year: '1993',
      value: 35,
    },
    {
      year: '1994',
      value: 55,
    },
    {
      year: '1995',
      value: 49,
    },
    {
      year: '1996',
      value: 15,
    },
    {
      year: '1997',
      value: 17,
    },
    {
      year: '1998',
      value: 29,
    },
    {
      year: '1999',
      value: 33,
    },
  ];

  it('初始化以及销毁', () => {
    const columnPlot = new Column(canvasDiv, {
      padding: [40, 40, 40, 40],
      data,
      xField: 'year',
      yField: 'value',
      xAxis: {
        // visible: true,
      },
      yAxis: {
        // visible: true,
      },
      title: {
        visible: true,
        text: '我是title',
      },
      description: {
        visible: true,
        text: '描述描述，柱状图，柱状图',
      },
      label: {
        visible: true,
        position: 'center',
      },
      guideLine: [
        {
          start: ['1991', 30], // ['1991', 30],
          end: ['1999', 30], // ['1999', 30],
          text: {
            position: 'start',
            content: '自定义位置辅助线',
          },
        },
      ],
      animation: true,
    });
    columnPlot.render();
    const view = columnPlot.getView();
    const positionFields = view.geometries[0].getAttribute('position').getFields();
    const isTransposed = view.getCoordinate().isTransposed;
    const axes = view
      .getController('axis')
      .getComponents()
      .filter((co) => co.type === 'axis');

    expect(columnPlot).toBeInstanceOf(Column);
    expect(positionFields[0]).toBe('year');
    expect(positionFields[1]).toBe('value');
    expect(isTransposed).toBe(false);
    expect(axes.length).toBe(2);
  });

  it('柱子样式配置', () => {
    const columnPlot = new Column(canvasDiv, {
      width: 600,
      height: 600,
      padding: 'auto',
      data,
      xField: 'value',
      yField: 'year',
      color: 'red',
      xAxis: {
        visible: true,
      },
      yAxis: {
        visible: true,
      },
      columnSize: 20,
      columnStyle: {
        stroke: 'black',
        lineWidth: 2,
      },
    });
    columnPlot.render();
    const view = columnPlot.getView();
    const columnEle = view.geometries[0];
    expect(columnEle.getAttribute('color').values[0]).toBe('red');
    expect(get(columnEle, 'styleOption.cfg.stroke')).toBe('black');
    expect(columnEle.getAttribute('size').values[0]).toBe(20);
    columnPlot.destroy();
    expect(view.destroyed).toBe(true);
  });

  // 需要支持吗？  还是支持吧！
  it.skip('柱子颜色不一样', () => {
    const columnPlot = new Column(canvasDiv, {
      width: 600,
      height: 600,
      padding: 'auto',
      data,
      xField: 'year',
      yField: 'value',
      color: ['red', 'blue', 'green', 'yellow', 'orange', 'gray', 'purple', 'brown'],
      title: {
        visible: true,
        text: '柱子颜色不一样',
      },
      xAxis: {
        visible: true,
      },
      yAxis: {
        visible: true,
      },
      legend: {
        visible: false,
      },
    });
    columnPlot.render();
    const plot = columnPlot.getView();
    const columnEle = plot.geometries[0];
    expect(columnEle.getAttribute('color').values[0]).toBe('red');
    expect(columnEle.getAttribute('color').values[1]).toBe('blue');
    columnPlot.destroy();
    expect(plot.destroyed).toBe(true);
  });

  it('隐藏两个坐标轴', () => {
    const columnPlot = new Column(canvasDiv, {
      width: 600,
      height: 600,
      padding: 'auto',
      data,
      xField: 'value',
      yField: 'year',
      xAxis: {
        visible: false,
      },
      yAxis: {
        visible: false,
      },
    });
    columnPlot.render();
    const plot = columnPlot.getView();
    const axes = plot.getController('axis').getComponents();
    expect(axes.length).toBe(0);
    columnPlot.destroy();
    expect(plot.destroyed).toBe(true);
  });

  it('x轴 样式', () => {
    const columnPlot = new Column(canvasDiv, {
      width: 600,
      height: 600,
      padding: 80,
      data,
      xField: 'value',
      yField: 'year',
      title: {
        visible: true,
        text: 'X轴样式',
      },
      xAxis: {
        visible: true,
        tickCount: 5,
        line: {
          visible: true,
          style: {
            stroke: 'red',
          },
        },
        tickLine: {
          visible: true,
          style: { stroke: 'red' },
        },
        label: {
          visible: true,
          formatter: (v) => {
            return v + 'abc';
          },
          style: { fill: 'red', fontSize: 24 },
        },
        title: {
          visible: true,
          text: 'xxxx',
          style: {
            fill: 'red',
            fontSize: 20,
          },
        },
      },
      yAxis: {
        visible: false,
      },
    });
    columnPlot.render();
    const view = columnPlot.getView();
    const axes = view.getController('axis').getComponents();
    expect(axes.length).toBe(1);
    const axis = axes[0].component;
    const axisGroup = axis.get('group') as IGroup;
    const title = axisGroup.find((item) => item.get('name') === 'axis-title');

    expect(title.attr('text')).toInclude('xxxx');
    expect(title.attr('fill')).toBe('red');

    const labels = (axis.get('group') as IGroup).findAllByName('axis-label');
    expect(labels[0].attr('text')).toInclude('abc');
    // style
    const line = axisGroup.find((item) => item.get('name') === 'axis-line');
    const tickLine = axisGroup.find((item) => item.get('name') === 'axis-tickLine');
    expect(line.attr('stroke')).toBe('red');
    expect(tickLine.attr('stroke')).toBe('red');
    expect(labels[0].attr('fill')).toBe('red');
    // columnPlot.destroy();
    // expect(view.destroyed).toBe(true);
  });

  it('x轴 隐藏 grid line tick label', () => {
    const columnPlot = new Column(canvasDiv, {
      width: 600,
      height: 600,
      padding: 'auto',
      data,
      xField: 'value',
      yField: 'year',
      xAxis: {
        visible: true,
        line: {
          visible: false,
          style: {
            stroke: 'red',
          },
        },
        grid: {
          visible: false,
        },
        tickLine: { visible: false, style: { stroke: 'red' } },
        label: { visible: false, style: { fill: 'red', fontSize: 24 } },
      },
      yAxis: {
        visible: false,
      },
    });
    columnPlot.render();
    const view = columnPlot.getView();
    const axes = view.getController('axis').getComponents();
    const axis = axes[0].component;
    const axisGroup: IGroup = axis.get('group');
    // style

    const line = axisGroup.find((item) => item.get('name') === 'axis-line');
    const tickLine = axisGroup.find((item) => item.get('name') === 'axis-tickLine');
    expect(line).toBeNil();
    expect(tickLine).toBeNil();
    columnPlot.destroy();
    expect(view.destroyed).toBe(true);
  });

  it('y轴 样式', () => {
    const columnPlot = new Column(canvasDiv, {
      width: 600,
      height: 600,
      padding: 'auto',
      data,
      xField: 'value',
      yField: 'year',
      yAxis: {
        min: 5,
        nice: false,
        visible: true,
        tickCount: 5,
        line: {
          visible: true,
          style: {
            stroke: 'red',
          },
        },
        tickLine: {
          visible: true,
          style: { stroke: 'red' },
        },
        title: {
          visible: true,
          text: 'xxxx',
          style: {
            fontSize: 30,
            fill: 'red',
          },
        },
        label: {
          formatter: (v) => {
            return v + 'abc';
          },
          visible: true,
          style: {
            fill: 'red',
            fontSize: 24,
          },
        },
      },
      xAxis: {
        visible: false,
      },
    });
    columnPlot.render();
    const view = columnPlot.getView();
    const axes = view.getController('axis').getComponents();
    const axis = axes[0].component;
    const axisGroup = axis.get('group') as IGroup;
    const title = axisGroup.find((item) => item.get('name') === 'axis-title');
    const labels = axisGroup.findAllByName('axis-label');
    expect(title.attr('text')).toInclude('xxxx');
    expect(title.attr('fill')).toBe('red');
    expect(labels[0].attr('text')).toInclude('abc');
    // style
    const line = axisGroup.find((item) => item.get('name') === 'axis-line');
    const tickLine = axisGroup.find((item) => item.get('name') === 'axis-tickLine');
    expect(line.attr('stroke')).toBe('red');
    expect(tickLine.attr('stroke')).toBe('red');
    expect(labels[0].attr('fill')).toBe('red');
    columnPlot.destroy();
    expect(view.destroyed).toBe(true);
  });

  it('y轴 隐藏 grid line tick label', () => {
    const columnPlot = new Column(canvasDiv, {
      width: 600,
      height: 600,
      padding: 'auto',
      data,
      xField: 'value',
      yField: 'year',
      yAxis: {
        min: 5,
        nice: false,
        visible: true,
        tickCount: 5,
        line: {
          visible: false,
        },
        grid: {
          visible: false,
        },
        tickLine: { visible: false },
        label: { visible: false },
      },
      xAxis: {
        visible: false,
      },
    });
    columnPlot.render();
    const plot = columnPlot.getLayer().view;
    const axes = plot.getController('axis').getComponents();
    expect(axes.length).toBe(1);
    const axis = axes[0].component;
    // style
    const line = axis.get('line');
    const tickLine = axis.get('tickLine');
    expect(line).toBe(null);
    expect(tickLine).toBe(null);
    columnPlot.destroy();
    expect(plot.destroyed).toBe(true);
  });
});
