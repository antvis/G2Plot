import { Treemap } from '../../src';
import { mobile } from '../data/mobile';
import { each } from '@antv/util';

describe('treemap', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '600px';
  canvasDiv.style.height = '400px';
  canvasDiv.style.left = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.id = 'canvas1';
  document.body.appendChild(canvasDiv);
  const data = processData(mobile);
  it('initilize', () => {
    const treemapPlot = new Treemap(canvasDiv, {
      width: 600,
      height: 400,
      data,
      colorField: 'brand',
    });
    treemapPlot.render();
  });
});

function processData(data) {
  let sumValue = 0;
  each(data, (d) => {
    sumValue += d.value;
  });

  return { name: 'root', value: sumValue, children: data };
}
