import { View } from '@antv/g2';
import { Column } from '../../../../src';

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

  it.only('初始化以及销毁', () => {
    const columnPlot = new Column(canvasDiv, {
      padding: 'auto',
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
        text: '我是title',
      },
      description: {
        text: '描述描述，柱状图，柱状图',
      },
      label: {
        visible: true,
        position: 'center',
      },
      animation: true,
    });
    columnPlot.render();
    const plot: View = columnPlot.getLayer().view as View;
    // @ts-ignore
    const positionField = plot.geometries[0].attributeOption.position.fields;
    const isTransposed = plot.getCoordinate().isTransposed;
    const axes = plot
      .getController('axis')
      .getComponents()
      .filter((co) => co.type === 'axis');

    expect(columnPlot).toBeInstanceOf(Column);
    expect(positionField[0]).toBe('year');
    expect(positionField[1]).toBe('value');
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
    const plot = columnPlot.getLayer().view;
    const columnEle = plot.geometries[0];
    expect(columnEle.get('color').values[0]).toBe('red');
    expect(columnEle.get('style').cfg.stroke).toBe('black');
    expect(columnEle.get('size').values[0]).toBe(20);
    columnPlot.destroy();
    expect(plot.destroyed).toBe(true);
  });

  it('柱子颜色不一样', () => {
    const columnPlot = new Column(canvasDiv, {
      width: 600,
      height: 600,
      padding: 'auto',
      data,
      xField: 'year',
      yField: 'value',
      color: ['red', 'blue', 'green', 'yellow', 'orange', 'gray', 'purple', 'brown'],
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
    const plot = columnPlot.getLayer().view;
    const columnEle = plot.geometries[0];
    expect(columnEle.get('color').values[0]).toBe('red');
    expect(columnEle.get('color').values[1]).toBe('blue');
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
    const plot = columnPlot.getLayer().view;
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
      xAxis: {
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
    const plot = columnPlot.getLayer().view;
    const axes = plot.getController('axis').getComponents();
    expect(axes.length).toBe(1);
    const axis = axes[0].component;
    expect(axis.get('title').text).toInclude('xxxx');

    expect(axis.get('title').textStyle.fill).toBe('red');
    const labels = axis.get('labelItems');
    expect(labels[0].text).toInclude('abc');
    // style
    const line = axis.get('line');
    const tickLine = axis.get('tickLine');
    expect(line.stroke).toBe('red');
    expect(tickLine.stroke).toBe('red');
    expect(labels[0].textStyle.fill).toBe('red');
    columnPlot.destroy();
    expect(plot.destroyed).toBe(true);
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
        nice: false,
        visible: true,
        line: {
          visible: false,
          stroke: 'red',
        },
        grid: {
          visible: false,
        },
        tickLine: { visible: false, stroke: 'red' },
        label: { visible: false, fill: 'red', fontSize: 24 },
      },
      yAxis: {
        visible: false,
      },
    });
    columnPlot.render();
    const plot = columnPlot.getLayer().view;
    const axes = plot.getController('axis').getComponents();
    const axis = axes[0].component;
    // style
    const line = axis.get('line');
    const tickLine = axis.get('tickLine');
    expect(line).toBe(null);
    expect(tickLine).toBe(null);
    columnPlot.destroy();
    expect(plot.destroyed).toBe(true);
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
    const plot = columnPlot.getLayer().view;
    const axes = plot.getController('axis').getComponents();
    expect(axes.length).toBe(1);
    const axis = axes[0].component;
    const labels = axis.get('labelItems');
    expect(axis.get('title').text).toInclude('xxxx');
    expect(axis.get('title').textStyle.fill).toBe('red');
    expect(labels[0].text).toInclude('abc');
    // style
    const line = axis.get('line');
    const tickLine = axis.get('tickLine');
    expect(line.stroke).toBe('red');
    expect(tickLine.stroke).toBe('red');
    expect(labels[0].textStyle.fill).toBe('red');
    columnPlot.destroy();
    expect(plot.destroyed).toBe(true);
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
