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

const data = processData(mobile);

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
    const rows = squarify(data, containerBBox.x, containerBBox.y, containerBBox.width, containerBBox.height);
    each(rows, (row) => {
      each(row.children, (c) => {
        drawRect(c.x, c.y, c.width, c.height);
      });
    });
  });
});

function processData(data) {
  let sumValue = 0;
  each(data, (d) => {
    sumValue += d.value;
  });

  return { name: 'root', value: sumValue, children: data };
}

function drawRect(x, y, width, height) {
  canvas.addShape('rect', {
    attrs: {
      x: x,
      y: y,
      width: width,
      height: height,
      fill: '#ccc',
      stroke: 'black',
      lineWidth: 1,
    },
  });
  canvas.draw();
}
