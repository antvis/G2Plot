import { Treemap } from '../../src';
import { mobile } from '../data/mobile';
import { each, clone } from '@antv/util';

describe('treemap', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '600px';
  canvasDiv.style.height = '400px';
  canvasDiv.style.left = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.id = 'canvas1';
  document.body.appendChild(canvasDiv);
  const data = processData(mobile);
  it.only('initilize', () => {
    const treemapPlot = new Treemap(canvasDiv, {
      width: 600,
      height: 400,
      data,
      colorField: 'brand',
      /* interactions: [
        {
          type: 'drilldown',
          cfg: {
            startNode: {
              name: 'root',
            },
          } as any,
        },
      ],*/
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
