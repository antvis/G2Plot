import { PercentageStackColumn } from '../../src';
import { isFunction } from 'util';

describe.skip('PercentageStackColumn plot', () => {
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

  it.only('初始化以及销毁', () => {
    const columnPlot = new PercentageStackColumn(canvasDiv, {
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
    const plot = columnPlot.getLayer().plot;
    const intervalShape = plot.get('elements')[0];
    const shapes = intervalShape.get('shapeContainer').get('children');
    expect(shapes.length).toBe(18);
    expect(intervalShape.get('groupScales')[0].field).toBe('type');
    expect(intervalShape.get('adjustOptions')[0].type).toBe('stack');
    columnPlot.destroy();
    expect(plot.destroyed).toBe(true);
  });
});
