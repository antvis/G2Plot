import { StackedColumn } from '../../../../src';

describe('StackColumn plot', () => {
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
    const columnPlot = new StackedColumn(canvasDiv, {
      data,
      width: 600,
      height: 600,
      xField: 'year',
      yField: 'value',
      yAxis: {
        min: 0,
      },
      stackField: 'type',
      label: {
        visible: true,
      },
    });
    columnPlot.render();
    const view = columnPlot.getView();
    const interval = view.geometries[0];
    const shapes = interval.getShapes();
    expect(shapes.length).toBe(18);
    expect(interval.getGroupScales()[0].field).toBe('type');
    // @ts-ignore
    expect(interval.adjustOption[0].type).toBe('stack');
    columnPlot.destroy();
    expect(view.destroyed).toBe(true);
  });

  it('color size and interval style', () => {
    const columnPlot = new StackedColumn(canvasDiv, {
      width: 600,
      height: 600,
      data,
      xField: 'year',
      yField: 'value',
      yAxis: {
        min: 0,
      },
      stackField: 'type',
      columnSize: 7,
      color: ['red', 'yellow'],
    });
    columnPlot.render();
    const view = columnPlot.getView();
    const interval = view.geometries[0];
    expect(interval.getAttribute('color').values[0]).toBe('red');
    expect(interval.getAttribute('color').values[1]).toBe('yellow');
    expect(interval.getAttribute('size').values[0]).toBe(7);
    columnPlot.destroy();
    expect(view.destroyed).toBe(true);
  });

  it('color map', () => {
    const columnPlot = new StackedColumn(canvasDiv, {
      width: 600,
      height: 600,
      data,
      xField: 'year',
      yField: 'value',
      yAxis: {
        min: 0,
      },
      stackField: 'type',
      columnSize: 7,
      color: ['red', 'yellow'],
    });
    columnPlot.render();
    const view = columnPlot.getView();
    columnPlot.destroy();
    expect(view.destroyed).toBe(true);
  });

  it('label', () => {
    const columnPlot = new StackedColumn(canvasDiv, {
      width: 600,
      height: 600,
      data,
      xField: 'year',
      yField: 'value',
      yAxis: {
        min: 0,
      },
      stackField: 'type',
      label: {
        visible: true,
        adjustColor: false,
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
    columnPlot.render();

    const view = columnPlot.getView();
    const labels = view.geometries[0].labelsContainer.getChildren();
    expect(labels.length).toBe(18);
    expect(labels[0].attr('fill')).toBe('red');
    expect(labels[0].attr('text')).toInclude('dddd');
    columnPlot.destroy();
    expect(view.destroyed).toBe(true);
  });
});
