import { IGroup } from '@antv/g-base';
import { get } from '@antv/util';
import { Bar } from '../../../../src';

describe('Bar plot', () => {
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
    const barPlot = new Bar(canvasDiv, {
      width: 600,
      height: 600,
      padding: 'auto',
      data,
      xField: 'value',
      yField: 'year',
      xAxis: {
        visible: true,
      },
      yAxis: {
        visible: true,
      },
      animation: false,
    });
    barPlot.render();
    const view = barPlot.getView();
    const positionFields = view.geometries[0].getAttribute('position').getFields();
    const isTransposed = view.getCoordinate().isTransposed;
    const axes = view.getController('axis').getComponents();

    expect(barPlot).toBeInstanceOf(Bar);
    expect(positionFields[0]).toBe('year');
    expect(positionFields[1]).toBe('value');
    expect(isTransposed).toBe(true);
    expect(axes.length).toBe(2);
    barPlot.destroy();
    expect(view.destroyed).toBe(true);
  });

  it('柱子样式配置', () => {
    const barPlot = new Bar(canvasDiv, {
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
      barSize: 20,
      barStyle: {
        stroke: 'black',
        lineWidth: 2,
      },
    });
    barPlot.render();
    const view = barPlot.getView();
    const barEle = view.geometries[0];
    expect(barEle.getAttribute('color').values[0]).toBe('red');
    expect(get(barEle, 'styleOption.cfg.stroke')).toBe('black');
    expect(barEle.getAttribute('size').values[0]).toBe(20);
    barPlot.destroy();
    expect(view.destroyed).toBe(true);
  });

  it.skip('每个柱子颜色不一样', () => {
    const barPlot = new Bar(canvasDiv, {
      width: 600,
      height: 600,
      padding: 'auto',
      data,
      xField: 'value',
      yField: 'year',
      color: ['red', 'blue', 'green', 'yellow', 'orange', 'gray', 'purple', 'brown'],
      xAxis: {
        visible: true,
      },
      yAxis: {
        visible: true,
      },
    });
    barPlot.render();
    const view = barPlot.getView();
    const barEle = view.geometries[0];
    expect(barEle.getAttribute('color').values[0]).toBe('red');
    expect(barEle.getAttribute('color').values[1]).toBe('blue');
    barPlot.destroy();
    expect(view.destroyed).toBe(true);
  });

  it('隐藏两个坐标轴', () => {
    const barPlot = new Bar(canvasDiv, {
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
    barPlot.render();
    const view = barPlot.getView();
    const axes = view.getController('axis').getComponents();
    expect(axes.length).toBe(0);
    barPlot.destroy();
    expect(view.destroyed).toBe(true);
  });

  it('x轴 样式', () => {
    const barPlot = new Bar(canvasDiv, {
      width: 600,
      height: 600,
      padding: 80,
      data,
      xField: 'value',
      yField: 'year',
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
    barPlot.render();
    const view = barPlot.getView();
    const axes = view.getController('axis').getComponents();
    expect(axes.length).toBe(1);
    const axis = axes[0].component;
    const axisGroup: IGroup = axis.get('group');
    const title = axisGroup.find((item) => item.get('name') === 'axis-title');
    expect(title.attr('text')).toInclude('xxxx');
    expect(title.attr('fill')).toBe('red');
    const labels = axisGroup.findAllByName('axis-label');
    expect(labels[0].attr('text')).toInclude('abc');
    expect(labels[0].attr('fill')).toBe('red');
    // style
    const line = axisGroup.find((item) => item.get('name') === 'axis-line');
    const tickLine = axisGroup.find((item) => item.get('name') === 'axis-tickLine');
    expect(line.attr('stroke')).toBe('red');
    expect(tickLine.attr('stroke')).toBe('red');

    barPlot.destroy();
    expect(view.destroyed).toBe(true);
  });

  it('x轴 隐藏 grid line tick label', () => {
    const barPlot = new Bar(canvasDiv, {
      width: 600,
      height: 600,
      padding: 'auto',
      data,
      xField: 'value',
      yField: 'year',
      xAxis: {
        visible: true,
        tickCount: 5,
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
    barPlot.render();
    const view = barPlot.getView();
    const axes = view.getController('axis').getComponents();
    expect(axes.length).toBe(1);
    const axis = axes[0].component;
    const axisGroup: IGroup = axis.get('group');
    // style
    const line = axisGroup.findAllByName('axis-line')[0];
    const tickLine = axisGroup.findAllByName('axis-tickLine')[0];
    expect(line).toBeNil();
    expect(tickLine).toBeNil();
    barPlot.destroy();
    expect(view.destroyed).toBe(true);
  });

  it('y轴 样式', () => {
    const barPlot = new Bar(canvasDiv, {
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
          // text: 'xxxx',
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
    barPlot.render();
    const view = barPlot.getView();
    const axes = view.getController('axis').getComponents();
    expect(axes.length).toBe(1);
    const axis = axes[0].component;
    const axisGroup: IGroup = axis.get('group');
    const labels = axisGroup.findAllByName('axis-label');
    const title = axisGroup.findAllByName('axis-title')[0];
    expect(title.attr('text')).toInclude('year');
    expect(title.attr('fill')).toBe('red');
    expect(labels[0].attr('text')).toInclude('abc');
    // style
    const line = axisGroup.findAllByName('axis-line')[0];
    const tickLine = axisGroup.findAllByName('axis-tickLine')[0];
    expect(line.attr('stroke')).toBe('red');
    expect(tickLine.attr('stroke')).toBe('red');
    expect(labels[0].attr('fill')).toBe('red');
    barPlot.destroy();
    expect(view.destroyed).toBe(true);
  });

  it('y轴 隐藏 grid line tick label', () => {
    const barPlot = new Bar(canvasDiv, {
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
    barPlot.render();
    const view = barPlot.getView();
    const axes = view.getController('axis').getComponents();
    expect(axes.length).toBe(1);
    const axis = axes[0].component;
    const axisGroup: IGroup = axis.get('group');
    // style
    const line = axisGroup.findAllByName('axis-line')[0];
    const tickLine = axisGroup.findAllByName('axis-tickLine')[0];
    expect(line).toBeNil();
    expect(tickLine).toBeNil();
    barPlot.destroy();
    expect(view.destroyed).toBe(true);
  });
});
