import * as G from '@antv/g';
import BaseColumnLayer from '../../src/plots/column/layer-refactor';
import BasePlot from '../../src/base/plot-refactor';
import { Column } from '../../src';

const canvasDiv = document.createElement('div');
canvasDiv.style.width = '400px';
canvasDiv.style.height = '300px';
canvasDiv.id = 'canvas';
document.body.appendChild(canvasDiv);

/* const canvas = new G.Canvas({
  containerId: 'canvas',
  width: 400,
  height: 300,
}); */

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

describe('view layer test', () => {
  it('initialize', () => {
    const column = new BaseColumnLayer({
      title: {
        visible: true,
        text: '先帝创业未半而中道崩殂',
      },
      description: {
        visible: true,
        text: '今天下三分，益州疲弊，此诚危急存亡之秋也',
      },
      width: 400,
      height: 300,
      canvas: canvas,
      padding: 'auto',
      data,
      xField: 'year',
      yField: 'value',
      interactions: [
        {
          type: 'slider',
          cfg: {
            start: 0,
            end: 1,
          },
        },
      ],
    });
    column.render();
  });

  it('base plot', () => {
    const plot = new BasePlot(canvasDiv, {
      forfit: true,
      type: 'column',
      width: 400,
      height: 300,
      canvas: canvas,
      padding: 'auto',
      data,
      xField: 'year',
      yField: 'value',
    });
    plot.render();
  });

  it.only('plot test', () => {
    const columnPlot = new Column(canvasDiv, {
      width: 400,
      height: 300,
      canvas: canvas,
      padding: 'auto',
      data,
      xField: 'year',
      yField: 'value',
    });
    columnPlot.render();
  });
});
