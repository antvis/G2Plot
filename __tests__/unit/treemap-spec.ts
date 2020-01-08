import { mobile } from '../data/mobile';
import { dice } from '../../src/plots/treemap/layout/dice';
import { slice } from '../../src/plots/treemap/layout/slice';
import { squarify } from '../../src/plots/treemap/layout/squarify';
import { weightedVoronoi } from '../../src/plots/treemap/layout/weighted-voronoi';
import * as G from '@antv/g';
import { each, clone } from '@antv/util';
import { triangulation } from '../../src/plots/treemap/layout/util/polygon';
import { randomPointsInPolygon } from '../../src/plots/treemap/layout/util/random-position';

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
  it('squarify layout', () => {
    const rows = squarify(data, containerBBox.x, containerBBox.y, containerBBox.width, containerBBox.height);
    each(rows, (row) => {
      each(row.children, (c) => {
        const width = c.x1 - c.x0;
        const height = c.y1 - c.y0;
        drawRect(c.x0, c.y0, width, height);
      });
    });
  });

  it('triangulate polygon', () => {
    const points = [
      [100, 10],
      [300, 10],
      [400, 300],
      [10, 300],
    ];
    const vertex = triangulation(points);
    const polygonPath = [];
    each(points, (p, index) => {
      const flag = index === 0 ? 'M' : 'L';
      polygonPath.push([flag, p[0], p[1]]);
    });
    const trianglePath = [];
    for (let i = 0; i < vertex.length; i += 3) {
      const p0 = points[vertex[i]];
      const p1 = points[vertex[i + 1]];
      const p2 = points[vertex[i + 2]];
      trianglePath.push(
        ...[
          ['M', p0[0], p0[1]],
          ['L', p1[0], p1[1]],
          ['L', p2[0], p2[1]],
          ['L', p0[0], p0[1]],
        ]
      );
    }
    canvas.addShape('path', {
      attrs: {
        path: polygonPath,
        fill: '#ccc',
      },
    });
    canvas.addShape('path', {
      attrs: {
        path: trianglePath,
        stroke: 'black',
        lineWidth: 1,
      },
    });
    canvas.draw();
  });

  it('random points in ploygon', () => {
    const polygon = [
      [100, 10],
      [300, 10],
      [400, 300],
      [10, 300],
    ];
    const points = randomPointsInPolygon(polygon, 500);
    const polygonPath = [];
    each(polygon, (p, index) => {
      const flag = index === 0 ? 'M' : 'L';
      polygonPath.push([flag, p[0], p[1]]);
    });
    canvas.addShape('path', {
      attrs: {
        path: polygonPath,
        fill: '#ccc',
      },
    });
    each(points, (p) => {
      canvas.addShape('circle', {
        attrs: {
          x: p[0],
          y: p[1],
          r: 1,
          fill: 'black',
        },
      });
      canvas.draw();
    });
    canvas.draw();
  });

  it.only('weighted voronoi', () => {
    const { x, y, width, height } = containerBBox;
    const { children } = data;
    const clipPolygon = [
      [x, y],
      [x, height],
      [width, height],
      [width, y],
    ];
    const randomPoints = randomPointsInPolygon(clipPolygon, children.length);
    each(children, (c, index) => {
      c.x = randomPoints[index][0];
      c.y = randomPoints[index][1];
      c.weight = c.value / data.value;
    });
    const cells = weightedVoronoi(data.children, clipPolygon);
    each(cells, (c) => {
      const path = [];
      each(c, (p, index) => {
        const flag = index === 0 ? 'M' : 'L';
        path.push([flag, p[0], p[1]]);
      });
      canvas.addShape('path', {
        attrs: {
          path,
          fill: '#ccc',
          stroke: 'black',
          lineWidth: 1,
        },
      });
      canvas.draw();
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
