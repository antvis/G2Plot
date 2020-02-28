import { GroupBar } from '../../../../src';
import { isFunction } from '@antv/util';

describe('GroupBar plot', () => {
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
      value: 3,
      type: 'Lon',
    },
    {
      year: '1992',
      value: 4,
      type: 'Lon',
    },
    {
      year: '1993',
      value: 3.5,
      type: 'Lon',
    },
    {
      year: '1994',
      value: 5,
      type: 'Lon',
    },
    {
      year: '1995',
      value: 4.9,
      type: 'Lon',
    },
    {
      year: '1996',
      value: 6,
      type: 'Lon',
    },
    {
      year: '1997',
      value: 7,
      type: 'Lon',
    },
    {
      year: '1998',
      value: 9,
      type: 'Lon',
    },
    {
      year: '1999',
      value: 13,
      type: 'Lon',
    },
    {
      year: '1991',
      value: 3,
      type: 'Bor',
    },
    {
      year: '1992',
      value: 4,
      type: 'Bor',
    },
    {
      year: '1993',
      value: 3.5,
      type: 'Bor',
    },
    {
      year: '1994',
      value: 5,
      type: 'Bor',
    },
    {
      year: '1995',
      value: 4.9,
      type: 'Bor',
    },
    {
      year: '1996',
      value: 6,
      type: 'Bor',
    },
    {
      year: '1997',
      value: 7,
      type: 'Bor',
    },
    {
      year: '1998',
      value: 9,
      type: 'Bor',
    },
    {
      year: '1999',
      value: 13,
      type: 'Bor',
    },
  ];

  it('初始化以及销毁', () => {
    const barPlot = new GroupBar(canvasDiv, {
      width: 600,
      height: 600,
      data,
      padding: 'auto',
      xField: 'value',
      yField: 'year',
      yAxis: {
        min: 0,
      },
      groupField: 'type',
    });
    barPlot.render();
    const view = barPlot.getView();
    const interval = view.geometries[0];
    const shapes = interval.getShapes();
    expect(shapes.length).toBe(18);
    expect(interval.getGroupFields()[0]).toBe('type');
    // @ts-ignore
    expect(interval.adjustOption[0].type).toBe('dodge');
    barPlot.destroy();
    expect(view.destroyed).toBe(true);
  });

  it('color size and interval style', () => {
    const barPlot = new GroupBar(canvasDiv, {
      width: 600,
      height: 600,
      data,
      xField: 'value',
      yField: 'year',
      yAxis: {
        min: 0,
      },
      groupField: 'type',
      barSize: 7,
      color: ['red', 'yellow'],
    });
    barPlot.render();
    const view = barPlot.getView();
    const interval = view.geometries[0];
    expect(interval.getAttribute('color').values[0]).toBe('red');
    expect(interval.getAttribute('color').values[1]).toBe('yellow');
    expect(interval.getAttribute('size').values[0]).toBe(7);
    barPlot.destroy();
    expect(view.destroyed).toBe(true);
  });

  it('color map', () => {
    const barPlot = new GroupBar(canvasDiv, {
      data,
      xField: 'value',
      yField: 'year',
      yAxis: {
        min: 0,
      },
      groupField: 'type',
      barSize: 7,
      color: {
        Lon: 'red',
        Bor: 'yellow',
      },
    });
    barPlot.render();
    const view = barPlot.getView();
    const interval = view.geometries[0];

    expect(isFunction(interval.getAttribute('color').callback)).toBe(true);
    barPlot.destroy();
    expect(view.destroyed).toBe(true);
  });

  it('label', () => {
    const barPlot = new GroupBar(canvasDiv, {
      width: 600,
      height: 600,
      data,
      xField: 'value',
      yField: 'year',
      yAxis: {
        min: 0,
      },
      groupField: 'type',
      label: {
        visible: true,
        formatter: (txt) => {
          return txt + 'dddd';
        },
        offsetX: 10,
        offsetY: 10,
        style: {
          fill: 'red',
        },
      },
    });
    barPlot.render();
    const view = barPlot.getView();
    const labels = view.geometries[0].labelsContainer.getChildren();
    expect(labels.length).toBe(18);
    expect(labels[0].attr('fill')).toBe('red');
    expect(labels[0].attr('text')).toInclude('dddd');
    barPlot.destroy();
    expect(view.destroyed).toBe(true);
  });

  it('legend style', () => {
    const barPlot = new GroupBar(canvasDiv, {
      width: 600,
      height: 600,
      padding: 'auto',
      data,
      xField: 'value',
      yField: 'year',
      yAxis: {
        min: 0,
      },
      groupField: 'type',
      legend: {
        visible: true,
        position: 'right-top',
        title: {
          visible: true,
        },
      },
    });
    barPlot.render();

    const view = barPlot.getView();
    const legends = view.getController('legend').getComponents();
    expect(legends.length).toBe(1);
    expect(legends[0].component.get('position')).toBe('right-top');

    barPlot.destroy();
    expect(view.destroyed).toBe(true);
  });

  it('legend visible false', () => {
    const barPlot = new GroupBar(canvasDiv, {
      width: 600,
      height: 600,
      data,
      xField: 'value',
      yField: 'year',
      yAxis: {
        min: 0,
      },
      groupField: 'type',
      label: {
        formatter: (txt) => {
          return txt + 'dddd';
        },
        offsetX: 10,
        offsetY: 10,
        style: {
          fill: 'red',
        },
      },
      legend: {
        visible: false,
      },
    });
    barPlot.render();

    const view = barPlot.getView();
    const legends = view.getController('legend').getComponents();
    expect(legends.length).toBe(0);
    barPlot.destroy();
    expect(view.destroyed).toBe(true);
  });
});
