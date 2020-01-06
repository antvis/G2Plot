import { mobile } from '../data/mobile';
import { dice } from '../../src/plots/treemap/layout/dice';
import { slice } from '../../src/plots/treemap/layout/slice';
import { squarify } from '../../src/plots/treemap/layout/squarify';
import * as G from '@antv/g';
import { each } from '@antv/util';

const canvasDiv = document.createElement('div');
canvasDiv.style.width = '600px';
canvasDiv.style.height = '400px';
canvasDiv.id = 'test';
document.body.appendChild(canvasDiv);

const containerBBox = {
  x: 0,
  y: 0,
  width: 600,
  height: 400,
};

const canvas = new G.Canvas({
  containerId: 'test',
  width: 600,
  height: 400,
  pixelRatio: 2,
  renderer: 'canvas',
});

describe('tree layout', () => {
  it('dice layout', () => {
    const data = mobile[1];
    dice(data, containerBBox.x, containerBBox.y, containerBBox.width, containerBBox.height);
    each(data.children, (d) => {
      canvas.addShape('rect', {
        attrs: {
          x: d.x,
          y: d.y,
          width: d.width,
          height: d.height,
          fill: '#ccc',
          stroke: 'black',
          lineWidth: 1,
        },
      });
    });
    canvas.draw();
  });

  it('slice layout', () => {
    const data = mobile[1];
    slice(data, containerBBox.x, containerBBox.y, containerBBox.width, containerBBox.height);
    each(data.children, (d) => {
      canvas.addShape('rect', {
        attrs: {
          x: d.x,
          y: d.y,
          width: d.width,
          height: d.height,
          fill: '#ccc',
          stroke: 'black',
          lineWidth: 1,
        },
      });
    });
    canvas.draw();
  });
  it.only('squarify layout', () => {
    const data = mobile[1];
    const rows = squarify(data, containerBBox.x, containerBBox.y, containerBBox.width, containerBBox.height);
    console.log(rows);
  });
});
