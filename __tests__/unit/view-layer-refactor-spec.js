import * as G from '@antv/g';
import BaseColumnLayer from '../../src/plots/column/layer-refactor';

const canvasDiv = document.createElement('div');
canvasDiv.style.width = '600px';
canvasDiv.style.height = '600px';
canvasDiv.id = 'canvas';
document.body.appendChild(canvasDiv);

const canvas = new G.Canvas({
  containerId: 'canvas',
  width: 600,
  height: 600,
});

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
      width: 500,
      height: 500,
      canvas: canvas,
      padding: 'auto',
      data,
      xField: 'year',
      yField: 'value',
    });
    column.render();
  });
});
