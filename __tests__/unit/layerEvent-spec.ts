import Layer from '../../src/base/layer';
import BasePlot from '../../src/base/plot';
import * as G from '@antv/g';

describe('layer event', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '300px';
  canvasDiv.style.height = '300px';
  canvasDiv.style.left = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.id = 'canvas1';
  document.body.appendChild(canvasDiv);

  const plot = new BasePlot(canvasDiv, {});

  it('layer event test', () => {
    const layer1 = new Layer({
      x: 0,
      y: 0,
      width: 200,
      height: 300,
      canvas: plot.canvas,
    });
    layer1.container.addShape('rect', {
      attrs: {
        x: 0,
        y: 0,
        width: 200,
        height: 300,
        fill: 'blue',
        opacity: 0.5,
      },
    });
    plot.addLayer(layer1);

    const layer2 = new Layer({
      x: 200,
      y: 0,
      width: 100,
      height: 300,
      canvas: plot.canvas,
    });
    layer2.container.addShape('rect', {
      attrs: {
        x: 0,
        y: 0,
        width: 200,
        height: 600,
        fill: 'green',
        opacity: 0.5,
      },
    });
    plot.addLayer(layer2);
    plot.render();
  });
});
